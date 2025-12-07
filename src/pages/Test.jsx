import { useEffect, useState } from "react";

export default function Test() {
  const questions = [
    {
      q: "What is 2 + 2?",
      options: ["1", "2", "4", "5"],
      answer: "4",
    },
    {
      q: "Capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      answer: "Paris",
    },
  ];

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // ---------- FULL SCREEN ----------
  const enterFullscreen = async () => {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
    setStarted(true);
  };

  // ---------- TIMER ----------
  useEffect(() => {
    if (!started || finished) return;

    if (timer === 0) {
      handleNext(); // auto next when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, started]);

  // ---------- NEXT QUESTION ----------
  const handleNext = () => {
    // update score
    if (selected === questions[current].answer) {
      setScore((s) => s + 1);
    }

    // last question?
    if (current === questions.length - 1) {
      setFinished(true);
      document.exitFullscreen?.();
      return;
    }

    // go to next
    setCurrent((c) => c + 1);
    setSelected(null);
    setTimer(10);
  };

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

  if (finished) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>
        <p className="text-xl">
          You scored <span className="font-bold">{score}</span> out of{" "}
          {questions.length}
        </p>

        <a
        href={`/result/${1}`}

          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          View Results
        </a>
      </div>
    );
  }

  const currentQ = questions[current];

  return (
    <div className="max-w-xl mx-auto mt-10">
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
            onClick={() => setSelected(op)}
            className={`p-4 border rounded-lg cursor-pointer transition 
              ${
                selected === op
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
        {current === questions.length - 1 ? "Submit Test" : "Next Question"}
      </button>
    </div>
  );
}
