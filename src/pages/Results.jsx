export default function Results() {
  // Example previous results — replace with real data later
  const results = [
    { test: "Math Basics", score: 8, total: 10 },
    { test: "Science Quiz", score: 6, total: 10 },
    { test: "History Test", score: 9, total: 10 },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      
      <h1 className="text-4xl font-bold mb-3 text-gray-900">
        Past Results
      </h1>

      <p className="text-gray-600 mb-8">
        Review your previous quiz performances below.
      </p>

      <div className="space-y-4">
        {results.map((r, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {r.test}
              </h2>

              <p className="text-blue-600 font-bold text-lg">
                {r.score}/{r.total}
              </p>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              {Math.round((r.score / r.total) * 100)}% score
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
