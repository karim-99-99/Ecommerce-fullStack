import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch  {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Register</h2>
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
          type="email"
          name="email"
          placeholder="Email"
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
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-orange-600 font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
