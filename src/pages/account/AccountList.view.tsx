import React, { useState } from "react";
import styles from "./AccountList.module.css";

import LeftSidebar from "../../components/Layout/LeftSidebar";
import AccountTopbar from "../../components/account/AccountTopbar.view"
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "../../components/capso/Pagination/Pagination.view";
import AccountFilterPanel from "../../components/account/AccountFilterPanel/AccountFilterPanel.view";
import AccountTable from "../../components/account/AccountTable.view";
import AccountFloatingActionButton from "../../components/account/AccountFloatingActionBtn.view";
import AccountDetail from "../../components/account/AccountDetail/AccountDetail.view";
import AddAccount from "../../components/account/AddAccount/AddAccount.view"
import type { Account } from "../../components/types/Account.type";

const AccountList: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedAddAccount, setSelectedAddAccount] = useState(false); // state mới

    const [accountData, setAccountData] = useState<Account[]>([
    {
      id: "1",
      username: "tuyetnguyen@12",
      fullName: "Nguyen Văn A",
      phone: "0919256712",
      email: "tuyetnguyen123@gmail.com",
      role: "Kế toán",
      status: "Hoạt động",
      password: "12345678",
      confirmPassword: "12345678",
    },
    // các item khác
  ]);

  const handleUpdateAccount = () => {
    if (!selectedAccount) return;

    setAccountData((prev) =>
      prev.map((acc) =>
        acc.id === selectedAccount.id ? selectedAccount : acc
      )
    );
    setSelectedAccount(null); // Quay lại danh sách sau khi cập nhật
  };

  const handleRoleChange = (role: string) => {
    if (selectedAccount) {
      setSelectedAccount({ ...selectedAccount, role });
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedAccount) {
      setSelectedAccount({ ...selectedAccount, status });
    }
  };

  return (
    // <LeftSidebar
    //   content={
        <div className={styles.container}>
          <div className={styles.topbar}>
            <AccountTopbar />
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.pageHeader}>
              <PageTitle title="Quản lý tài khoản" />
            </div>

            {selectedAccount ? (
              <AccountDetail
                account={selectedAccount}
                onCancel={() => setSelectedAccount(null)}
                onUpdate={handleUpdateAccount}
                onRoleChange={handleRoleChange}
                onStatusChange={handleStatusChange}
              />
            ) : selectedAddAccount ? (
                <AddAccount
                  onCancel={() => setSelectedAddAccount(false)}
                  onAdd={(newAccount) => {
                    setAccountData(prev => [...prev, { ...newAccount, id: String(prev.length + 1) }]);
                    setSelectedAddAccount(false);
                  }}
                />
              ) : (
              <>
                <div className={styles.mainContent}>
                  <div className={styles.filterpanel}>
                    <AccountFilterPanel />
                  </div>
                  <div className={styles.tableWithButton}>
                    <AccountTable
                      data={accountData}
                      onSelectDetail={(account) => setSelectedAccount(account)}
                    />
                    <div className={styles.floatingButton}>
                      <AccountFloatingActionButton onClick={() => setSelectedAddAccount(true)} />
                    </div>
                  </div>
                  <div className={styles.paginationWrapper}>
                    <Pagination />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
    //   }
    // />
  );
};

export default AccountList;