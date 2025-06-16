import React from "react";
import { Button } from "antd";
import styles from "./CapSoDetail.module.css";
import type { AdminFilterAssignment } from "../../../libraries/assignmentApi";
import { formatDateTime, getStatusText, getStatusColor } from "../utils/capso.utils";

interface CapSoDetailProps {
  capSo: AdminFilterAssignment;
  onBack: () => void;
}

const CapSoDetail: React.FC<CapSoDetailProps> = ({ capSo, onBack }) => {
  const statusText = getStatusText(capSo.status);
  const statusColor = getStatusColor(capSo.status);
  return (
    <div className={styles.container}>

      {/* Thông tin chi tiết */}
      <div className={styles.detailContainer}>
        <h2 className={styles.subTitle}>Thông tin cấp số</h2>

        <div className={styles.detailContent}>
          {/* Cột thông tin chính */}          <div className={styles.infoColumn}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Họ tên:</span>
              <span className={styles.value}>{capSo.customerName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Tên dịch vụ:</span>
              <span className={styles.value}>{capSo.serviceName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Số thứ tự:</span>
              <span className={styles.value}>{capSo.code}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Thời gian cấp:</span>
              <span className={styles.value}>{formatDateTime(capSo.assignmentDate)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Hạn sử dụng:</span>
              <span className={styles.value}>{formatDateTime(capSo.expireDate)}</span>
            </div>
          </div>

          {/* Cột trạng thái */}
          <div className={styles.statusColumn}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nguồn cấp:</span>
              <span className={styles.value}>{capSo.deviceCode}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Trạng thái:</span>
              <span className={styles.value}>                <span
                className={styles.statusDot}
                style={{
                  color: statusColor
                }}
              >
                ●
              </span> {statusText}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Số điện thoại:</span>
              <span className={styles.value}>{capSo.telephone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Địa chỉ Email:</span>
              <span className={styles.value}>{capSo.customerEmail}</span>
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
