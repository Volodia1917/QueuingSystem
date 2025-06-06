import React from "react";
import ReactDOM from "react-dom";
import styles from "./CapSoPopup.module.css";
import { CapSo } from "../../types/CapSo.type";
import { CloseOutlined } from "@ant-design/icons";

interface CapSoPopupProps {
  capSo: CapSo;
  onClose: () => void;
}

const CapSoPopup: React.FC<CapSoPopupProps> = ({ capSo, onClose }) => {
  // 👇 Định nghĩa popupContent TRƯỚC return
  const popupContent = (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <CloseOutlined className={styles.close} onClick={onClose} />
        <h3>Số thứ tự được cấp</h3>
        <h1>{capSo.stt}</h1>
        <p>
          DV: {capSo.service} (<b>tại quầy số 1</b>)
        </p>
        <div className={styles.info}>
          <p>Thời gian cấp: {capSo.timeIssued}</p>
          <p>Hạn sử dụng: {capSo.expiry}</p>
        </div>
      </div>
    </div>
  );

  // 👇 Trả về bằng Portal render vào document.body
  return typeof window !== "undefined"
    ? ReactDOM.createPortal(popupContent, document.body)
    : null;
};

export default CapSoPopup;
