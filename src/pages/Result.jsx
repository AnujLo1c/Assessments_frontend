import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/TestApi";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.getResultById(id);
        setResult(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load result!");
      }
      setLoading(false);
    };

    fetchResult();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading result...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const {
    userid,
    quizid,
    score,
    total,
    totalQuestions,
    correctAnswers,
    totalAttempted
  } = result;

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-3 text-gray-900 text-center">
        Test Result
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Here is how you performed in this quiz.
      </p>

      {/* Score Card */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your Score</h2>

        <p className="text-6xl font-bold text-blue-600">{percentage}%</p>

        <p className="text-gray-600 mt-2 text-lg">
          {score} out of {total} marks
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-5">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-10 text-center">

        <div className="p-4 bg-blue-50 rounded-xl shadow">
          <p className="text-2xl font-bold text-blue-700">{correctAnswers}</p>
          <p className="text-gray-600">Correct Answers</p>
        </div>

        <div className="p-4 bg-red-50 rounded-xl shadow">
          <p className="text-2xl font-bold text-red-700">
            {totalAttempted - correctAnswers}
          </p>
          <p className="text-gray-600">Wrong Answers</p>
        </div>

        <div className="p-4 bg-green-50 rounded-xl shadow">
          <p className="text-2xl font-bold text-green-700">{totalAttempted}</p>
          <p className="text-gray-600">Attempted</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl shadow">
          <p className="text-2xl font-bold text-gray-700">{totalQuestions}</p>
          <p className="text-gray-600">Total Questions</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow"
          onClick={() => navigate(`/test/${quizid}`)}
        >
          Retake Test
        </button>

        <button
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow"
          onClick={() => navigate("/tests")}
        >
          Go to Tests
        </button>
      </div>
    </div>
  );
}
