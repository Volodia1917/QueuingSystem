import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./FloatingActionBtn.module.css";

interface Props {
  onClick?: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className={styles.floatingContainer}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <div className={styles.iconWrapper}>
        <PlusOutlined className={styles.plusIcon} />
      </div>
      <div className={styles.text}>
        <div>Cấp</div>
        <div>số mới</div>
      </div>
    </div>
  );
};

export default FloatingActionButton;
