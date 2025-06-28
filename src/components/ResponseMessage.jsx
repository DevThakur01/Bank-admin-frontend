import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function ResponseMessage({ response }) {
  const navigate = useNavigate();

  if (!response) return null;

  const { msg, accountNo, fromAccount, toAccount, amount } = response;

  return (
    <div className="bg-white/90 text-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-300">
      <div className="flex items-center justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-semibold text-center mb-2">{msg}</h2>

      {accountNo && (
        <p className="text-center text-gray-800">
          Account Number: <strong>{accountNo}</strong>
        </p>
      )}

      {fromAccount && toAccount && (
        <p className="text-center text-gray-800 mt-1">
          Transferred from <strong>{fromAccount}</strong> to <strong>{toAccount}</strong>
        </p>
      )}

      {amount && (
        <p className="text-center text-gray-800 mt-1">
          New Balance: ₹<strong>{amount}</strong>
        </p>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-black hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ResponseMessage;


