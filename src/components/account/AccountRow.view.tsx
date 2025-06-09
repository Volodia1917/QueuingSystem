import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Account } from "../types/Account.type";
import styles from "../capso/CapSoRow/CapSoRow.module.css";

interface AccountRowProps {
  data: Account[];
  onSelectDetail: (account: Account) => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ data, onSelectDetail }) => {
  // State lưu bản ghi đang chọn để hiển thị chi tiết
  // const [selectedItem, setSelectedItem] = useState<CapSo | null>(null);

  const columns: ColumnsType<Account> = [
    {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "status",
    key: "status",
    align: "center" as const,
    className: styles.cell,
    render: (status: Account["status"]) => {
      let color = status === "Hoạt động" ? "#34CD26" : "#E73F3F";

      return (
        <span className={styles.status}>
          <span
            className={styles.dot}
            style={{ backgroundColor: color }}
          ></span>
          {status}
        </span>
      );
    },
  },
  {
    title: "",
    key: "action",
    align: "center" as const,
    className: styles.cell,
    render: (_, record) => (
      <a
        href="#"
        className={styles.link}
        onClick={(e) => {
          e.preventDefault();
          onSelectDetail(record);
        }}
      >
        Cập nhật
      </a>
    ),
  },
];


  return (
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
        className={styles.table}
        rowClassName={(_, index) =>
          index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
      />
  );
};

export default AccountRow;
