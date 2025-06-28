import React, { useState } from 'react';
import ResponseMessage from './ResponseMessage';
import bgImage from './images/Background.jpg'; // ✅ Make sure this path is correct

function DepositForm() {
  const [form, setForm] = useState({
    accountNo: '',
    balance: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Deposit Request:', form);

    try {
      const res = await fetch('http://localhost:8080/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      console.log('Deposit Response:', result);

      if (res.ok) {
        setResponse({
          msg: result.message,
          accountNo: result.accountNumber,
          amount: result.newBalance
        });
      } else {
        alert(`Error: ${result.error}\nDetails: ${result.details}`);
      }

    } catch (error) {
      console.error('Deposit Fetch Error:', error);
      alert('Error connecting to the server.');
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
            <h2 className="text-2xl font-bold text-center text-black mb-4">Deposit Money</h2>

            <div>
              <label htmlFor="accountNo" className="block text-sm font-medium text-gray-700 mb-1">Account Number:</label>
              <input
                type="number"
                name="accountNo"
                id="accountNo"
                value={form.accountNo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">Amount to Deposit:</label>
              <input
                type="number"
                name="balance"
                id="balance"
                value={form.balance}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-black-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Deposit
            </button>
          </form>
        ) : (
          <ResponseMessage response={response} />
        )}
      </div>
    </div>
  );
}

export default DepositForm;
