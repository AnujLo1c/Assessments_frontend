import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="px-4 pb-20">

      {/* ================= HERO SECTION ================= */}
      <div className="flex justify-center py-16">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-3">
            Welcome to <span className="text-blue-600">QuizApp</span>
          </h1>

          <p className="text-gray-600 mb-8">
            Test your knowledge with fun, interactive quizzes and track your growth!
          </p>

          {!user && (
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                Sign Up
              </button>
            </div>
          )}

          {user && (
            <button
              onClick={() => navigate("/tests")}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-500 transition shadow-md"
            >
              Take Test
            </button>
          )}
        </div>
      </div>

      {/* ================= FEATURE HIGHLIGHTS ================= */}
      <div className="max-w-4xl mx-auto mt-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Why You'll Love QuizApp</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">📚 Multiple Topics</h3>
            <p className="text-gray-600 text-sm">
              Choose from various subjects and level up your knowledge.
            </p>
          </div>

          <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">⚡ Instant Results</h3>
            <p className="text-gray-600 text-sm">
              See your score immediately and learn from your mistakes.
            </p>
          </div>

          <div className="p-5 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">🏆 Track Progress</h3>
            <p className="text-gray-600 text-sm">
              Your best attempts are saved to keep you motivated.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
