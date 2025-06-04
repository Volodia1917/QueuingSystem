import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Typography, Row, Col, Card, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { MainContentLayout } from "../Layout/MainContentLayout";
import "./DeviceList.css";

const { Title } = Typography;
const { Option } = Select;

interface EditDeviceFormProps {
  deviceData?: any;
  onCancel: () => void;
  onSubmit: (deviceData: any) => void;
}

export const EditDeviceForm: React.FC<EditDeviceFormProps> = ({
  deviceData,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const deviceTypes = [
    { value: "kiosk", label: "Kiosk" },
    { value: "display", label: "Display System" },
    { value: "counter", label: "Counter System" },
  ];

  const services = [
    { value: "kham_tim_mach", label: "Khám tim mạch" },
    { value: "kham_san_phu_khoa", label: "Khám sản - Phụ khoa" },
    { value: "kham_rang_ham_mat", label: "Khám răng hàm mặt" },
    { value: "kham_tai_mui_hong", label: "Khám tai mũi họng" },
    { value: "kham_ho_hap", label: "Khám hô hấp" },
    { value: "kham_tong_quat", label: "Khám tổng quát" },
  ];

  useEffect(() => {
    if (deviceData) {
      form.setFieldsValue({
        deviceCode: deviceData.deviceCode || "KIO_01",
        deviceType: deviceData.deviceType || "kiosk",
        deviceName: deviceData.deviceName || "Kiosk",
        username: deviceData.username || "Linhkyo011",
        ipAddress: deviceData.ipAddress || "128.172.308",
        password: deviceData.password || "CMS",
      });
      
      // Set initial selected services
      setSelectedServices([
        "kham_tim_mach",
        "kham_san_phu_khoa", 
        "kham_rang_ham_mat",
        "kham_tai_mui_hong",
        "kham_ho_hap",
        "kham_tong_quat"
      ]);
    }
  }, [deviceData, form]);

  const handleSubmit = (values: any) => {
    onSubmit({
      ...values,
      services: selectedServices,
    });
  };

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(selectedServices.filter(service => service !== serviceToRemove));
  };

  const getServiceLabel = (value: string) => {
    const service = services.find(s => s.value === value);
    return service ? service.label : value;
  };

  return (
    <MainContentLayout title="Quản lý thiết bị">
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

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Mã thiết bị"
                name="deviceCode"
                rules={[
                  { required: true, message: "Vui lòng nhập mã thiết bị" },
                ]}
              >
                <Input
                  placeholder="Nhập mã thiết bị"
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Loại thiết bị"
                name="deviceType"
                rules={[
                  { required: true, message: "Vui lòng chọn loại thiết bị" },
                ]}
              >
                <Select
                  placeholder="Chọn loại thiết bị"
                  size="large"
                  style={{ borderRadius: "8px" }}
                >
                  {deviceTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Tên thiết bị"
                name="deviceName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thiết bị" },
                ]}
              >
                <Input
                  placeholder="Nhập tên thiết bị"
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input
                  placeholder="Nhập tài khoản"
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Địa chỉ IP"
                name="ipAddress"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ IP" },
                ]}
              >
                <Input
                  placeholder="Nhập địa chỉ IP"
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  size="large"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Dịch vụ sử dụng"
                rules={[
                  { required: true, message: "Vui lòng chọn dịch vụ sử dụng" },
                ]}
              >
                <div style={{ 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "8px", 
                  padding: "12px",
                  minHeight: "48px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  alignItems: "flex-start"
                }}>
                  {selectedServices.map((service) => (
                    <Tag
                      key={service}
                      closable
                      closeIcon={<CloseOutlined />}
                      onClose={() => removeService(service)}
                      style={{
                        background: "#fff2e8",
                        border: "1px solid #ff7506",
                        color: "#ff7506",
                        borderRadius: "16px",
                        padding: "4px 12px",
                        fontSize: "14px",
                        lineHeight: "20px",
                        margin: 0,
                      }}
                    >
                      {getServiceLabel(service)}
                    </Tag>
                  ))}
                </div>
              </Form.Item>
            </Col>
          </Row>

          <div style={{ color: "#ff7506", fontSize: "14px", marginBottom: "24px" }}>
            * Là trường thông tin bắt buộc
          </div>

          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Button
                size="large"
                onClick={onCancel}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ff7506",
                  color: "#ff7506",
                  background: "white",
                  minWidth: "120px",
                  height: "48px",
                }}
              >
                Hủy bỏ
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  borderRadius: "8px",
                  background: "#ff7506",
                  border: "none",
                  minWidth: "120px",
                  height: "48px",
                }}
              >
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </MainContentLayout>
  );
}; 