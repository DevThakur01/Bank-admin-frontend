import React from "react";
import { useNavigate } from "react-router-dom";
import dashboardBg from "./images/dashboardbg.jpg"; 
import OverViewCards from "./OverViewCards"; // import your new component

import {
  CreditCard,
  DollarSign,
  Download,
  History,
  LogOut,
  PlusCircle,
  Send,
  Settings,
  Trash2,
  Upload,
  Users,
  UserPlus,
} from "lucide-react";


function Dashboard() {
  const navigate = useNavigate();

  const handleEvent = (path) => navigate(path);
  const handleLogout = () => navigate("/");

  const quickActions = [
    { title: "Create Account", description: "Open a new customer account", icon: PlusCircle, path: "/create-account", color: "bg-gray-900 hover:bg-gray-800" },
    { title: "Deposit Money", description: "Add funds to account", icon: Download, path: "/deposit", color: "bg-gray-700 hover:bg-gray-600" },
    { title: "Withdraw Money", description: "Withdraw funds from account", icon: Upload, path: "/withdraw", color: "bg-gray-700 hover:bg-gray-600" },
    { title: "Transfer Money", description: "Transfer between accounts", icon: Send, path: "/transfer", color: "bg-gray-800 hover:bg-gray-700" },
  ];

  const managementActions = [
    { title: "Transaction History", description: "View all transactions", icon: History, path: "/view-history" },
    { title: "Add Admin", description: "Create admin account", icon: UserPlus, path: "/create-admin" },
    { title: "Delete Account", description: "Remove customer account", icon: Trash2, path: "/delete-account" },
    { title: "Member List", description: "View all members", icon: Users, path: "/member-list" },
  ];


  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
       backgroundImage: `url(${dashboardBg})`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-80 text-white shadow-sm border-b border-gray-700">
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome Admin,</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      <main className="p-4 lg:p-6 space-y-10">
        {/* Overview Cards */}
        <OverViewCards />
       

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white underline underline-offset-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleEvent(action.path)}
                  className="bg-black/60 text-white border border-gray-600 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-white/50 transition duration-200 group text-center hover:scale-[1.02]"
                >
                  <div
                    className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-200">{action.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Management Tools */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white underline underline-offset-4">Management Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleEvent(action.path)}
                  className="bg-black/40 text-white border border-gray-600 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-white/50 transition duration-200 group hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-200">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{action.title}</h4>
                      <p className="text-sm text-gray-200">{action.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
