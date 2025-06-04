import React from "react";
import { Typography, Row, Col, Card, Tag } from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import { Icons } from "../Icons/Icons";
import "./DeviceList.css";

const { Title, Text } = Typography;

interface DeviceDetailProps {
  deviceData?: any;
  onEdit: () => void;
  onBack: () => void;
}

export const DeviceDetail: React.FC<DeviceDetailProps> = ({
  deviceData,
  onEdit,
  onBack,
}) => {
  const services = [
    "Khám tim mạch",
    "Khám sản - Phụ khoa", 
    "Khám răng hàm mặt",
    "Khám tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát"
  ];

  const deviceInfo = {
    deviceCode: "KIO_01",
    deviceType: "Kiosk",
    deviceName: "Kiosk",
    username: "Linhkyo011",
    ipAddress: "128.172.308",
    password: "CMS",
    services: services.join(", "),
    ...deviceData,
  };

  return (
    <MainContentLayout 
      title="Quản lý thiết bị"
      floatButtonItems={[
        {
          icon: <Icons.Edit />,
          label: "Cập nhật thiết bị",
          onClick: onEdit,
        },
        {
          icon: <Icons.Back />,
          label: "Trở lại",
          onClick: onBack,
        },
      ]}
    >
      <Card
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          padding: "24px",
        }}
      >
        <Title
          level={4}
          style={{
            color: "#ff7506",
            marginBottom: "24px",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          Thông tin thiết bị
        </Title>

        <Row gutter={[48, 24]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Mã thiết bị:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.deviceCode}
                </Text>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Tên thiết bị:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.deviceName}
                </Text>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Địa chỉ IP:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.ipAddress}
                </Text>
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Loại thiết bị:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.deviceType}
                </Text>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Tên đăng nhập:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.username}
                </Text>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Mật khẩu:
              </Text>
              <div style={{ marginTop: "8px" }}>
                <Text style={{ fontSize: "16px", color: "#535261" }}>
                  {deviceInfo.password}
                </Text>
              </div>
            </div>
          </Col>

          <Col xs={24}>
            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ fontSize: "16px", color: "#282739" }}>
                Dịch vụ sử dụng:
              </Text>
              <div style={{ marginTop: "12px" }}>
                <Text style={{ fontSize: "16px", color: "#535261", lineHeight: "24px" }}>
                  {deviceInfo.services}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </MainContentLayout>
  );
}; 