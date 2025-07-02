import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, Settings, IndianRupee } from 'lucide-react';

function OverviewCards() {
  const [summary, setSummary] = useState({
    totalAccounts: 0,
    totalAdmins: 0,
    totalCash: 0,
  });

  useEffect(() => {
    axios.get('bank-admin-backend-production.up.railway.app/summary')
      .then((res) => setSummary(res.data))
      .catch((err) => console.error('Error fetching summary:', err));
  }, []);

  const cards = [
    { title: "Total Accounts", value: summary.totalAccounts.toLocaleString(), icon: CreditCard },
    { title: "Total Admins", value: summary.totalAdmins.toLocaleString(), icon: Settings },
    { title: "Total Cash", value: `${summary.totalCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: IndianRupee },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-black/60 border border-gray-600 rounded-xl p-6 hover:shadow-xl hover:border-white/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <Icon className="h-5 w-5 text-gray-200" />
            </div>
            <div className="text-3xl font-bold font-mono text-white mb-1">{card.value}</div>
            <p className="text-sm text-green-400 font-medium">Live data</p>
          </div>
        );
      })}
    </div>
  );
}

export default OverviewCards;
