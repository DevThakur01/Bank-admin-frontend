import React, { useState } from 'react';
import ResponseMessage from './ResponseMessage';
import backgroundImg from './images/Background.jpg'; // ✅ Background image import

function WithdrawForm() {
  const [form, setForm] = useState({
    accountNo: '',
    balance: ''
  });

  const [response, setResponse] = useState(null); // for holding API response

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Withdraw Request:", form);

    try {
      const res = await fetch("https://bank-admin-backend-production.up.railway.app/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      console.log("Withdraw Response:", result);

      if (res.ok) {
        // Prepare structured response for UI
        setResponse({
          msg: result.message,
          accountNo: result.accountNumber,
          amount: result.newBalance
        });
      } else {
        alert(`Withdraw Failed: ${result.error}\nReason: ${result.details}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }} // ✅ Using imported image
    >
      {!response ? (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white bg-opacity-95 p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Withdraw Money</h2>

          <div>
            <label htmlFor='accountNo' className="block text-sm font-medium text-gray-700 mb-1">Account No:</label>
            <input
              type='number'
              id='accountNo'
              name='accountNo'
              onChange={handleChange}
              value={form.accountNo}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor='balance' className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
            <input
              type='number'
              id='balance'
              name='balance'
              onChange={handleChange}
              value={form.balance}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <button
            type='submit'
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Withdraw Amount
          </button>
        </form>
      ) : (
        <ResponseMessage response={response} />
      )}
    </div>
  );
}

export default WithdrawForm;
