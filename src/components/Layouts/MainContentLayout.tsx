import React, { useState } from "react";
import styles from "./Layout.module.css";
import { Col, Layout, Row } from "antd";
import TopBar from "../TopBar/TopBar";
import SiderComponent from "./Sider";
import { getUserRole, UserRole } from "../../libraries/useApi";
import { MENU_KEYS, MenuKey } from "../../libraries/config";
import DashboardContent from "../../pages/dashboard";
import DevicePage from "../../pages/device";
import ServicePage from "../../pages/service";
import CapSoList from "../../pages/capso/CapSoList.view";
// import AccountList from "../../pages/account/AccountList.view";
// import AccountList from "../AccountList/AccountList.content";
import AccountListContent from "../account/accountlist/AccountList.content";

interface MainContentLayoutProps {
  selectedMenu: MenuKey;
}

const MainContentLayout: React.FC<MainContentLayoutProps> = (props) => {
  const [selectMenu, setSelectedMenu] = useState<MenuKey>(MENU_KEYS.DASHBOARD);
  const userRole: UserRole = getUserRole();

  const renderContent = () => {
    switch (props.selectedMenu) {
      case MENU_KEYS.DASHBOARD:
        return <DashboardContent />;

      case MENU_KEYS.DEVICE:
        return <DevicePage />;

      case MENU_KEYS.SERVICE:
        return <ServicePage />;

      case MENU_KEYS.CAP_SO:
        return <CapSoList />;

      case MENU_KEYS.ACCOUNT_MANAGEMENT:
        return <AccountListContent />;
      //   case MENU_KEYS.USER_INFO:
      //     return <UserProfile />;
      default:
        return null;
    }
  };

  return (
    <>
      <Row className={styles.topbar_wrapper}>
        <TopBar />
      </Row>

      <Row className={styles.content_wrapper}>{renderContent()}</Row>
    </>
  );
};

export default MainContentLayout;
