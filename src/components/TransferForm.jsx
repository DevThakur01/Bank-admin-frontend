import React, { useState } from "react";
import ResponseMessage from "./ResponseMessage";
import bgImage from './images/Background.jpg'; // Make sure the image path is correct

function TransferForm() {
  const [form, setForm] = useState({
    senderAccNo: "",
    receiverAccNo: "",
    amount: ""
  });

  const [response, setResponse] = useState(null); // API success response

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Transfer Request:", form);

    try {
      const res = await fetch("http://localhost:8080/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log("Transfer Response:", result);

      if (res.ok) {
        setResponse({
          msg: result.message,
          fromAccount: result.senderAccNo,
          toAccount: result.receiverAccNo,
          amount: result.amount
        });
      } else {
        alert(`Transfer Failed: ${result.error || "Unknown error occurred."}`);
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
            <h2 className="text-2xl font-bold text-center text-black mb-4">Transfer Funds</h2>

            <div>
              <label htmlFor="senderAccNo" className="block text-sm font-medium text-gray-700 mb-1">
                Sender's Account No
              </label>
              <input
                type="number"
                id="senderAccNo"
                name="senderAccNo"
                onChange={handleChange}
                value={form.senderAccNo}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="receiverAccNo" className="block text-sm font-medium text-gray-700 mb-1">
                Receiver's Account No
              </label>
              <input
                type="number"
                id="receiverAccNo"
                name="receiverAccNo"
                onChange={handleChange}
                value={form.receiverAccNo}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={handleChange}
                value={form.amount}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Transfer
            </button>
          </form>
        ) : (
          <ResponseMessage response={response} />
        )}
      </div>
    </div>
  );
}

export default TransferForm;
