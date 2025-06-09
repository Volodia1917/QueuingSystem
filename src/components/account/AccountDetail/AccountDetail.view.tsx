import React from "react";
import { Button, Form, Input, Select } from "antd";
import styles from "./AccountDetail.module.css";
import type { Account } from "../../types/Account.type";

const { Option } = Select;

interface AccountDetailProps {
  account: Account;
  onCancel: () => void;
  onUpdate: (values: Account) => void;
  onRoleChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
}

const AccountDetail: React.FC<AccountDetailProps> = ({
  account,
  onCancel,
  onUpdate,
  onRoleChange,
  onStatusChange,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onUpdate(values);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Thông tin tài khoản</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={account}
        className={styles.form}
      >
        {/* 2 cột thông tin */}
        <div className={styles.row}>
          <div className={styles.column}>
            <Form.Item
              label="Họ tên:"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại:"
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Email:"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Vai trò:"
              name="role"
              rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            >
              <Select placeholder="Chọn vai trò">
                <Option value="Kế toán">Kế toán</Option>
                <Option value="Quản lý">Quản lý</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>
          </div>

          <div className={styles.column}>
            <Form.Item
              label="Tên đăng nhập:"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu:"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu:"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item
              label="Tình trạng:"
              name="status"
              rules={[{ required: true, message: "Vui lòng chọn tình trạng" }]}
            >
              <Select placeholder="Chọn tình trạng">
                <Option value="Hoạt động">Hoạt động</Option>
                <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className={styles.requiredNote}>* Là trường thông tin bắt buộc</div>

        {/* Nút hành động */}
        <div className={styles.actions}>
          <Button className={styles.canel} onClick={onCancel}>Hủy bỏ</Button>
          <Button className={styles.update} type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </div>
      </Form>
    </div>
  );
};


export default AccountDetail;
