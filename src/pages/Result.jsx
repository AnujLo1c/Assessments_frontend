export default function Result() {
  // Example results (you can replace with real data later)
  const score = 8;
  const total = 10;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      
      <h1 className="text-4xl font-bold mb-3 text-gray-900">
        Results
      </h1>

      <p className="text-gray-600 mb-8">
        Here is your performance summary for the test you completed.
      </p>

      {/* Results Card */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Score
        </h2>

        <div className="text-center my-4">
          <p className="text-5xl font-bold text-blue-600">{percentage}%</p>
          <p className="text-gray-500 mt-1">
            ({score} out of {total} correct)
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow">
          Retake Test
        </button>

        <button className="px-5 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow"
          onClick={() => window.location.href = '/tests'}
        >
          Go to Tests
        </button>
      </div>
    </div>
  );
}
