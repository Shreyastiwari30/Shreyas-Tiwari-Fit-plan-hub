import React ,{ useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-indigo-500"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-slate-800 text-white border border-slate-600"
        >
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign Up
        </button>
        <p className="text-slate-400 text-center mt-4">
          Already have an account?
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
