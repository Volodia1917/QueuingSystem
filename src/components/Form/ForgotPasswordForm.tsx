import React, { useState } from "react";
import styles from "./Form.module.css"
import { Alert, Button, Flex, Form, FormProps, Input, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

type FieldType = {
  email?: string;
};

interface ForgotPasswordFormProps {
  onCancel: () => void;
  onContinue: () => void;
  onCheckEmail?: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  const [formError, setFormError] = useState<string | null>(null);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    props.onContinue();
    console.log("Dữ liệu nhận được: ", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Lỗi hiển thị: ", errorInfo);
    setFormError("Email không đúng định dạng");
  };

  const handleClickCancel = () => {
    props.onCancel();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="forgotPassword"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Flex justify="center" vertical>
        <Title className={styles.form_title} level={1}>
          Đặt lại mật khẩu
        </Title>

        <Form.Item<FieldType>
          label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
          name="email"
          required={false}
          rules={[{ required: true, message: "" }, { type: "email" }]}
        >
          <Input className={styles.form_input} />
        </Form.Item>

        {formError && (
          <Form.Item>
            <Alert
              className={styles.form_warning}
              message={formError}
              type="warning"
              banner={false}
              showIcon
              icon={<ExclamationCircleOutlined style={{ color: "#E73F3F" }} />}
            />
          </Form.Item>
        )}

        <Form.Item<FieldType>>
          <Flex justify="space-around" style={{ marginTop: "40px" }}>
            <Button
              type="default"
              htmlType="button"
              className={styles.form_btn}
              block
              onClick={handleClickCancel}
            >
              Huỷ
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.form_btn}
              block
            >
              Tiếp tục
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>

    // <form onSubmit={handleSubmit} className={styles.form_wrapper}>
    //   {/* Title */}
    //   <div className={styles.form_item}>
    //     <h1 className={styles.form_title}>Đặt lại mật khẩu</h1>
    //   </div>

    //   {/* Email */}
    //   <div className={styles.form_item}>
    //     <div className={styles.form_group}>
    //       <label htmlFor="email">
    //         Vui lòng nhập email để đặt lại mật khẩu của bạn *
    //       </label>
    //       <input
    //         id="email"
    //         type="email"
    //         placeholder="Nhập email ... Default: dino123@gmail.com"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //   </div>

    //   <div className={styles.form_item}>
    //     <div className={styles.form_button}>
    //       <button
    //         type="button"
    //         className={styles["form_button--cancel"]}
    //         onClick={handleClickCancel}
    //       >
    //         Hủy
    //       </button>
    //     </div>
    //     <div className={styles.form_button}>
    //       <button type="submit" className={styles["form_button--submit"]}>
    //         Tiếp tục
    //       </button>
    //     </div>
    //   </div>
    // </form>
  );
};

export default ForgotPasswordForm;
