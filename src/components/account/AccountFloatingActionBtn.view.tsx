import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import styles from "../capso/FloatingActionBtn/FloatingActionBtn.module.css";

interface Props {
  onClick?: () => void;  // thêm prop onClick tùy chọn
}

const AccountFloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div 
      className={styles.floatingContainer} 
      onClick={onClick}         // gọi onClick khi bấm vào div này
      style={{ cursor: "pointer" }} // cho con trỏ chuột thành pointer
      role="button"             // thêm vai trò cho a11y
      tabIndex={0}              // để có thể focus bằng bàn phím
      onKeyDown={(e) => {       // hỗ trợ bấm Enter / Space để kích hoạt
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className={styles.iconWrapper}>
        <PlusOutlined className={styles.plusIcon} />
      </div>
      <div className={styles.text}>
        <div>Thêm</div>
        <div>tài khoản</div>
      </div>
    </div>
  );
};

export default AccountFloatingActionButton;
