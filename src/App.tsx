import React, { useState } from "react";
// import Login from './pages/Login.view';
import DashboardContent from "./pages/dashboard";
import LeftSidebar from "./components/Layout/LeftSidebar";
import DevicePage from "./pages/device";
import ServicePage from "./pages/service";
import Login from "./pages/login/Login.view";

function App() {
	const [selectMenu, setSelectedMenu] = useState("1");
	const receiveSelectedMenu = (index: string) => {
		setSelectedMenu(index);
	};

	const checkLogined = localStorage.getItem("isLogined") != "true";

	return checkLogined ? <Login />
	: <div style={{height:'100vh'}}>
	  <LeftSidebar
	    content={
	      selectMenu=='1'?<DashboardContent /> : selectMenu=='2' ?<DevicePage />:<ServicePage />
	  } sendSelectedIndex={receiveSelectedMenu} />
	</div>
}
export default App;
