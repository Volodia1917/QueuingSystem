import { ConfigProvider } from "antd";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import FormTheme from "./FormTheme";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface FormProps {
	pageMode: (mode: string) => void;
}

type FormMode = "login" | "forgotPassword" | "resetPassword";

const Form: React.FC<FormProps> = ({ pageMode }) => {
	const [mode, setMode] = useState<FormMode>("login");

	const handleShowLogin = () => {
		setMode("login");
		pageMode("login");
	};

	const handleShowForgotPassword = () => {
		setMode("forgotPassword");
		pageMode("forgotPassword");
	};

	const handleShowResetPassword = () => {
		setMode("resetPassword");
		pageMode("resetPassword");
	};


	return (
		<ConfigProvider {...FormTheme}>
			{mode === "login" ? (
				<LoginForm 
					onShowForgotPassword={handleShowForgotPassword} 
				/>
			) : mode === "forgotPassword" ? (
				<ForgotPasswordForm
					onCancel={handleShowLogin}
					onContinue={handleShowResetPassword}
				/>
			) : (
				<ResetPasswordForm />
			)}
		</ConfigProvider>
	);
};

export default Form;
