import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Alert, Flex } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./Form.module.css";
import { getLogin } from "../../libraries/login";
import { API_URL, getToken } from "../../libraries/useApi";

type FieldType = {
  email: string;
  password: string;
};

interface LoginFormProps {
	onShowForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const [formError, setFormError] = useState<string | null>(null);

	const [form] = Form.useForm();

	// Xử lý khi submit form đăng nhập
	const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
		const email = values.email;
		const password = values.password;

		const dataLogin: any = await getLogin(
			`${API_URL}/Authentication/login`,
			email,
			password
		);

		if (!dataLogin?.message && dataLogin.user && dataLogin.token) {
			// Đăng nhập thành công
			localStorage.setItem("isLogined", "true");
			localStorage.setItem("email", email);
			// localStorage.setItem("email", dataLogin.user.email || "");
			localStorage.setItem("userFullName", dataLogin.user.fullName || "");
			localStorage.setItem("avatar", dataLogin.user.avatarUrl || "");
			localStorage.setItem("role", dataLogin.user.role || "");
			localStorage.setItem("token", dataLogin.token.accessToken || "");
			localStorage.setItem("tokenRefresh", dataLogin.token.refreshToken || "");
			window.location.reload();
		} else {
			// Hiển thị lỗi trên form fields
			form.setFields([
				{
					name: "username",
					errors: [""],
				},
				{
					name: "password",
					errors: [""], // Nếu bạn cũng muốn password báo đỏ, thêm lỗi vào đây
					
				},
			]);

			// (Tùy chọn) Vẫn có thể set formError nếu bạn vẫn dùng <Alert />
			setFormError("Sai tài khoản hoặc mật khẩu");
		}
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo
	) => {
		console.log("Failed:", errorInfo);
		setFormError("Sai mật khẩu hoặc tên đăng nhập");
	};

	const handleClickForgotPassword = () => {
		props.onShowForgotPassword();
	};

	return (
		<Form
			form={form}
			name="login"
			layout="vertical"
			className={styles.form_wrapper}
			requiredMark={false}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="on"
		>
			<Form.Item<FieldType>
				label="Tên đăng nhập *"
				name="email"
				className={styles.form_item}
				required={true}
				rules={[
					{ required: true, message: "" },
					{ type: "email", message: "" }
				]}
			>
				<Input className={styles.form_input} />
			</Form.Item>

			<Form.Item<FieldType>
				label="Mật khẩu *"
				name="password"
				required={true}
				className={styles.form_item}
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

			{/* Item - Quên Mật Khẩu */}
			<Form.Item label={null} className={styles.form_item}>
				<Button
					type="link"
					className={styles.form_link}
					onClick={handleClickForgotPassword}
				>
					Quên mật khẩu?
				</Button>
			</Form.Item>

			{/* Item - Nút Đăng nhập */}
			<Form.Item className={styles.form_item}>
				<Flex justify="center">
					<Button
						type="primary"
						htmlType="submit"
						className={styles.form_btn}
						block
					>
						Đăng nhập
					</Button>
				</Flex>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
