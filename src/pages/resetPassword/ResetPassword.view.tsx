import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.css";
import ForgotPasswordForm from "../../components/forgotPasswordForm/ForgotPasswordForm";
import ResetPasswordForm from "../../components/resetPasswordForm/ResetPasswordForm";

interface ResetPasswordProps {
  onChangePasswordSuccess: (password: string) => void;
}

const ResetPassword: React.FC = () => {
  const defaultEmail = "dino123@gmail.com";
  const [email, setEmail] = useState<string>("");

  const [checkEmail, setCheckEmail] = useState<boolean>(false);


  const handleGetEmail = (email: string) => {

    setEmail(email);

    if(email && email === defaultEmail){
      setCheckEmail(true);

    }else{
      setCheckEmail(false);
      alert("Không đúng email");
    }
  };

  return (
    <div className={styles.container}>
      {/* Layout bên trái */}
      <section className={styles.left}>
        <div className={styles.wrapper}>
          {/* Logo */}
          <div>
            <img src="./images/Logo.png" alt="Alta Software Logo" />
          </div>

          {/* Form Reset Password */}
          <div className={styles.form_container}>
            {checkEmail
              ? <ResetPasswordForm/> 
              : <ForgotPasswordForm onCheckEmail={handleGetEmail} />
            }
          </div>
        </div>
      </section>

      {/* Layout bên phải */}
      <section className={styles.right}>
        <div className={styles.welcome}>
          <img src="./images/Frame.png" alt="" />
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;