import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import AccountList from "../../pages/account/AccountList.view";
import AccountForm from "./AccountForm";
import { Account } from "../types/Account.type";

type AccountKey = "userManagement" | "userAdd" | "userUpdate";

const AccountListContent: React.FC = () => {
	const { setBreadcrumbs } = useBreadcrumb();
	const [selectedUser, setSelectedUser] = useState<Account | null>(null);
	const [viewMode, setViewMode] = useState<AccountKey>("userManagement");

	// Set mặc định ban đầu khi vào trang
	useEffect(() => {
		if (viewMode === "userManagement") {
			setBreadcrumbs([
				{ title: "Cài đặt hệ thống" },
				{ title: "Quản lý tài khoản" },
			]);
		} else if (viewMode === "userAdd") {
			setBreadcrumbs([
				{ title: "Cài đặt hệ thống" },
				{
					title: "Quản lý tài khoản",
					onClick: () => setViewMode("userManagement"),
				},
				{ title: "Thêm tài khoản" },
			]);
		} else if (viewMode === "userUpdate") {
			setBreadcrumbs([
				{ title: "Cài đặt hệ thống" },
				{
					title: "Quản lý tài khoản",
					onClick: () => setViewMode("userManagement"),
				},
				{ title: "Cập nhật tài khoản" },
			]);
		}
	}, [viewMode]);

	const handleAddUser = () => {
		setViewMode("userAdd");
	};
	const handleClickUpdate = () => {
		// setSelectedForm(user);
		setViewMode("userUpdate");
	};


	return (
		<>
			{viewMode === "userManagement" && (
				<AccountList
					onClickAddAccount={handleAddUser}
					onClickUpdate={handleClickUpdate}
					onSendInfoUser={(user) => setSelectedUser(user)}
				/>
			)}
			{viewMode === "userAdd" && (
				<AccountForm
					user={null}
					onCancel={() => setViewMode("userManagement")}
				/>
			)}
			{viewMode === "userUpdate" && (
				<AccountForm
					user={selectedUser}
					onCancel={() => setViewMode("userManagement")}
				/>
			)}
		</>
	);
}

export default AccountListContent;