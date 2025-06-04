import React, { useState } from "react";
import { Card, Input, Select, Typography, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import TableCustom from "../Table/TableCustom";
import { Icons } from "../Icons/Icons";
import "./DeviceList.css";

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

interface DeviceData {
  key: string;
  deviceCode: string;
  deviceName: string;
  ipAddress: string;
  activeStatus: "active" | "inactive";
  connectionStatus: "connected" | "disconnected";
  services: string;
}

interface DeviceListProps {
  onAddDevice: () => void;
  onViewDetail: (device: DeviceData) => void;
  onUpdateDevice: (device: DeviceData) => void;
}

export const DeviceList: React.FC<DeviceListProps> = ({
  onAddDevice,
  onViewDetail,
  onUpdateDevice,
}) => {
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [connectionStatus, setConnectionStatus] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  const deviceData: DeviceData[] = [
    {
      key: "1",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "inactive",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "2",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "connected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "3",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "4",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "inactive",
      connectionStatus: "connected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "5",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "6",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "7",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "inactive",
      connectionStatus: "connected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "8",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
    {
      key: "9",
      deviceCode: "KIO_01",
      deviceName: "Kiosk",
      ipAddress: "192.168.1.10",
      activeStatus: "active",
      connectionStatus: "disconnected",
      services: "Khám tim mạch, Khám mắt, Xem thêm",
    },
  ];

  const deviceColumns: TableProps<DeviceData>["columns"] = [
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      key: "deviceCode",
      width: "12%",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
      width: "12%",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "12%",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activeStatus",
      key: "activeStatus",
      width: "15%",
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
      title: "Trạng thái kết nối",
      dataIndex: "connectionStatus",
      key: "connectionStatus",
      width: "15%",
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
              backgroundColor: status === "connected" ? "#34cd26" : "#ec3740",
            }}
          />
          {status === "connected" ? "Kết nối" : "Mất kết nối"}
        </span>
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "services",
      key: "services",
      width: "22%",
    },
    {
      title: "",
      key: "detail",
      width: "6%",
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
      width: "6%",
      render: (_, record) => (
        <button
          onClick={() => onUpdateDevice(record)}
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

  const activeStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Ngưng hoạt động" },
  ];

  const connectionStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "connected", label: "Kết nối" },
    { value: "disconnected", label: "Mất kết nối" },
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
              {activeStatusOptions.map((option) => (
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
            <Title level={5}>Trạng thái kết nối</Title>
            <Select
              style={{ width: "100%" }}
              defaultValue="all"
              onChange={(value) => setConnectionStatus(value)}
              size="large"
              placeholder="Chọn trạng thái"
            >
              {connectionStatusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Card>
        </Flex>

        <Card
          size="small"
          style={{ border: "none", background: "transparent" }}
        >
          <Title level={5}>Từ khóa</Title>
          <Search
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
      title="Danh sách thiết bị"
      floatButtonItems={[
        {
          icon: <Icons.Add />,
          label: "Thêm thiết bị",
          onClick: onAddDevice,
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
        <TableCustom style={{height:'500px', overflow:'auto'}}
          columns={deviceColumns}
          data={deviceData}
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

export default DeviceList;
