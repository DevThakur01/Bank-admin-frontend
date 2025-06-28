import React, { useState } from 'react';
import ResponseMessage from './ResponseMessage';
import backgroundImg from './images/Background.jpg'; // ✅ Add background image

function AddAdmin() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [response, setResponse] = useState(null); // for showing success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setResponse({
          msg: result.message
        });
      } else {
        alert(`${result.error || "Failed"}\nReason: ${result.details || result.message}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }} // ✅ Consistent background
    >
      {!response ? (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white bg-opacity-95 p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Add New Admin</h2>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Create Admin
          </button>
        </form>
      ) : (
        <ResponseMessage response={response} />
      )}
    </div>
  );
}

export default AddAdmin;
