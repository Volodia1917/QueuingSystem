// SiderComponent.tsx
import React from "react";
import { Layout, Menu } from "antd";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";

const { Sider } = Layout;

const SiderComponent: React.FC = () => {
  const { addBreadcrumb, clearBreadcrumbs, setTitle } = useBreadcrumb();

  const handleMenuClick = (menuTitle: string) => {
    clearBreadcrumbs(); // Xóa tất cả breadcrumb trước khi thêm mới
    addBreadcrumb({ title: menuTitle });
    setTitle(menuTitle); // Cập nhật title khi chọn menu
  };

  const handleSubMenuClick = (parentTitle: string, subMenuTitle: string) => {
    // Cập nhật breadcrumb cho sub-menu
    addBreadcrumb({ title: parentTitle });
    addBreadcrumb({ title: subMenuTitle });
    setTitle(subMenuTitle); // Cập nhật title cho sub-menu
  };

  return (
    <Sider >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" onClick={() => handleMenuClick("Dashboard")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" onClick={() => handleMenuClick("Quản lý tài khoản")}>
          Quản lý tài khoản
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() =>
            handleSubMenuClick("Quản lý tài khoản", "Thêm tài khoản")
          }
        >
          Thêm tài khoản
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderComponent;
