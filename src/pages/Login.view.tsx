import React, { useEffect, useState } from "react";
import LoginForm from "../components/loginForm/LoginForm";
import ForgotPassword from "../components/forgotPasswordForm/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";



const Login : React.FC = () => {

    const navigate = useNavigate();

    // Tài khoản mặc định để đăng nhập
    const defaultUsername = 'dino123';
    const defaultPassword = '12345';

    // Trạng thái hiển thị khi click nút "Quên mật khẩu"
    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);


    // Xử lý khi click nút "Quên mật khẩu"
    const onShowForgotPassword = () => {
        setShowForgotPassword(true);
    }

    // Xử lý khi USER đăng nhập thành công
    const onLogin = () => {
        localStorage.setItem("isLogined", "true");
        localStorage.setItem("username", defaultUsername); // Lưu username
        navigate("/dashboard");
      };

    // Điều hướng tới trang "Forgot-Password"
    useEffect(() => {
        if (showForgotPassword) {
            navigate("/reset-password");
        }
    }, [showForgotPassword, navigate]);

    return (

        <LoginForm
            username={defaultUsername}
            password={defaultPassword}
            onChangePassword={() => {}}
            onSubmit={onLogin}
            onForgotPassword={onShowForgotPassword}
        />

    )
}

export default Login;