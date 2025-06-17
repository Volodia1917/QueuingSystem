import React from "react";
import ReactDOM from "react-dom";
import styles from "./CapSoPopup.module.css";
import { GenerateAssignmentResponse } from "../../../libraries/assignmentApi";
import { CloseOutlined } from "@ant-design/icons";

interface CapSoPopupProps {
  capSo: GenerateAssignmentResponse;
  onClose: () => void;
}

const CapSoPopup: React.FC<CapSoPopupProps> = ({ capSo, onClose }) => {  // Utility function để format time theo định dạng 09:30 11/10/2021
  const formatTime = (dateString: string): string => {
    try {
      if (!dateString || dateString.trim() === '') {
        return "N/A";
      }
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return dateString;
      }

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${hours}:${minutes} ${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return dateString || "N/A";
    }
  };

  // 👇 Định nghĩa popupContent TRƯỚC return
  const popupContent = (
    <div className={styles.overlay}>      <div className={styles.popup}>
        <CloseOutlined className={styles.close} onClick={onClose} />
        <h3>Số thứ tự được cấp</h3>
        <h1>{capSo.code}</h1>
        <p>
          DV: {capSo.service?.serviceName || capSo.serviceCode} (<b>tại quầy số 1</b>)
        </p>
        <div className={styles.info}>
          <p>Thời gian cấp: {formatTime(capSo.assignmentDate)}</p>
          <p>Hạn sử dụng: {formatTime(capSo.expireDate)}</p>
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
