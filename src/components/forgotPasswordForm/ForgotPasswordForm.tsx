import React, { useState } from "react";
import styles from "./ForgotPasswordForm.module.css";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormProps {
  onCheckEmail: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onCheckEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleClickCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onCheckEmail(email); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_wrapper}>
      {/* Title */}
      <div className={styles.form_item}>
        <h1 className={styles.form_title}>Đặt lại mật khẩu</h1>
      </div>

      {/* Email */}
      <div className={styles.form_item}>
        <div className={styles.form_group}>
          <label htmlFor="email">
            Vui lòng nhập email để đặt lại mật khẩu của bạn *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email ... Default: dino123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.form_item}>
        <div className={styles.form_button}>
          <button
            type="button"
            className={styles["form_button--cancel"]}
            onClick={handleClickCancel}
          >
            Hủy
          </button>
        </div>
        <div className={styles.form_button}>
          <button type="submit" className={styles["form_button--submit"]}>
            Tiếp tục
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;