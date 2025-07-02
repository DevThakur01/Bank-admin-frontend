import React, { useState } from 'react';
import TransactionHistoryResponse from './TransactionHistoryReponse';
import backgroundImg from './images/Background.jpg'; // ✅ Correct import

function ViewHistory() {
  const [accountNumber, setAccountNumber] = useState('');
  const [history, setHistory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountNumber) {
      alert("Please enter an account number.");
      return;
    }

    try {
      const response = await fetch(`bank-admin-backend-production.up.railway.app/transaction-history/${accountNumber}`);

      if (!response.ok) {
        throw new Error("Account not found or server error");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("No transaction history found for this account.");
      } else {
        setHistory(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    }

    setAccountNumber('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }} // ✅ Fixed usage
    >
      {history === null ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4 bg-opacity-95"
        >
          <h2 className="text-xl font-bold text-center text-black mb-2">View Transaction History</h2>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Enter Account Number:
            </label>
            <input
              type="number"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            View History
          </button>
        </form>
      ) : (
        <TransactionHistoryResponse transactions={history} />
      )}
    </div>
  );
}

export default ViewHistory;
