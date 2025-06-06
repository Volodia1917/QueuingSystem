import React, { useState } from "react";
import AccountRow from "../account/AccountRow.view";
import styles from "../capso/CapSoTable/CapSoTable.module.css";
import type { Account } from "../types/Account.type";
import AccountDetail from "../account/AccountDetail/AccountDetail.view";


interface AccountTableProps {
  data?: Account[];
  onSelectDetail: (account: Account) => void;
}

const AccountTable: React.FC <AccountTableProps> = ({ data: propData, onSelectDetail: propOnSelect }) => {
  const data: Account[] = [
    {
    id: "1",
    username: "tuyetnguyen@12",
    fullName: "Nguyen Văn A",
    phone: "0919256712",
    email: "tuyetnguyen123@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "2",
    username: "tuyetnguyen@10",
    fullName: "Nguyen Văn B",
    phone: "0919236712",
    email: "tuyetnguyen123@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "3",
    username: "tuyetnguyen@22",
    fullName: "Nguyen Văn C",
    phone: "0919116712",
    email: "tuyetnguyen222@gmail.com",
    role: "Kế toán",
    status: "Ngưng hoạt động",
  },
  {
    id: "4",
    username: "tuyetnguyen@18",
    fullName: "Nguyen Văn D",
    phone: "0919253715",
    email: "tuyetnguyen232@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "5",
    username: "tuyetnguyen@19",
    fullName: "Nguyen Văn T",
    phone: "0919233712",
    email: "tuyetnguyen244@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "6",
    username: "tuyetnguyen@8",
    fullName: "Nguyen Văn K",
    phone: "0919277712",
    email: "tuyetnguyen242@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "7",
    username: "tuyetnguyen@16",
    fullName: "Nguyen Văn N",
    phone: "0919257008",
    email: "tuyetnguyen122@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
  {
    id: "8",
    username: "tuyetnguyen@14",
    fullName: "Nguyen Văn M",
    phone: "0919258003",
    email: "tuyetnguyen227@gmail.com",
    role: "Kế toán",
    status: "Ngưng hoạt động",
  },
  {
    id: "9",
    username: "tuyetnguyen@13",
    fullName: "Nguyen Văn L",
    phone: "0919251274",
    email: "tuyetnguyen278@gmail.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
];

  // State lưu bản ghi được chọn để hiện chi tiết
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Hàm xử lý chọn bản ghi
  const handleSelectDetail = (account: Account) => {
    setSelectedAccount(account);
    if (propOnSelect) {
      propOnSelect(account);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AccountRow data={data} onSelectDetail={handleSelectDetail} />
      {/* {selectedCapSo && (
        <CapSoDetail capSo={selectedCapSo} onBack={() => setSelectedCapSo(null)} />
      )} */}
    </div>
  );
};
export default AccountTable;
