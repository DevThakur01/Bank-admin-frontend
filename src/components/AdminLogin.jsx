import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sidePannelImg from "./images/side-pannel.jpg";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        navigate("/dashboard");
      } else {
        alert(result.message || "Wrong credentials");
      }
    } catch (error) {
      alert("Server error");
      console.error("Login error:", error);
    }

    setForm({ username: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 flex overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-wide">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>
          {/* Added credentials info */}
          <div className="mt-6 text-center text-gray-300 text-sm select-none">
            <p>
              <strong>Test Credentials:</strong>
            </p>
            <p>Username: <span className="font-mono">admin</span></p>
            <p>Password: <span className="font-mono">12345</span></p>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center rounded-r-xl"
          style={{
             backgroundImage: `url(${sidePannelImg})`,
          }}
        />
      </div>
    </div>
  );
}

export default AdminLogin;
