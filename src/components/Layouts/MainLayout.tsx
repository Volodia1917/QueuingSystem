import React, { useState } from "react";
import styles from "./Layout.module.css";
import {Layout} from "antd";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { MENU_KEYS, MenuKey } from "../../libraries/config";
import MainContentLayout from "./MainContentLayout";

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  // Variables
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>(
    MENU_KEYS.DASHBOARD
  );

  // Function
  const receiveSelectedMenu = (index: MenuKey) => {
    setSelectedMenu(index);
  };

  return (
    <Layout className={styles.main_layout}>
      {/* Cột Sider */}
      <Sider trigger={null} className={styles.sider_layout}>
        <LeftSideBar sendSelectedIndex={receiveSelectedMenu} />
      </Sider>

      {/* Content */}
      <Content className={styles.content_layout}>
        <MainContentLayout selectedMenu={selectedMenu} />
      </Content>
    </Layout>
  );
};
export default MainLayout;
