import React, { useState } from "react";
import AccountFilterPanel from "../../components/account/AccountFilterPanel/AccountFilterPanel.view";
import AccountFloatingActionButton from "../../components/account/accountfloating/AccountFloatingActionBtn.view";
import type { Account } from "../../components/types/Account.type";
import { useBreadcrumb } from "../../components/Layout/BreadcrumbContext";
import ContentLayout from "../../components/Layouts/ContentLayout";
import AccountTable from "../../components/account/AccountTable";

interface AccountListProps {
  onClickAddAccount: () => void;
  onClickUpdate: () => void;
  onSendInfoUser: (user: Account | null) => void;
}

const AccountList: React.FC<AccountListProps> = (props) => {
  const { addBreadcrumb } = useBreadcrumb();
  const [selectedUser, setSelectedUser] = useState<Account | null>(null);

  const handleAddAccount = () => {
    addBreadcrumb({ title: "Thêm tài khoản" });
    props.onClickAddAccount();
  };

  const handleSelectedUpdate = () => {
    addBreadcrumb({ title: "Cập nhật tài khoản" });
    props.onClickUpdate();
  };

  const handleUpdateUser = (user: Account) => {
    console.log("Nhận user từ bảng:", user);
    setSelectedUser(user);
    props.onSendInfoUser(user);
  };

  return (
    <ContentLayout
      title="Danh sách tài khoản"
      filter={<AccountFilterPanel />}
      button={<AccountFloatingActionButton onClick={handleAddAccount} />}
    >
      <AccountTable
        onUpdateUser={handleUpdateUser}
        onSelectedUpdate={handleSelectedUpdate}
      />
    </ContentLayout>
  );
};

export default AccountList;
