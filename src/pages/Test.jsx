import { useContext, useEffect, useState } from "react";
import api from "../api/TestApi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Test() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [timer, setTimer] = useState(10);
  const [attempted, setAttempted] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultId, setResultId] = useState(null);

  const QUIZ_ID = useParams().id;


  // ---------- FULL SCREEN ----------
  const enterFullscreen = async () => {
    await document.documentElement.requestFullscreen?.();
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return; // Only track if test is running

    const checkFullscreen = () => {
      const isFullscreen = !!document.fullscreenElement;

      if (!isFullscreen) {
        // User exited fullscreen → suspicious activity
        setShowFullscreenWarning(true);
        document.body.classList.remove("hide-navbar");
      }
    };

    document.addEventListener("fullscreenchange", checkFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, [started]);
  const returnToFullscreen = async () => {
    await document.documentElement.requestFullscreen();
    setShowFullscreenWarning(false);
  };

  const forceSubmitTest = async () => {
    setShowFullscreenWarning(false);
    await submitTest();
  };

  // ---------- FETCH QUIZ ----------
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await api.getQuizById(QUIZ_ID);
      const data = Array.isArray(res) ? res : res.data;

      const mapped = data.map((q) => ({
        id: q.id,
        q: q.question,
        options: q.options,
      }));
console.log(mapped);

      setQuestions(mapped);
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (e) {
        console.error("Fullscreen failed:", e);
      }
    };

    const exitFullscreen = async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (e) {
        console.error("Exit fullscreen failed:", e);
      }
    };

    const checkFullscreen = () => {
      if (document.fullscreenElement) {
        document.body.classList.add("hide-navbar");
      } else {
        document.body.classList.remove("hide-navbar");
      }
    };

    const detectF11 = (e) => {
      if (e.key === "F11") {
        e.preventDefault(); // stop default browser fullscreen

        if (!document.fullscreenElement) {
          enterFullscreen(); // ENTER REAL FULLSCREEN
        } else {
          exitFullscreen(); // EXIT REAL FULLSCREEN
        }
      }
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    window.addEventListener("keydown", detectF11);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      window.removeEventListener("keydown", detectF11);
    };
  }, []);

  // ---------- SUBMIT TEST TO BACKEND ----------
  const submitTest = async () => {
    // show a confirm dialog
    console.log("Selected",selected);
    
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the test?"
    );

    if (!confirmSubmit) return;
if(!(selected.length===questions.length)){
  let diff=questions.length-selected.length;
  for(let i=0;i<diff;i++){
    selected.push({
      questionId:questions[selected.length+i].id,
      selected:null
    });
  }
  
}
    setIsSubmitting(true); // start loader
    setFinished(true); // ensure finished state
      let username = localStorage.getItem("username");
      console.log("Username ", username);
      
    const payload = {
      quizId: QUIZ_ID,
      username: username,
      answers: selected,
    };
console.log("Payload",payload);

    try {
      const response = await api.getResult(payload);
      console.log("Result ID:", response.data.resultId);

      setResultId(response.data.resultId);
    } catch (err) {
      alert("Error submitting test!");
      console.error(err);
    }

    setIsSubmitting(false); // stop loader
  };

  // ---------- NEXT QUESTION ----------
  const handleNext = async () => {
    const hasSelected = selected[current]?.selected !== undefined && selected[current]?.selected !== null;

  if (hasSelected) {
    setAttempted((a) => a + 1);
  }
    if (current === questions.length - 1) {
      document.exitFullscreen?.();
      setFinished(true); // show finish page
      return;
    }

    setCurrent((c) => c + 1);
    setTimer(10);
  };

useEffect(() => {
  if (!started || finished || showFullscreenWarning) return;

  const countdown = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        // Last question reached?
        if (current === questions.length - 1) {
          document.exitFullscreen?.();
          setFinished(true);
          return 0;
        }

        // Otherwise go to next question
        setCurrent((c) => c + 1);
        return 10; 
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(countdown);
}, [started, finished, showFullscreenWarning, current, questions.length]);


  // ---------- BEFORE START ----------
  if (!started) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Ready to Start?</h1>
        <button
          onClick={enterFullscreen}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Start Test
        </button>
      </div>
    );
  }

  // ---------- ON FINISH SCREEN ----------
  if (finished) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>

        <p className="text-xl">
          You attempted {attempted} out of {questions.length}
        </p>

        <div className="mt-6">
          <button
            onClick={submitTest}
            disabled={isSubmitting || resultId !== null}
            className={`px-6 py-3 rounded-lg text-white transition 
              ${
                isSubmitting || resultId
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-500"
              }
            `}
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>

        {resultId && (
          <button
            onClick={() => navigate(`/result/${resultId}`)}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
          >
            View Result
          </button>
        )}
      </div>
    );
  }

  // ---------- LOADING ----------
  if (questions.length === 0) return <p>Loading...</p>;

  const currentQ = questions[current];

  return (
    <div className="max-w-xl mx-auto mt-10">
      {showFullscreenWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Fullscreen Required
            </h2>
            <p className="text-gray-700 mb-6">
              You left fullscreen mode. To continue the test, please return to
              fullscreen. Or submit the test now.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={returnToFullscreen}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Return to Fullscreen
              </button>

              <button
                onClick={forceSubmitTest}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="text-right text-xl font-bold text-red-600 mb-4">
        Time: {timer}s
      </div>

      {/* Question */}
      <h2 className="text-2xl font-semibold mb-4">{currentQ.q}</h2>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((op) => (
          <div
            key={op}
            onClick={() =>
              setSelected((prev) => {
                const arr = [...prev];
                arr[current] = {
                  questionId: currentQ.id,
                  selected: op,
                };
                return arr;
              })
            }
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selected[current]?.selected === op
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {op}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
      >
        {current === questions.length - 1 ? "Finish Test" : "Next Question"}
      </button>
    </div>
  );
}
