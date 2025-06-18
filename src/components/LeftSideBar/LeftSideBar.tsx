import React, { useEffect, useMemo, useState } from "react";
import styles from "./LeftSideBar.module.css";
import { LeftSidebarIcons } from "./LeftSidebarIcons";
import { Button, ConfigProvider, Image, Menu, Row, type MenuProps } from "antd";
import { getUserRole, type UserRole } from "../../libraries/useApi";
import { MENU_KEYS } from "../../libraries/config";
import { type MenuKey } from "../../libraries/config";
import LefSideBarTheme from "./LeftSideBar.theme";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";

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


function getMenuItemsForRole(role: UserRole, selectedKey: MenuKey): MenuItem[] {

	const allItems = [
		getItem(
			"Dashboard",
			MENU_KEYS.DASHBOARD,
			<LeftSidebarIcons.Dashboard
				stroke={selectedKey === MENU_KEYS.DASHBOARD ? "#fff" : "#A9A9B0"}
			/>
		),
		getItem(
			"Thiết bị",
			MENU_KEYS.DEVICE,
			<LeftSidebarIcons.Monitor
				stroke={selectedKey === MENU_KEYS.DEVICE ? "#fff" : "#A9A9B0"}
			/>
		),
		getItem(
			"Dịch vụ",
			MENU_KEYS.SERVICE,
			<LeftSidebarIcons.Service
				stroke={selectedKey === MENU_KEYS.SERVICE ? "#fff" : "#A9A9B0"}
			/>
		),
		getItem(
			"Cấp số",
			MENU_KEYS.CAP_SO,
			<LeftSidebarIcons.TicketProvider
				stroke={selectedKey === MENU_KEYS.CAP_SO ? "#fff" : "#A9A9B0"}
			/>
		),
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

	if (role === "Doctor") {
		return allItems.filter((item) => item?.key === MENU_KEYS.CAP_SO);
	}

	if (role === "Staff") {
		return allItems.map((item: any) => {
			if (item.key === MENU_KEYS.SYSTEM_SETTINGS && item.children) {
				const filteredChildren = item.children.filter(
					(child: any) => child.key !== MENU_KEYS.ACCOUNT_MANAGEMENT
				);
				return {
					...item,
					children: filteredChildren,
				};
			}
			return item;
		});
	}

	return allItems;
}

export function extractLabel(label: React.ReactNode): string {
	if (typeof label === "string") return label;
	if (React.isValidElement(label)) return label.props?.children || "Trang";
	return "Trang";
}

function getInitialSelectedKey(role: UserRole): MenuKey {
	if (role === "Doctor") return MENU_KEYS.CAP_SO;
	return MENU_KEYS.DASHBOARD;
}

interface LeftSideBarProps {
	sendSelectedIndex: (index: MenuKey) => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = (props) => {
	const { addBreadcrumb, setTitle, clearBreadcrumbs } = useBreadcrumb();
	const userRole: UserRole = getUserRole();
	const initialKey = useMemo(() => getInitialSelectedKey(userRole), [userRole]);

	const [selectedKey, setSelectedKey] = useState<MenuKey>(initialKey);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const items = useMemo(
		() => getMenuItemsForRole(userRole, selectedKey),
		[userRole, selectedKey]
	);

	const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
		setOpenKeys(keys as string[]);
	};

	const onSelect: MenuProps["onSelect"] = ({ key }) => {
		setSelectedKey(key as MenuKey);
		props.sendSelectedIndex(key as MenuKey);
		clearBreadcrumbs();
	};

	return (
		<ConfigProvider {...LefSideBarTheme}>
			{/* Logo */}
			<Row className={styles.logo}>
				<Image
					preview={false}
					src="/images/Logo.png"
					alt="Alta Media"
					height={64}
				/>
			</Row>

			{/* Menu */}
			<Row>
				<Menu
					mode="inline"
					items={items}
					selectedKeys={[selectedKey]}
					onSelect={onSelect}
					openKeys={openKeys}
					onOpenChange={onOpenChange}
					className={styles.custom_sidebar_menu}
				/>
			</Row>

			{/* Button: Đăng xuất */}
			<Row className={styles.btn_wrapper}>
				<Button
					className={styles.btn_logout}
					type="text"
					icon={<LeftSidebarIcons.Logout />}
					onClick={() => {
						localStorage.clear();
						window.location.reload();
					}}
				>
					<span style={{ marginLeft: 8 }}>Đăng xuất</span>
				</Button>
			</Row>
		</ConfigProvider>
	);
};

export default LeftSideBar;
