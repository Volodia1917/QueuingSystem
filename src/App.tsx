import React from 'react';
import logo from './logo.svg';
import Login from './pages/Login.view';
import DashboardContent from './pages/dashboard';
import LeftSidebar from './components/Layout/LeftSidebar';
function App() {
  return localStorage.getItem('isLogined') != 'true' ? <Login />
  : <div>
    <LeftSidebar content={<DashboardContent />} />
  </div>
}
export default App;
