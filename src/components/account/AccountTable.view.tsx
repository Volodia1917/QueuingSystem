import React, { useState, useEffect } from "react";
import AccountRow from "../account/AccountRow.view";
import styles from "../capso/CapSoTable/CapSoTable.module.css";
import type { Account } from "../types/Account.type";
import AccountDetail from "../account/AccountDetail/AccountDetail.view";
import {fetchAccounts} from "../../libraries/Account/accountApi"


interface AccountTableProps {
  data: Account[];
  onSelectDetail: (account: Account) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({ onSelectDetail }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  // State lưu bản ghi được chọn để hiện chi tiết
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Gọi API khi component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
        console.log (data)
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
      }
    };
    loadData();
  }, []);

  // Hàm xử lý chọn bản ghi
  const handleSelectDetail = (account: Account) => {
    setSelectedAccount(account);
    onSelectDetail(account);
  };

  return (
    <div className={styles.wrapper}>
      <AccountRow data={accounts} onSelectDetail={handleSelectDetail} />
      {/* {selectedCapSo && (
        <CapSoDetail capSo={selectedCapSo} onBack={() => setSelectedCapSo(null)} />
      )} */}
    </div>
  );
};
export default AccountTable;
