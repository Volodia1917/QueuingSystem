import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AdminFilterAssignment } from "../../../libraries/assignmentApi";
import { formatDateTime, getStatusText, getStatusColor } from "../utils/capso.utils";
import styles from "./CapSoRow.module.css";

interface CapSoRowProps {
  data: AdminFilterAssignment[];
  loading?: boolean;
  onSelectDetail: (capSo: AdminFilterAssignment) => void;
}

const CapSoRow: React.FC<CapSoRowProps> = ({ data, loading = false, onSelectDetail }) => {
  const columns: ColumnsType<AdminFilterAssignment> = [{
    title: "STT",
    dataIndex: "code",
    key: "code",
    align: "center" as const,
    className: styles.cell,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customerName",
    key: "customerName",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "serviceName",
    key: "serviceName",
    align: "left" as const,
    className: styles.cell,
  },
  {
    title: "Thời gian cấp",
    dataIndex: "assignmentDate",
    key: "assignmentDate",
    align: "center" as const,
    className: styles.cell,
    render: (dateString: string) => formatDateTime(dateString),
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expireDate",
    key: "expireDate",
    align: "center" as const,
    className: styles.cell,
    render: (dateString: string) => formatDateTime(dateString),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center" as const,
    className: styles.cell, render: (status: number) => {
      const statusText = getStatusText(status);
      const color = getStatusColor(status);

      return (
        <span className={styles.status}>
          <span
            className={styles.dot}
            style={{ backgroundColor: color }}
          ></span>
          {statusText}
        </span>
      );
    },
  },
  {
    title: "Nguồn cấp",
    dataIndex: "deviceCode",
    key: "deviceCode",
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
  ]; return (<Table
    dataSource={data}
    columns={columns}
    loading={loading}
    rowKey="code"
    pagination={false}
    bordered
    className={styles.table}
    scroll={{ x: 800, y: 600 }}
    rowClassName={(_, index) =>
      index % 2 === 0 ? styles.evenRow : styles.oddRow
    }
  />
  );
};

export default CapSoRow;
