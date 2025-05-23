import { Button, Flex, Typography, Avatar } from "antd";
import { Icons } from "./Icons";
import OverviewCalendar from "./Calendar";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { OverviewItem, type OverviewItemData } from "./OverviewItem";
const { Text, Title } = Typography;

const overviewItems: OverviewItemData[] = [
  {
    id: "devices",
    percentage: 90,
    totalValue: "4.221",
    label: "Thiết bị",
    chartColor: "#ff8c00",
    backgroundColor: "#f0f0f0", // Màu nền xám nhạt hơn
    icon: <Icons.OverviewDevice />,
    details: [
      { name: "Đang hoạt động", value: "3.799", color: "#ff8c00" },
      { name: "Ngừng hoạt động", value: "422", color: "#505050" },
    ],
  },
  {
    id: "services",
    percentage: 76,
    totalValue: "276",
    label: "Dịch vụ",
    chartColor: "#007bff",
    backgroundColor: "#f0f0f0",
    icon: <Icons.OverviewService />,
    details: [
      { name: "Đang hoạt động", value: "210", color: "#007bff" },
      { name: "Ngừng hoạt động", value: "66", color: "#505050" },
    ],
  },
  {
    id: "numbers",
    percentage: 86,
    totalValue: "4.221",
    label: "Cấp số",
    chartColor: "#28a745",
    backgroundColor: "#f0f0f0",
    icon: <Icons.OverviewQueue />,
    details: [
      { name: "Đã sử dụng", value: "3.721", color: "#28a745" },
      { name: "Đang chờ", value: "486", color: "#ffc107" },
      { name: "Bỏ qua", value: "32", color: "#505050" },
    ],
  },
];

export const OverviewRightSidebar = () => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflow: "auto",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex
        align="center"
        justify="flex-end"
        gap={12}
        style={{ marginBottom: "16px" }}
      >
        <Button
          type="text"
          icon={<Icons.NotificationBell />}
          style={{
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Flex align="center" gap={12}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1.5px solid #FF7A00",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            <Avatar
              size={40}
              src="/images/user.jpg"
              icon={<UserOutlined />}
              alt="Avatar User"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div>
            <Text style={{ fontSize: "12px", color: "#7E7E7E" }}>Xin chào</Text>
            <Text strong style={{ display: "block", fontSize: "14px" }}>
              Lê Quỳnh Ái Vân
            </Text>
          </div>
        </Flex>
      </Flex>

      <div style={{ marginBottom: "16px" }}>
        <Title level={4} style={{ color: "#FF7A00", margin: 0 }}>
          Tổng quan
        </Title>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        {overviewItems.map((item) => (
          <OverviewItem key={item.id} item={item} />
        ))}
      </div>

      <div style={{ marginTop: "16px" }}>
        <OverviewCalendar defaultDate={new Date(2021, 10, 19)} />
      </div>
    </div>
  );
};
