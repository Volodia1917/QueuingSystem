import { useState, useEffect } from "react";
import { Result, Button, Layout } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import DashboardContent from "./pages/dashboard";
// import LeftSidebar from "./components/Layout/LeftSidebar";
import LeftSidebar from "./components/test/LeftSidebar";
import DevicePage from "./pages/device";
import ServicePage from "./pages/service";
import CapSoList from "./pages/capso/CapSoList.view";
// import AccountList from "./pages/account/AccountList.view";
import Login from "./pages/login/Login.view";

import {
  getUserRole,
  checkMenuAccess,
  getDefaultMenuForRole,
  type UserRole,
} from "./libraries/useApi";
import { MENU_KEYS } from "./libraries/config";
import { type MenuKey } from "./libraries/config";
import UserProfile from "./components/User/UserContent";
import TopBar from "./components/TopBar/TopBar";
import { BreadcrumbProvider } from "./components/Layout/BreadcrumbContext";
// import UserPage from "./components/TopBar/UserPage";
import UserPage from "./components/test/UserPage";
import { Content } from "antd/es/layout/layout";
import AccountManagement from "./components/test/AccountManagement";
import MainLayout from "./components/Layouts/MainLayout";

function App() {
  // const isLogined = true;
  // const [selectMenu, setSelectedMenu] = useState<MenuKey>(MENU_KEYS.DASHBOARD);
  // const userRole: UserRole = getUserRole();

  // useEffect(() => {
  //   const defaultMenu = getDefaultMenuForRole(userRole);
  //   setSelectedMenu(defaultMenu);
  // }, [userRole]);

  // const receiveSelectedMenu = (index: MenuKey) => {
  //   if (!checkMenuAccess(index, userRole)) {
  //     return;
  //   }

  //   setSelectedMenu(index);
  // };

  // const renderContent = () => {
  //   if (!checkMenuAccess(selectMenu, userRole)) {
  //     return (
  //       <AccessDenied
  //         onBackToHome={() => {
  //           const defaultMenu = getDefaultMenuForRole(userRole);
  //           setSelectedMenu(defaultMenu);
  //         }}
  //       />
  //     );
  //   }


  // // localStorage.getItem("isLogined") != "true"
  return localStorage.getItem("isLogined") != "true" ? (
    <Login />
  ) : (
    <BreadcrumbProvider>
      <MainLayout />
    </BreadcrumbProvider>
  );
}
export const AccessDenied: React.FC<{
  title?: string;
  subTitle?: string;
  onBackToHome?: () => void;
}> = ({ title, subTitle, onBackToHome }) => {
  return (
    <Result
      icon={<ExclamationCircleOutlined style={{ color: "#faad14" }} />}
      title={title}
      subTitle={subTitle}
      extra={
        onBackToHome && (
          <Button type="primary" onClick={onBackToHome}>
            Về trang chủ
          </Button>
        )
      }
    />
  );
};

export default App;
