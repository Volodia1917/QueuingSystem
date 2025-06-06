import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/Login.view';
import DashboardContent from './pages/dashboard';
import LeftSidebar from './components/Layout/LeftSidebar';
import DevicePage from './pages/device';
import ServicePage from './pages/service';
import CapSoList from "./pages/capso/CapSoList.view";
import AccountList from './pages/account/AccountList.view';

function App() {
  const [selectMenu, setSelectedMenu]=useState('1');
  const receiveSelectedMenu = (index:string) => {
    setSelectedMenu(index);
  }
  return localStorage.getItem('isLogined') != 'true' ? <Login />
  : <div style={{height:'100vh'}}>  
    <LeftSidebar 
    content={
    selectMenu=='1'?<DashboardContent />
    : selectMenu=='2'?<DevicePage />
    : selectMenu=='3'?<ServicePage />
    : selectMenu=='4'?<CapSoList />
    : selectMenu == '6.2' ? <AccountList />
    : null // fallback nếu không khớp
    
    } 
    sendSelectedIndex={receiveSelectedMenu} />
  </div>
}
export default App;