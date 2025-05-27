import React, { useState } from "react";
import styles from "./ResetPasswordForm.module.css";
import { useNavigate } from "react-router-dom";


const ResetPasswordForm : React.FC = () => {

  const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleCheckPassword = (e: React.FormEvent) => {
      e.preventDefault(); 
    
      if (confirmPassword === newPassword) {
        
        // Lưu mật khẩu mới vào localStorage
        localStorage.setItem("password", newPassword);
    
        alert("Đặt lại mật khẩu thành công!");
        // Điều hướng về login
        navigate("/");
      } else {
        alert("Mật khẩu xác nhận không khớp!");
      }
    }
    

    return (
        <form className={styles.form_wrapper} onSubmit={handleCheckPassword}>
          {/* Title */}
          <div className={styles.form_item}>
            <h1 className={styles.form_title}>Đặt lại mật khẩu mới</h1>
          </div>

          {/* Mật khẩu mới */}
          <div className={styles.form_item}>
            <div className={styles.form_group}>
              <label htmlFor="password">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu mới ..."
                value={newPassword}
                onChange={(password) => setNewPassword(password.target.value)}
              />
            </div>
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div className={styles.form_item}>
            <div className={styles.form_group}>
              <label htmlFor="password">
                Nhập lại mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nhập lại mật khẩu mới..."
                value={confirmPassword}
                onChange={(password) => setConfirmPassword(password.target.value)}
              />
            </div>
          </div>

          <div className={styles.form_item}>
            <div className={styles.form_button}>
              <button type="submit" className={styles["form_button--submit"]}>
                Xác nhận
              </button>
            </div>
          </div>

        </form>
    )
}

export default ResetPasswordForm;