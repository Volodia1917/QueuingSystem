// LoginForm.js
import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginFormProps {
  username: string;
  password: string;
  onChangePassword: (password: string) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const navigate = useNavigate();

  const logo_uri = "./images/Logo.png"

  // Variables
  const defaultUsername = props.username;
  const defaultPassword = props.password;

  // console.log(`Đây là username trong Login View: ${defaultUsername}`);
  // console.log(`Đây là password trong Login View: ${defaultPassword}`);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // console.log(`Đây là username trong Login Form: ${username}`);
  // console.log(`Đây là password trong Login Form: ${password}`);
  
  const [error, setError] = useState(false);

  // Xử lý khi username hoặc password không đúng hoặc để trống
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError(true);
      return;
    }
  
    const storedPassword = localStorage.getItem('password') || defaultPassword;
    if (username === defaultUsername && password === storedPassword) {
      localStorage.setItem('isLogined', 'true');
      localStorage.setItem('username', username);
      props.onSubmit();
    } else {
      alert('Sai tài khoản hoặc mật khẩu');
    }
  };

  // Xử lý khi click nút "Quên mật khẩu"
  const handleClickForgotPassword = () => {
    props.onForgotPassword();
  }
  
  return (
    <div className={styles.container}>
      {/* Layout bên trái */}
      <section className={styles.left}>
        <div className={styles.wrapper}>
          {/* Logo */}
          <div>
            <img src={logo_uri} alt="Alta Software Logo" />
          </div>

          {/* Form Đăng Nhập */}
          <form action="" className={styles.login_form} onSubmit={handleSubmit}>
            {/* Tên Đăng Nhập */}
            <div className={styles.login_form_item}>
              <label htmlFor="username">Tên đăng nhập *</label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tài khoản... Default: dino123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={error ? `${styles.input_error}` : ""}
              />
            </div>

            {/* Mật Khẩu */}
            <div className={styles.login_form_item}>
              <label htmlFor="password">Mật khẩu *</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu... Default: 123456789"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? `${styles.input_error}` : ""}
              />
            </div>

            {error && (
              <div className={styles.error_message}>
                <div className={styles["error_message-icon"]}>
                  <img src="./images/warning.png" alt="" />
                </div>
                <div className={styles["error_message-text"]}>
                  Sai mật khẩu hoặc tên đăng nhập
                </div>
              </div>
            )}

            {/* Quên Mật Khẩu */}
            <div className={styles.login_form_item_forgot_password}>
              <div className={styles["forgot_password-link"]} onClick={handleClickForgotPassword}>
                Quên mật khẩu?
              </div>
            </div>

            <div className={styles.login_form_item}>
              <div className={styles.submit_button}>
                <button type="submit">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Layout bên phải */}
      <section className={styles.right}>
        <div className={styles.welcome}>
          <img src="./images/welcome.png" alt="" />
        </div>
        <div className={styles.welcome_text}>
          <p>Hệ thống</p>
          <p style={{fontWeight:800}}>QUẢN LÝ XẾP HÀNG</p>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
