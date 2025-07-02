import React, { useState } from "react";
import ResponseMessage from "./ResponseMessage";
import bgImage from './images/Background.jpg'; // make sure image path is correct

function CreateAccount() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pin: "",
    accountType: "",
  });

  const [response, setResponse] = useState(null); // to show response message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("bank-admin-backend-production.up.railway.app/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (res.ok) {
        setResponse({
          msg: result.message,
          accountNo: result.accountNumber
        });
      } else {
        alert(`${result.error}\nReason: ${result.details}`);
      }

    } catch (error) {
      alert("Error connecting to server");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="m-auto w-full max-w-md p-8 bg-white bg-opacity-95 rounded-xl shadow-xl">
        {!response ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-black mb-4">Create Account</h2>

            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={form.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">Pin:</label>
              <input
                type="password"
                name="pin"
                id="pin"
                value={form.pin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type:</label>
              <select
                name="accountType"
                id="accountType"
                value={form.accountType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                <option value="">Select Account Type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Create Account
            </button>
          </form>
        ) : (
          <ResponseMessage response={response} />
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
