import { useEffect, useState } from "react";
import api from "../api/TestApi.jsx";
import { useNavigate } from "react-router-dom";


export default function Tests() {
  const [tests, setTests] = useState([]);
const navigate = useNavigate();


  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await api.getAllQuizzes();
        setTests(res.data);
        console.log(res.data.token);
        // console.log(localStorage.getItem("username"));
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-3 text-gray-900">Available Tests</h1>
      <p className="text-gray-600 mb-8">
        Start your quiz journey below. Choose a test and challenge yourself!
      </p>

      <div className="space-y-4">
        {tests.map((e, i) => (
          <div
            key={i}
            // onClick={() => (window.location.href = `/test/${e.id}`)}
            onClick={() => (navigate(`/test/${e.id}`))}
            className="p-5 bg-white shadow-md rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800">{e.title}</h2>
            
            <p className="text-gray-500 text-sm mt-1">{e.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
