import React, { useState } from "react";
import { Card, Table, Input, Select, DatePicker, Typography, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import TableCustom from "../Table/TableCustom";
import { Icons } from "../Icons/Icons";

import "./ServiceList.css";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface ServiceData {
  key: string;
  serviceCode: string;
  serviceName: string;
  description: string;
  status: "active" | "inactive";
  queueNumbers?: QueueNumber[];
}

interface QueueNumber {
  number: string;
  status: "completed" | "active" | "waiting" | "skipped";
}

interface ServiceListProps {
  onAddService: () => void;
  onViewDetail: (service: ServiceData) => void;
  onUpdateService: (service: ServiceData) => void;
}

const { Search } = Input;

export const ServiceList: React.FC<ServiceListProps> = ({
  onAddService,
  onViewDetail,
  onUpdateService,
}) => {
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  const [dateRange, setDateRange] = useState<any>(null);

  const serviceData: ServiceData[] = [
    {
      key: "1",
      serviceCode: "KIO_01",
      serviceName: "Kiosk",
      description: "Mô tả dịch vụ 1",
      status: "active",
    },
    {
      key: "2",
      serviceCode: "KIO_01",
      serviceName: "Kiosk",
      description: "Hoạt động",
      status: "active",
    },
    {
      key: "3",
      serviceCode: "KIO_01",
      serviceName: "Kiosk",
      description: "Hoạt động",
      status: "inactive",
    },
  ];

  const serviceColumns: TableProps<ServiceData>["columns"] = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
      key: "serviceCode",
      width: "15%",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              display: "inline-block",
              backgroundColor: status === "active" ? "#34cd26" : "#ec3740",
            }}
          />
          {status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
        </span>
      ),
    },
    {
      title: "",
      key: "detail",
      width: "10%",
      render: (_, record) => (
        <button
          onClick={() => onViewDetail(record)}
          style={{
            color: "#4277ff",
            textDecoration: "underline",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
          }}
        >
          Chi tiết
        </button>
      ),
    },
    {
      title: "",
      key: "update",
      width: "10%",
      render: (_, record) => (
        <button
          onClick={() => onUpdateService(record)}
          style={{
            color: "#4277ff",
            textDecoration: "underline",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
          }}
        >
          Cập nhật
        </button>
      ),
    },
  ];

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Ngưng hoạt động" },
  ];

  function renderFilters() {
    return (
      <Flex
        align="center"
        justify="space-between"
        wrap
        style={{ marginBottom: "24px" }}
      >
        <Flex gap={24} align="center" justify="space-between" wrap>
          <Card
            size="small"
            style={{ border: "none", background: "transparent" }}
          >
            <Title level={5}>Trạng thái hoạt động</Title>
            <Select
              style={{ width: "100%" }}
              defaultValue="all"
              onChange={(value) => setActiveStatus(value)}
              size="large"
              placeholder="Chọn trạng thái"
            >
              {statusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Card>

          <Card
            size="small"
            style={{ border: "none", background: "transparent" }}
          >
            <Title level={5}>Chọn thời gian</Title>
            <RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              onChange={(dates) => setDateRange(dates)}
              placeholder={["10/10/2021", "18/10/2021"]}
              size="small"
            />
          </Card>
        </Flex>

        <Card
          size="small"
          style={{ border: "none", background: "transparent" }}
        >
          <Title level={5}>Từ khóa</Title>
          <Search
            className="search_input"
            placeholder="Nhập từ khóa"
            enterButton={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <SearchOutlined />
              </div>
            }
            size="large"
            onSearch={(value) => setKeyword(value)}
            style={{ width: "100%" }}
          />
        </Card>
      </Flex>
    );
  }

  return (
    <MainContentLayout
      title="Quản lý dịch vụ"
      floatButtonItems={[
        {
          icon: <Icons.Add />,
          label: "Thêm dịch vụ",
          onClick: onAddService,
        },
      ]}
    >
      {renderFilters()}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          overflow: "hidden",
        }}
      >
        <TableCustom
          columns={serviceColumns}
          data={serviceData}
          pagination={{
            current: 1,
            total: 100,
            pageSize: 10,
            style: {
              padding: "16px 24px",
            },
            align: "end",
          }}
        />
      </div>
    </MainContentLayout>
  );
};
