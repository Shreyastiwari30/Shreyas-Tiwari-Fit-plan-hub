import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          FitPlanHub
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-gray-700 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded"
        >
          Login
        </button>

        
        <p className="text-gray-400 text-center mt-4">
          Don’t have an account?
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="w-full mt-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
