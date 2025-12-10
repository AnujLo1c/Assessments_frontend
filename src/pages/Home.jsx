import { useNavigate } from "react-router-dom";
export default function Home() {
const navigate = useNavigate();
  const navToTests = () => {
    navigate("/tests");
  }
  const navToLogin = () => {
    navigate("/login");
  }
  const navToRegister = () => {
    navigate("/signup");
  }
  return (
    <div className="flex justify-center px-4 py-16">
      <div className="text-center max-w-xl">

        <h1 className="text-4xl font-bold mb-3">
          Welcome to <span className="text-blue-600">QuizApp</span>
        </h1>

        <p className="text-gray-600 mb-8">
          Test your knowledge with fun, interactive quizzes and track your progress!
        </p>

        {/* Auth Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-5 py-2 border border-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={navToLogin}
          >
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
             onClick={navToRegister}
          >
            Sign Up
         
          </button>
        </div>

        {/* Start Test */}
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-500 transition shadow-md"
        onClick={navToTests}
        >
          Take Test
        </button>

      </div>
    </div>
  );
}
