import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/TestApi";

export default function Results() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef();

  // Fetch one page at a time
  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await api.getUserResultsPaginated(page);
      console.log("Fetched page:", page, res.data);

      let newResults = [];

      // backend returns { content: [...] }
      if (Array.isArray(res.data?.content)) {
        newResults = res.data.content;
        setHasMore(!res.data.last);
      }
      // backend returns direct array
      else if (Array.isArray(res.data)) {
        newResults = res.data;
        setHasMore(res.data.length > 0);
      }

      setResults((prev) => [...prev, ...newResults]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }, [page, hasMore, loading]);

  // Trigger fetch when last element reaches viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPage();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchPage]);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">

  <h1 className="text-4xl font-bold mb-3 text-gray-900">
    Past Results
  </h1>

  <p className="text-sm text-gray-500 mb-6">
    Scroll to load more results
  </p>

  <div className="space-y-3">
    {results.map((r) => (
      <div
        key={r.id}
        className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={() => navigate(`/result/${r.id}`)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-medium text-gray-800">
              Quiz ID: {r.quizid}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Score: {Math.round((r.score / r.total) * 100)}% • {r.totalQuestions} questions
            </p>
          </div>

          <p className="text-sm font-semibold text-blue-600">
            {r.correctAnswers}/{r.totalQuestions}
          </p>
        </div>

        <p className="text-[11px] text-gray-400 mt-2">
          {r.createdAt}
        </p>
      </div>
    ))}
  </div>

  {/* Loader element */}
  <div ref={loaderRef} className="h-10 flex justify-center items-center mt-4">
    {loading && (
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
    )}
  </div>
</div>

  );
}
