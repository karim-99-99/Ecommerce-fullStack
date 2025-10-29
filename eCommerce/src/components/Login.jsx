import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect to home after login
    } catch  {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-80">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don’t have an account?{" "}
        <a href="/register" className="text-orange-600 font-semibold">
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
