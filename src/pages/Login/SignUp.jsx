import { useState } from "react";
import InputField from "../../components/InputField";
import { AuthApi } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await AuthApi.signup(form);
      setMsg("Signup successful! Redirecting...");
      setTimeout(() => {
        setLoading(false);
        navigate("/login");}, 1200);
    } catch (err) {
      setMsg("Signup failed. Try again.");
    setLoading(false);
    }
  };

  return (
    <>
      {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        <form onSubmit={handleSignup}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={(v) => setForm({ ...form, username: v })}
            autoComplete="username"
          />

          <InputField
            type="email"
            label="Email"
            name="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            autoComplete="email"
          />

          <InputField
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <Link
          to="/login"
          className="block mt-3 text-center text-blue-500 hover:underline"
        >
          Already have an account? Login
        </Link>

        {msg && <p className="mt-3 text-center text-green-600">{msg}</p>}
      </div>
    </div>
    </>
  );
}
