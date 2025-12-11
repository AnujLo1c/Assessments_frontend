import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBackend } from "../context/BackendContext";

export default function BackendLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Checking server...");
  const [serverUp, setServerUp] = useState(false);
const navigate = useNavigate();
let {setBackendReady} = useBackend();
  const messages = [
    "Warming up servers...",
    "Fetching quiz data...",
    "Sharpening pencils...",
    "Preparing your questions...",
    "Double-checking your brain power..."
  ];

  // Rotate fun messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStatus(messages[Math.floor(Math.random() * messages.length)]);
    }, 2500);

    return () => clearInterval(msgInterval);
  }, []);

  // Fake progress bar movement
  useEffect(() => {
    if (serverUp) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 8 : p));
    }, 400);

    return () => clearInterval(interval);
  }, [serverUp]);

  // Check backend health every 2 seconds
  useEffect(() => {
  let redirected = false; // prevents multiple redirects

  const checkServer = async () => {
    try {
      const res = await fetch("https://assessments-backend.onrender.com/api/health", {
        method: "GET",
      });

      if (res.ok) {
        setServerUp(true);
        setProgress(100);
        setStatus("Server is ready! Redirecting...");
        setBackendReady(true);

        if (!redirected) {
          redirected = true; // prevent further redirects
          setTimeout(() => navigate("/"), 800);
        }
      }
    } catch (err) {
      console.log("Backend not responding...");
    }
  };

  // Run immediately at component mount
  checkServer();

  // Check every 10 seconds
  const interval = setInterval(checkServer, 10000);

  return () => clearInterval(interval);
}, [navigate]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white px-4">

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide animate-pulse">
        Checking Backend Status...
      </h1>

      {/* Fun message */}
      <p className="text-lg opacity-90 mb-6">{status}</p>

      {/* ESTIMATED TIME */}
      <p className="text-sm text-white/70 mb-6">
        Expected wait time: 2 min
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white/30 rounded-full h-3 overflow-hidden shadow-lg">
        <div
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Spinner */}
      <div className="mt-6">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Footer small text */}
      <p className="mt-6 text-white/60 text-sm tracking-wide">
        Making sure everything is running smoothly...
      </p>
    </div>
  );
}
