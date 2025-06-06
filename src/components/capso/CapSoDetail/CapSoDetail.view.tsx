import React from "react";
import { Button } from "antd";
import styles from "./CapSoDetail.module.css";
import type { CapSo} from "../../types/CapSo.type"; // Đảm bảo bạn có type CapSo

interface CapSoDetailProps {
  capSo: CapSo;
  onBack: () => void;
}

const CapSoDetail: React.FC<CapSoDetailProps> = ({ capSo, onBack }) => {
  return (
    <div className={styles.container}>

      {/* Thông tin chi tiết */}
      <div className={styles.detailContainer}>
        <h2 className={styles.subTitle}>Thông tin cấp số</h2>

        <div className={styles.detailContent}>
          {/* Cột thông tin chính */}
          <div className={styles.infoColumn}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Họ tên:</span>
              <span className={styles.value}>{capSo.fullName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Tên dịch vụ:</span>
              <span className={styles.value}>{capSo.service}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Số thứ tự:</span>
              <span className={styles.value}>{capSo.stt}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Thời gian cấp:</span>
              <span className={styles.value}>{capSo.issueTime}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Hạn sử dụng:</span>
              <span className={styles.value}>{capSo.expiryTime}</span>
            </div>
          </div>

          {/* Cột trạng thái */}
          <div className={styles.statusColumn}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nguồn cấp:</span>
              <span className={styles.value}>{capSo.source}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Trạng thái:</span>
              <span className={styles.value}>
                <span
                    className={styles.statusDot}
                    style={{
                        color:
                        capSo.status === "Đang chờ"
                            ? "#4277ff"
                            : capSo.status === "Bỏ qua"
                            ? "#E73F3F"
                            : capSo.status === "Đã sử dụng"
                            ? "#7E7D88"
                            : "#34CD26", // màu mặc định nếu không trùng
                    }}
                    >
                        ●
                        </span> {capSo.status}
                </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Số điện thoại:</span>
              <span className={styles.value}>{capSo.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Địa chỉ Email:</span>
              <span className={styles.value}>{capSo.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nút quay lại */}
      <Button        
        className={styles.backButton}
        onClick={onBack}
        >
        <span className={styles.backIconWrapper}>
            <i className={`${styles.backIcon} bx bx-undo`}></i>
        </span>
        Quay lại
        </Button>
    </div>
  );
};

export default CapSoDetail;
