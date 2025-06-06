import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CapSo } from "../../types/CapSo.type";
import styles from "./CapSoRow.module.css";

interface CapSoRowProps {
  data: CapSo[];
  onSelectDetail: (capSo: CapSo) => void;
}

const CapSoRow: React.FC<CapSoRowProps> = ({ data, onSelectDetail }) => {
  // State lưu bản ghi đang chọn để hiển thị chi tiết
  // const [selectedItem, setSelectedItem] = useState<CapSo | null>(null);

  const columns: ColumnsType<CapSo> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center" as const,
      className: styles.cell,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      align: "left" as const,
      className: styles.cell,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service",
      key: "service",
      align: "left" as const,
      className: styles.cell,
    },
    {
      title: "Thời gian cấp",
      dataIndex: "timeIssued",
      key: "timeIssued",
      align: "center" as const,
      className: styles.cell,
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expiry",
      key: "expiry",
      align: "center" as const,
      className: styles.cell,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      className: styles.cell,
      render: (status: string) => {
        let color = "#34CD26";
        if (status === "Đang chờ") color = "#4277ff";
        else if (status === "Bỏ qua") color = "#E73F3F";
        else if (status === "Đã sử dụng") color = "#7E7D88";

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
      title: "Nguồn cấp",
      dataIndex: "source",
      key: "source",
      align: "center" as const,
      className: styles.cell,
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
            onSelectDetail(record); // Gán bản ghi được chọn vào state
          }}
        >
          Chi tiết
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

export default CapSoRow;
