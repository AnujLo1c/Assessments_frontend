import { useState } from "react";
import InputField from "../../components/InputField";
import { AuthApi } from "../../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthApi.forgotPassword({ email });
      setMsg("Password reset link sent to your email.");
    } catch (err) {
      setMsg("Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            name="email"
            autoComplete="email"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        {msg && <p className="mt-3 text-center text-gray-600">{msg}</p>}
      </div>
    </div>
  );
}
