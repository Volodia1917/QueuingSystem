import React, { useEffect } from "react";
import styles from "./AccountForm.module.css";
import { Form, Input, FormProps, Button, Layout, Flex, Row, Col, Select, ConfigProvider } from "antd";
import { updateUser } from "../../libraries/updateUser";
import { addUser } from "../../libraries/addUser";
import PageTitle from "../PageTitle/PageTitle";
import FormTheme from "../Form/FormTheme";
import { Account } from "../types/Account.type";
import { UserAccount } from "../types/UserAccount.type";

const { Option } = Select;

type FieldType = Partial<UserAccount> & { confirmPassword: string };



interface AccountFormProps {
	user: Account | null; // nếu null thì là "tạo mới"
	onCancel: () => void;
}

const AccountForm: React.FC<AccountFormProps> = (props) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (props.user) {
			form.setFieldsValue({
				email: props.user.email,
				fullName: props.user.fullName,
				telephone: props.user.telephone,
				userRole: props.user.userRole,
				// userStatus: props.user.userStatus,
				password: props.user.password, // nếu bạn muốn hiển thị, KHÔNG KHUYẾN KHÍCH
				confirmPassword: props.user.password,
			});
		} else {
			form.resetFields(); // Khi tạo mới, reset form
		}
	}, [props.user, form]);

	const onFinish: FormProps<UserAccount>["onFinish"] = async (values) => {
		const { ConfirmPassword, ...userValues } = values;
		try {
			if (props.user) {
				await updateUser(props.user.email, userValues);
			} else {
				await addUser(userValues);
			}
			props.onCancel(); // quay lại bảng
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<ConfigProvider {...FormTheme}>
			<Layout className={styles.form_container}>
				<Flex vertical gap={16}>
					{/* Page Title */}
					<Row className={styles.title}>
						<PageTitle title="Quản lý tài khoản" />
					</Row>

					{/* Form */}
					<Row className={styles.form_wrapper}>
						<Form
							className={styles.form}
							form={form}
							layout="vertical"
							onFinish={onFinish}
						>
							<Flex vertical gap={16} className={styles.form_content}>
								{/* Form Title */}
								<Row className={styles.form_title}>
									<PageTitle
										style={{ fontSize: 20 }}
										title="Thông tin tài khoản"
									/>
								</Row>
								{/* Form Fields */}
								<Row gutter={24}>
									<Col span={12}>
										<Form.Item
											className={styles.form_item}
											label="Email"
											name="email"
											required={props.user ? false : true}
											rules={
												props.user
													? [] // đang update → disable, không cần validate
													: [{ required: true, message: "" }]
											}
										>
											<Input
												className={styles.form_input}
												disabled={!!props.user}
												required={true}
											/>
										</Form.Item>
										<Form.Item
											className={styles.form_item}
											label="Họ tên"
											name="fullName"
											required={props.user ? false : true}
											rules={
												props.user
													? [] // đang update → disable, không cần validate
													: [{ required: true, message: "" }]
											}
										>
											<Input className={styles.form_input} />
										</Form.Item>
										<Form.Item
											className={styles.form_item}
											label="Số điện thoại"
											name="telephone"
											required={props.user ? false : true}
											rules={
												props.user
													? [] // đang update → disable, không cần validate
													: [{ required: true, message: "" }]
											}
										>
											<Input className={styles.form_input} />
										</Form.Item>
										<Form.Item
											className={styles.form_item}
											label="Vai trò"
											name="userRole"
											required={props.user ? false : true}
											rules={
												props.user
													? [] // đang update → disable, không cần validate
													: [{ required: true, message: "" }]
											}
										>
											<Select placeholder="Chọn vai trò">
												<Option value="Staff">Nhân viên</Option>
												<Option value="Doctor">Bác sĩ</Option>
												<Option value="Admin">Admin</Option>
											</Select>
										</Form.Item>
									</Col>

									<Col span={12}>
										<Form.Item
											className={styles.form_item}
											label="Mật khẩu"
											name="password"
											required={props.user ? false : true}
										>
											<Input.Password
												className={styles.form_input}
												disabled={!!props.user}
												placeholder={props.user ? "●●●●●●●●●●" : ""}
											/>
										</Form.Item>
										<Form.Item
											className={styles.form_item}
											label="Nhập lại mật khẩu"
											name="confirmPassword"
											required={props.user ? false : true}
											dependencies={["password"]}
											rules={
												props.user
													? [{ required: false }]
													: [
														{
															required: true,
															message: "Vui lòng nhập lại mật khẩu!",
														},
														({ getFieldValue }) => ({
															validator(_, value) {
																if (
																	!value ||
																	getFieldValue("password") === value
																) {
																	return Promise.resolve();
																}
																return Promise.reject(
																	new Error("Mật khẩu không khớp!")
																);
															},
														}),
													]
											}
										>
											<Input.Password
												className={styles.form_input}
												disabled={!!props.user}
												placeholder={props.user ? "●●●●●●●●●●" : ""}
											/>
										</Form.Item>

										<Form.Item
											className={styles.form_item}
											label="Trạng thái"
											name="userStatus"
											required={props.user ? false : true}
											rules={[
												{
													required: true,
													message: "",
												},
											]}
										>
											<Select placeholder="Chọn trạng thái">
												<Option value="Hoạt động">Hoạt động</Option>
												<Option value="Ngừng hoạt động">Ngừng hoạt động</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Form.Item label="Là các trường bắt buộc" required={true} />
								</Row>
							</Flex>

							{/* Form Button */}
							<Row className={styles.form_btn_wrapper} align={"middle"} justify={"center"}>
								<Button
									className={styles.form_btn}
									onClick={props.onCancel}
								>
									Hủy
								</Button>

								<Button
									className={styles.form_btn}
									type="primary"
									htmlType="submit"
								>
									{props.user ? "Cập nhật" : "Tạo mới"}
								</Button>
							</Row>
						</Form>
					</Row>
				</Flex>
			</Layout>
		</ConfigProvider>
	);
}

export default AccountForm;