import { useState, useEffect } from "react";
import { Result, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import DashboardContent from "./pages/dashboard";
import LeftSidebar from "./components/Layout/LeftSidebar";
import DevicePage from "./pages/device";
import ServicePage from "./pages/service";
import CapSoList from "./pages/capso/CapSoList.view";
import AccountList from "./pages/account/AccountList.view";
import Login from "./pages/login/Login.view";
import DoctorPage from "./pages/doctor";

import {
  getUserRole,
  checkMenuAccess,
  getDefaultMenuForRole,
  type UserRole,
} from "./libraries/useApi";
import { MENU_KEYS } from "./libraries/config";
import { type MenuKey } from "./libraries/config";

function App() {
  const [selectMenu, setSelectedMenu] = useState<MenuKey>(MENU_KEYS.DASHBOARD);
  const userRole: UserRole = getUserRole();

  useEffect(() => {
    const defaultMenu = getDefaultMenuForRole(userRole);
    setSelectedMenu(defaultMenu);
  }, [userRole]);

  const receiveSelectedMenu = (index: MenuKey) => {
    if (!checkMenuAccess(index, userRole)) {
      return;
    }

    setSelectedMenu(index);
  };

  const renderContent = () => {
    if (!checkMenuAccess(selectMenu, userRole)) {
      return (
        <AccessDenied
          onBackToHome={() => {
            const defaultMenu = getDefaultMenuForRole(userRole);
            setSelectedMenu(defaultMenu);
          }}
        />
      );
    }

    switch (selectMenu) {
      case MENU_KEYS.DASHBOARD:
        return <DashboardContent />;
      case MENU_KEYS.DEVICE:
        return <DevicePage />;
      case MENU_KEYS.SERVICE:
        return <ServicePage />;
      case MENU_KEYS.CAP_SO:
        return <CapSoList />;
      case MENU_KEYS.DOCTOR_PAGE:
        return <DoctorPage />;
      case MENU_KEYS.ACCOUNT_MANAGEMENT:
        return <AccountList />;
      default:
        return null;
    }
  };

  return localStorage.getItem("isLogined") != "true" ? (
    <Login />
  ) : (
    <div style={{ height: "100vh" }}>
      <LeftSidebar
        content={renderContent()}
        sendSelectedIndex={receiveSelectedMenu}
      />
    </div>
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
