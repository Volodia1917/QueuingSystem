import { Pagination, Table } from "antd";
import React from "react";
import "./TableCustom.css";

export interface PaginationConfig {
  current: number;
  total: number;
  pageSize: number;
  onChange?: (page: number, pageSize: number) => void;
  style?: React.CSSProperties;
  align?: "start" | "center" | "end";
}

export interface TableCustomProps {
  columns: any[];
  data: any[];
  pagination?: PaginationConfig;
  loading?: boolean;
  size?: "middle" | "small" | "large";
  style?: React.CSSProperties;
}

const TableCustom = ({
  columns,
  data,
  pagination,
  loading,
  size,
  style,
}: TableCustomProps) => {
  return (
    <div>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        size={size}
        style={style}
      />
      <Pagination
        align={pagination?.align}
        style={pagination?.style}
        current={pagination?.current}
        total={pagination?.total}
        pageSize={pagination?.pageSize}
        onChange={pagination?.onChange}
      />
    </div>
  );
};

export default TableCustom;
