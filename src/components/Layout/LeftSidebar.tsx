import React, { useState, useMemo } from "react";
import { Button, Layout, Menu, Image, type MenuProps } from "antd";
import { LeftSidebarIcons } from "./LeftSidebarIcons";
import "./LeftSidebar.css";
import { BreadcrumbProvider } from "./BreadcrumbContext";
import {
  getUserRole,
  getDefaultMenuForRole,
  type UserRole,
} from "../../libraries/useApi";
import { MENU_KEYS } from "../../libraries/config";
import { type MenuKey } from "../../libraries/config";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const { Header, Sider, Content } = Layout;
const LeftSidebar = (props: {
  header?: React.ReactNode;
  content: React.ReactNode;
  sendSelectedIndex: (index: MenuKey) => void;
}) => {
  const [selectedKey, setSelectedKey] = useState<MenuKey>(MENU_KEYS.DASHBOARD);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const userRole: UserRole = getUserRole();

  const items: MenuItem[] = useMemo(() => {
    const allItems = [
      getItem(
        "Dashboard",
        MENU_KEYS.DASHBOARD,
        <LeftSidebarIcons.Dashboard
          stroke={selectedKey === MENU_KEYS.DASHBOARD ? "#fff" : "#A9A9B0"}
        />
      ),
      getItem("Thiết bị", MENU_KEYS.DEVICE, <LeftSidebarIcons.Monitor />),
      getItem("Dịch vụ", MENU_KEYS.SERVICE, <LeftSidebarIcons.Service />),
      getItem("Cấp số", MENU_KEYS.CAP_SO, <LeftSidebarIcons.TicketProvider />),
      // getItem("Xin chào", MENU_KEYS.DOCTOR_PAGE, <LeftSidebarIcons.TicketProvider />),
      getItem(
        "Cài đặt hệ thống",
        MENU_KEYS.SYSTEM_SETTINGS,
        <LeftSidebarIcons.Setting />,
        [
          getItem("Quản lý vai trò", MENU_KEYS.ROLE_MANAGEMENT),
          getItem("Quản lý tài khoản", MENU_KEYS.ACCOUNT_MANAGEMENT),
          getItem("Nhật ký người dùng", MENU_KEYS.USER_LOG),
        ]
      ),
    ];

    if (userRole === "Doctor") {
      return allItems.filter((item) => item?.key === MENU_KEYS.CAP_SO);
    } else if (userRole === "Staff") {
      return allItems.map((item) => {
        if (item?.key === MENU_KEYS.SYSTEM_SETTINGS) {
          const filteredChildren = (item as any).children?.filter(
            (child: any) => child.key !== MENU_KEYS.ACCOUNT_MANAGEMENT
          );
          return {
            ...item,
            children: filteredChildren,
          };
        }
        return item;
      });
    } else {
      return allItems;
    }
  }, [selectedKey, userRole]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKey(key as MenuKey);
    props.sendSelectedIndex(key as MenuKey);
  };

  React.useEffect(() => {
    const defaultMenu = getDefaultMenuForRole(userRole);
    if (userRole === "Doctor") {
      setSelectedKey(defaultMenu);
      props.sendSelectedIndex(defaultMenu);
    } else if (
      selectedKey === MENU_KEYS.ACCOUNT_MANAGEMENT &&
      userRole === "Staff"
    ) {
      setSelectedKey(MENU_KEYS.DASHBOARD);
      props.sendSelectedIndex(MENU_KEYS.DASHBOARD);
    }
  }, [userRole]);

  return (
    <Layout style={{ height: "100vh" }}>
      <BreadcrumbProvider>
        <Sider
          trigger={null}
          collapsible
          style={{ background: "#fff" }}
          width={200}
        >
          <div className="logo" style={{ padding: "36px", textAlign: "center" }}>
            <Image
              preview={false}
              src="/images/Logo.png"
              alt="Alta Media"
              style={{ height: 64 }}
            />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={
              userRole === "Doctor" ? [MENU_KEYS.DOCTOR_PAGE] : [MENU_KEYS.DASHBOARD]
            }
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
            style={{
              borderRight: 0,
            }}
            items={items}
            className="custom-sidebar-menu"
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
              padding: "0 16px",
            }}
          >
            <Button
              type="text"
              icon={<LeftSidebarIcons.Logout />}
              style={{
                width: "100%",
                textAlign: "left",
                backgroundColor: "#FFF2E7",
                color: "#FF7506",
                borderRadius: "8px",
                height: "40px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <span style={{ marginLeft: 8 }}>Đăng xuất</span>
            </Button>
          </div>
        </Sider>
        <Layout>
          {props.header ? (
            <Header style={{ padding: "0 24px", background: "#F6F6F6" }}>
              {props.header}
            </Header>
          ) : null}
          <Content>{props.content}</Content>
        </Layout>
      </BreadcrumbProvider>
    </Layout>
  );
};

export default LeftSidebar;
