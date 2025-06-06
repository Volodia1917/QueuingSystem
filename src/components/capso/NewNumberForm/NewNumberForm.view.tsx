import React, { useState } from "react";
import { Button, Select, Typography } from "antd";
import styles from "./NewNumberForm.module.css";
import type {CapSo} from "../../types/CapSo.type"
import CapSoPopup from "../CapSoPopup/CapSoPopup.view"

const { Option } = Select;

interface NewNumberFormProps {
  services: string[];
  onSubmit: (newCapSo: CapSo) => void;
  onCancel: () => void;
}

const NewNumberForm: React.FC<NewNumberFormProps> = ({ 
    services, 
    onSubmit, 
    onCancel 
}) => {
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const [popupData, setPopupData] = useState<CapSo | null>(null);

const handleSubmit = () => {
    if (!selectedService) return;

    const now = new Date();
    const issueTime = now.toLocaleString();
    const expiryTime = new Date(now.getTime() + 8 * 60 * 60 * 1000).toLocaleString(); // +8 tiếng

    const newCapSo: CapSo = {
      id: Date.now().toString(),
      stt: Math.floor(1000 + Math.random() * 9000).toString(),
      name: "Khách hàng mới",
      fullName: "Khách hàng mới",
      service: selectedService,
      timeIssued: issueTime,
      issueTime: issueTime,
      expiry: expiryTime,
      expiryTime: expiryTime,
      issuer: "Admin",
      status: "Đang chờ",
      phone: "",
      email: "",
      source: "Kiosk",
    };

    onSubmit(newCapSo);
    setPopupData(newCapSo);
  };

  return (
    <>
    <div className={styles.container}>
      <Typography.Title level={2} className={styles.title}>
        CẤP SỐ MỚI
        </Typography.Title>
      <div className={styles.field}>
        <label>Dịch vụ khách hàng lựa chọn</label>
        <Select
          placeholder="Chọn dịch vụ"
          value={selectedService}
          onChange={(value) => setSelectedService(value)}
          className={styles.service}
        >
          {services.map((service) => (
            <Option key={service} value={service}>
              {service}
            </Option>
          ))}
        </Select>
      </div>
      <div className={styles.buttonGroup}>
        <Button className={styles.canel} onClick={onCancel}>Hủy bỏ</Button>
        <Button 
        className={styles.submit} 
        type="primary" 
        onClick={handleSubmit}
        >
          In số
        </Button>
      </div>
    </div>

    {/* ✨ Hiển thị popup khi có dữ liệu */}
      {popupData && (
        <CapSoPopup capSo={popupData} onClose={() => {
            setPopupData(null)
            // onCancel(); // Gọi onCancel tại đây để tắt form sau khi đóng popup
        }} />
      )}
    </>
  );
};

export default NewNumberForm;
