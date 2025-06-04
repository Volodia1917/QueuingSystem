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
  Flex,
} from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import "./ServiceList.css";

const { Title } = Typography;

interface UpdateServiceProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const inputStyle = {
  borderRadius: "8px",
  border: "1.5px solid #d4cbcb",
  padding: "12px 16px",
  fontSize: "16px",
  height: "48px",
};

const smallInputStyle = {
  width: "80px",
  borderRadius: "6px",
  border: "1.5px solid #d4cbcb",
};

const buttonStyle = {
  fontWeight: 600,
  height: "48px",
  padding: "0 32px",
  borderRadius: "8px",
  fontSize: "16px",
};

const ServiceInfoSection: React.FC = () => (
  <>
    <Title
      level={2}
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

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          label="Mã dịch vụ:"
          name="serviceCode"
          rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
          required
        >
          <Input placeholder="201" style={inputStyle} />
        </Form.Item>

        <Form.Item
          label="Tên dịch vụ:"
          name="serviceName"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
          required
        >
          <Input placeholder="Khám tim mạch" style={inputStyle} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Mô tả:" name="description">
          <Input.TextArea
            placeholder="Mô tả dịch vụ"
            rows={5}
            style={{
              borderRadius: "8px",
              border: "1.5px solid #d4cbcb",
              padding: "12px 16px",
              fontSize: "16px",
              minHeight: "120px",
            }}
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </Form.Item>
      </Col>
    </Row>
  </>
);

interface NumberingRuleItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  children?: React.ReactNode;
}

const NumberingRuleItem: React.FC<NumberingRuleItemProps> = ({
  checked,
  onChange,
  label,
  children,
}) => (
  <Flex
    gap={12}
    align="center"
    style={{
      marginBottom: "16px",
    }}
  >
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{ minWidth: "150px" }}
    >
      {label}
    </Checkbox>
    {children}
  </Flex>
);

interface NumberingRulesProps {
  autoIncrement: boolean;
  setAutoIncrement: (value: boolean) => void;
  prefix: boolean;
  setPrefix: (value: boolean) => void;
  suffix: boolean;
  setSuffix: (value: boolean) => void;
  resetDaily: boolean;
  setResetDaily: (value: boolean) => void;
}

const NumberingRules: React.FC<NumberingRulesProps> = ({
  autoIncrement,
  setAutoIncrement,
  prefix,
  setPrefix,
  suffix,
  setSuffix,
  resetDaily,
  setResetDaily,
}) => (
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

    <NumberingRuleItem
      checked={autoIncrement}
      onChange={setAutoIncrement}
      label="Tăng tự động từ:"
    >
      <Flex align="center" justify="space-between" gap={8}>
        <Input placeholder="0001" style={smallInputStyle} name="autoFrom" />
        <span>đến</span>
        <Input placeholder="9999" style={smallInputStyle} name="autoTo" />
      </Flex>
    </NumberingRuleItem>

    <NumberingRuleItem checked={prefix} onChange={setPrefix} label="Prefix:">
      <Input placeholder="0001" style={smallInputStyle} name="prefixValue" />
    </NumberingRuleItem>

    <NumberingRuleItem checked={suffix} onChange={setSuffix} label="Surfix:">
      <Input placeholder="0001" style={smallInputStyle} name="suffixValue" />
    </NumberingRuleItem>

    <NumberingRuleItem
      checked={resetDaily}
      onChange={setResetDaily}
      label="Reset mỗi ngày"
    />

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
);

interface ActionButtonsProps {
  onCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel }) => (
  <Flex
    justify="center"
    gap={24}
    style={{
      marginTop: "40px",
      paddingTop: "24px",
      borderTop: "1px solid #eaeaea",
    }}
  >
    <Button
      type="default"
      onClick={onCancel}
      style={{
        ...buttonStyle,
        background: "#fff2e7",
        border: "2px solid #ff9138",
        color: "#ff9138",
      }}
    >
      Hủy bỏ
    </Button>
    <Button
      type="primary"
      htmlType="submit"
      style={{
        ...buttonStyle,
        background: "#ff9138",
        border: "2px solid #ff9138",
        color: "white",
      }}
    >
      Cập nhật
    </Button>
  </Flex>
);

export const UpdateService: React.FC<UpdateServiceProps> = ({
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <ServiceInfoSection />

          <NumberingRules
            autoIncrement={autoIncrement}
            setAutoIncrement={setAutoIncrement}
            prefix={prefix}
            setPrefix={setPrefix}
            suffix={suffix}
            setSuffix={setSuffix}
            resetDaily={resetDaily}
            setResetDaily={setResetDaily}
          />

          <ActionButtons onCancel={onCancel} />
        </Form>
      </Card>
    </MainContentLayout>
  );
};
