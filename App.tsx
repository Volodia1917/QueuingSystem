import React from "react";
import logo from "./logo.svg";
import Login from "./pages/login";
import LeftSidebar from "./components/Layout/LeftSidebar";
import DevicePage from "./pages/service";
import DashboardContent from "./pages/dashboard";
import { DeviceDemo } from "./components/DeviceList/DeviceDemo";

function App() {
  return (
    // <Login />
    <DevicePage />
    // <DashboardContent />
    // <DeviceDemo />
    // <LeftSidebar content={<DashboardContent />}/>
  );
}

export default App;
