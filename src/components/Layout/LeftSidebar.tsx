import React, { useState, useMemo } from "react";
import { Button, Layout, Menu, Image, type MenuProps } from "antd";
import { LeftSidebarIcons } from "./LeftSidebarIcons";
import "./LeftSidebar.css";
import { BreadcrumbProvider } from "./BreadcrumbContext";

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
const LeftSidebar = (props:{
  header?:React.ReactNode,
  content:React.ReactNode,
  sendSelectedIndex: (index:string) => void
}) => {
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items: MenuItem[] = useMemo(
    () => [
      getItem(
        "Dashboard",
        "1",
        <LeftSidebarIcons.Dashboard
          stroke={selectedKey === "1" ? "#fff" : "#A9A9B0"}
        />
      ),
      getItem("Thiết bị", "2", <LeftSidebarIcons.Monitor />),
      getItem("Dịch vụ", "3", <LeftSidebarIcons.Service />),
      getItem("Cấp số", "4", <LeftSidebarIcons.TicketProvider />),
      getItem("Báo cáo", "5", <LeftSidebarIcons.Report />),
      getItem("Cài đặt hệ thống", "6", <LeftSidebarIcons.Setting />, [
        getItem("Quản lý vai trò", "6.1"),
        getItem("Quản lý tài khoản", "6.2"),
        getItem("Nhật ký người dùng", "6.3"),
      ]),
    ],
    [selectedKey]
  );

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKey(key);
    props.sendSelectedIndex(key);
  };

  return (
    <Layout style={{height: "100vh"}}>
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
          defaultSelectedKeys={["1"]}
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
            onClick={()=>{
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
