import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateAccount from './components/CreateAccount';
import DepositForm from './components/DepositForm';
import TransferForm from './components/TransferForm';
import WithdrawForm from './components/WithdrawForm';
import AddAdmin from './components/AddAdmin';
import DeleteAccount from './components/DeleteAccount';
import ViewHistory from './components/ViewHistory';
import MemberList from './components/MemberList';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/deposit" element={<DepositForm />} />
        <Route path="/transfer" element={<TransferForm />} />
        <Route path="/withdraw" element={<WithdrawForm />} />
        <Route path="/create-admin" element={<AddAdmin />} />
        <Route path='/delete-account' element={<DeleteAccount/>} />
        <Route path='/view-history' element={<ViewHistory/>} />
        <Route path='/member-list' element={<MemberList/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
