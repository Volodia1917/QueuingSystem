import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import { MENU_KEYS } from "../../libraries/config";

const { Sider } = Layout;

const LeftSidebar: React.FC<{ onSelectMenu: (key: string) => void }> = ({
  onSelectMenu,
}) => {
  const { setBreadcrumbs } = useBreadcrumb();
  const [selectedKey, setSelectedKey] = useState<string>(MENU_KEYS.DASHBOARD);

  const handleMenuSelect = (key: string) => {
    setSelectedKey(key);
    onSelectMenu(key);

    // Cập nhật breadcrumb khi người dùng chọn menu
    if (key === MENU_KEYS.ACCOUNT_MANAGEMENT) {
      setBreadcrumbs([{ title: "Dashboard" }, { title: "Account Management" }]);
    } else if (key === MENU_KEYS.USER_INFO) {
      setBreadcrumbs([{ title: "Dashboard" }, { title: "User Info" }]);
    } else {
      setBreadcrumbs([{ title: "Dashboard" }]);
    }
  };

  return (
    <Sider>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={({ key }) => handleMenuSelect(key)}
      >
        <Menu.Item key={MENU_KEYS.DASHBOARD}>Dashboard</Menu.Item>
        <Menu.Item key={MENU_KEYS.ACCOUNT_MANAGEMENT}>
          Account Management
        </Menu.Item>
        <Menu.Item key={MENU_KEYS.USER_INFO}>User Info</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftSidebar;
