import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemberListResponse({ members }) {
  const navigate = useNavigate();

  if (!members || members.length === 0) {
    return <p className="text-white text-center">No members found.</p>;
  }

  return (
    <div className="space-y-6 w-full max-w-5xl">
      <h2 className="text-3xl font-bold text-black text-center">Bank Members</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {members.map((member, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-xl bg-gray-100 text-black shadow hover:shadow-lg transition duration-200"
          >
            <p className="text-lg font-semibold mb-2">🏦 Account No: {member.accountNumber}</p>

            <div className="space-y-1 text-sm">
              <p><span className="font-semibold">Name:</span> {member.firstname} {member.lastname}</p>
              <p><span className="font-semibold">Email:</span> {member.email}</p>
              <p><span className="font-semibold">Balance:</span> ₹{member.balance}</p>
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
  );
}

export default MemberListResponse;


