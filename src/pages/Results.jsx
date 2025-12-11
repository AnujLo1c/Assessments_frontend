import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/TestApi";
import { AuthContext } from "../context/AuthContext";

export default function Results() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const username= localStorage.getItem("username");
  // Fetch all past results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.getUserResults(username);
        //TODO: for user
        console.log("Fetched results:", res.data);

        setResults(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load past results!");
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      
      <h1 className="text-4xl font-bold mb-3 text-gray-900">
        Past Results
      </h1>

      <p className="text-gray-600 mb-8">
        Review your previous quiz performances below.
      </p>

{loading &&  
<div className="flex flex-col justify-center items-center py-10">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-3"></div>
  <p className="text-gray-500">Loading tests...</p>
</div>

}

{!loading && (
  <>
    {error && (
      <p className="text-center mt-10 text-red-500">{error}</p>
    )}

    {!error && (
      <div className="space-y-4">
        {[...results].reverse().map((r) => (
          <div
            key={r.id}
            className="p-5 bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            onClick={() => navigate(`/result/${r.id}`)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Quiz: {r.quizid}
              </h2>

              <p className="text-blue-600 font-bold text-lg">
                {r.correctAnswers}/{r.totalQuestions}
              </p>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              {Math.round((r.score / r.total) * 100)}% score — {r.totalQuestions} questions
            </p>
          </div>
        ))}
      </div>
    )}
  </>
)}

      

    </div>
  );
}
