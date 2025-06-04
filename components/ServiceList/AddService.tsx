import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
} from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import "./ServiceList.css";

const { Title } = Typography;

interface AddServiceProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const AddService: React.FC<AddServiceProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [autoIncrement, setAutoIncrement] = useState(false);
  const [prefix, setPrefix] = useState(false);
  const [suffix, setSuffix] = useState(false);
  const [resetDaily, setResetDaily] = useState(false);

  const handleSubmit = (values: any) => {
    const formData = {
      ...values,
      autoIncrement,
      prefix: prefix ? values.prefixValue : null,
      suffix: suffix ? values.suffixValue : null,
      resetDaily,
    };
    onSubmit(formData);
  };

  return (
    <MainContentLayout title="Quản lý dịch vụ">
      <Card
        size="small"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          border: "none",
          marginBottom: "24px",
        }}
      >
        <Title
          level={4}
          style={{
            color: "#ff7506",
            marginBottom: "24px",
            fontWeight: 600,
            fontSize: "20px",
            borderBottom: "1px solid #eaeaea",
            paddingBottom: "16px",
          }}
        >
          Thông tin dịch vụ
        </Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Mã dịch vụ:"
                name="serviceCode"
                rules={[
                  { required: true, message: "Vui lòng nhập mã dịch vụ" },
                ]}
                required
              >
                <Input
                  placeholder="201"
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #d4cbcb",
                    padding: "12px 16px",
                    fontSize: "16px",
                    height: "48px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mô tả:" name="description">
                <Input.TextArea
                  placeholder="Mô tả dịch vụ"
                  rows={4}
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #d4cbcb",
                    padding: "12px 16px",
                    fontSize: "16px",
                    resize: "none",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Tên dịch vụ:"
                name="serviceName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên dịch vụ" },
                ]}
                required
              >
                <Input
                  placeholder="Khám tim mạch"
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #d4cbcb",
                    padding: "12px 16px",
                    fontSize: "16px",
                    height: "48px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #eaeaea",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#ff7506",
                marginBottom: "20px",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              Quy tắc cấp số
            </Title>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                gap: "12px",
              }}
            >
              <Checkbox
                checked={autoIncrement}
                onChange={(e) => setAutoIncrement(e.target.checked)}
              >
                Tăng tự động từ:
              </Checkbox>
              {autoIncrement && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Input
                    placeholder="0001"
                    style={{
                      width: "80px",
                      borderRadius: "6px",
                      border: "1.5px solid #d4cbcb",
                    }}
                    name="autoFrom"
                  />
                  <span
                    style={{
                      color: "#282828",
                      fontWeight: 500,
                    }}
                  >
                    đến
                  </span>
                  <Input
                    placeholder="9999"
                    style={{
                      width: "80px",
                      borderRadius: "6px",
                      border: "1.5px solid #d4cbcb",
                    }}
                    name="autoTo"
                  />
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                gap: "12px",
              }}
            >
              <Checkbox
                checked={prefix}
                onChange={(e) => setPrefix(e.target.checked)}
              >
                Prefix:
              </Checkbox>
              {prefix && (
                <Input
                  placeholder="0001"
                  style={{
                    width: "80px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4cbcb",
                  }}
                  name="prefixValue"
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                gap: "12px",
              }}
            >
              <Checkbox
                checked={suffix}
                onChange={(e) => setSuffix(e.target.checked)}
              >
                Surfix:
              </Checkbox>
              {suffix && (
                <Input
                  placeholder="0001"
                  style={{
                    width: "80px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4cbcb",
                  }}
                  name="suffixValue"
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                gap: "12px",
              }}
            >
              <Checkbox
                checked={resetDaily}
                onChange={(e) => setResetDaily(e.target.checked)}
              >
                Reset mỗi ngày
              </Checkbox>
            </div>

            <div
              style={{
                color: "#7e7d88",
                fontStyle: "italic",
                marginTop: "16px",
                fontSize: "14px",
              }}
            >
              * Là trường thông tin bắt buộc
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid #eaeaea",
            }}
          >
            <Button
              type="default"
              onClick={onCancel}
              style={{
                background: "#fff2e7",
                border: "2px solid #ff9138",
                color: "#ff9138",
                fontWeight: 600,
                height: "48px",
                padding: "0 32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: "#ff9138",
                border: "2px solid #ff9138",
                color: "white",
                fontWeight: 600,
                height: "48px",
                padding: "0 32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              Thêm dịch vụ
            </Button>
          </div>
        </Form>
      </Card>
    </MainContentLayout>
  );
};
