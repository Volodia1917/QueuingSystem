import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Alert, Flex } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./Form.module.css";
import { getLogin } from "../../libraries/getLogin";
import { API_URL, getToken } from "../../libraries/useApi";

type FieldType = {
	username: string;
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
		const username = values.username;
		const password = values.password;

		// // Test thủ công
		// if (username == "dino" && password == "123") {
		// 	localStorage.setItem("isLogined", "true");
		// 	const checked = localStorage.getItem("isLogined");
		// 	console.log("Check Logined: ", checked);
		// 	window.location.reload();
		// } else {
		// 	setFormError("Sai mật khẩu hoặc tên đăng nhập");
		// }

		let dataLogin: any = await getLogin(
			`${API_URL}/Authentication/login`,
			username,
			password
		);

		if (!dataLogin?.message && dataLogin.user && dataLogin.token) {
			localStorage.setItem("isLogined", "true");
			localStorage.setItem("username", username);
			localStorage.setItem("userFullName", dataLogin.user.fullName || "");
			localStorage.setItem("avatar", dataLogin.user.avatarUrl || "");
			localStorage.setItem("token", dataLogin.token.accessToken || "");
			localStorage.setItem("tokenRefresh", dataLogin.token.refreshToken || "");
			window.location.reload();
		} else {
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
			// initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item<FieldType>
				label="Tên đăng nhập *"
				name="username"
				className={styles.form_item}
				required={false}
				rules={[{ required: true, message: "" }]}
			>
				<Input className={styles.form_input} />
			</Form.Item>

			<Form.Item<FieldType>
				label="Mật khẩu *"
				name="password"
				className={styles.form_item}
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
