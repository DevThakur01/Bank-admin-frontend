import React, { useState } from 'react';
import ResponseMessage from './ResponseMessage';
import bgImage from './images/Background.jpg'; // ✅ Ensure correct image path

function DeleteAccount() {
  const [form, setForm] = useState({
    accountNumber: ''
  });

  const [response, setResponse] = useState(null); // for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Delete Request:", form);

    try {
      const res = await fetch("https://bank-admin-backend-production.up.railway.app/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accountNumber: Number(form.accountNumber)
        })
      });

      const result = await res.json();
      console.log("Delete Response:", result);

      if (res.ok) {
        setResponse({
          msg: result.message,
          accountNo: result.accountNumber
        });
      } else {
        alert(`${result.error || "Deletion Failed"}\nReason: ${result.details || result.message}`);
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
            <h2 className="text-2xl font-bold text-center text-black mb-4">Delete Account</h2>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Enter Account Number:</label>
              <input
                type="number"
                id="accountNumber"
                name="accountNumber"
                onChange={handleChange}
                value={form.accountNumber}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Delete Account
            </button>
          </form>
        ) : (
          <ResponseMessage response={response} />
        )}
      </div>
    </div>
  );
}

export default DeleteAccount;
