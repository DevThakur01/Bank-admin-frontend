import React from 'react';
import { useNavigate } from 'react-router-dom';

function TransactionHistoryResponse({ transactions }) {
  const navigate = useNavigate();

  if (!transactions || transactions.length === 0) {
    return <p className="text-white text-center text-lg mt-10">No transactions found.</p>;
  }

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center"
      style={{
        backgroundImage: `url('./images/Background.jpg')`, // ✅ move image to /public/images/
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="space-y-6 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-black text-center">Transaction History</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-xl bg-gray-100 text-black shadow hover:shadow-lg transition duration-200"
            >
              <p className="text-lg font-semibold mb-2">Transaction Type: {txn.type}</p>

              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Sender:</span> {txn.senderAccNo ?? 'N/A'}</p>
                <p><span className="font-semibold">Receiver:</span> {txn.receiverAccNo ?? 'N/A'}</p>
                <p><span className="font-semibold">Amount:</span> ₹{txn.amount}</p>
                <p><span className="font-semibold">Date:</span> {txn.transactionDate ?? 'Unknown'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded shadow"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistoryResponse;
