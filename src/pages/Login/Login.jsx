import { useState, useContext } from "react";
import InputField from "../../components/InputField";
import { AuthApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await AuthApi.login(form);
      console.log(res.data);
      
      
      loginUser(res.data.token);
      localStorage.setItem("username", form.username);
      navigate("/");
    } catch (err) {
      setMsg("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleLogin}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={(v) => setForm({ ...form, username: v })}
            autoComplete="username"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <Link
          to="/forgot-password"
          className="block mt-3 text-center text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>

        <Link
          to="/signup"
          className="block mt-2 text-center text-green-600 hover:underline"
        >
          Create an Account
        </Link>

        {msg && <p className="mt-3 text-center text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
