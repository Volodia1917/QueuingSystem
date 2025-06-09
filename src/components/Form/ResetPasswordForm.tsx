import React, { useState } from "react";
import styles from "./Form.module.css";
import { Alert, Button, Flex, Form, FormProps, Input, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

type FieldType = {
	newPassword?: string;
	confirmPassword?: string;
};

const ResetPasswordForm: React.FC = () => {
	const [formError, setFormError] = useState<string | null>(null);

	const [form] = Form.useForm();

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Dữ liệu nhận được: ", values);
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
		console.log("Lỗi hiển thị: ", errorInfo);
		setFormError("Vui lòng điền thông tin")
	};

	return (
		<Form
			form={form}
			name="resetPassword"
			layout="vertical"
			className={styles.form_wrapper}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Title className={styles.form_title} level={1}>
				Đặt lại mật khẩu mới
			</Title>

			<Form.Item<FieldType>
				label="Mật khẩu mới"
				name="newPassword"
				required={false}
				rules={[{ required: true, message: "" }]}
			>
				<Input.Password className={styles.form_input} />
			</Form.Item>

			<Form.Item<FieldType>
				label="Nhập lại mật khẩu mới"
				name="confirmPassword"
				required={false}
				rules={[{ required: true, message: "" }]}
			>
				<Input.Password className={styles.form_input} />
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
						type="primary"
						htmlType="submit"
						className={styles.form_btn}
						block
					>
						Xác nhận
					</Button>
				</Flex>
			</Form.Item>
		</Form>
	);
};

export default ResetPasswordForm;
