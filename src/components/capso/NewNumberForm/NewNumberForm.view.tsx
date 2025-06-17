import React, { useState, useEffect } from "react";
import { Button, Select, Typography } from "antd";
import styles from "./NewNumberForm.module.css";
import CapSoPopup from "../CapSoPopup/CapSoPopup.view"
import { serviceApi, Service, assignmentApi, GenerateAssignmentResponse } from "../../../libraries/assignmentApi";

const { Option } = Select;

interface NewNumberFormProps {
  onSubmit: (newCapSo: GenerateAssignmentResponse) => void;
  onCancel: () => void;
}

const NewNumberForm: React.FC<NewNumberFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [popupData, setPopupData] = useState<GenerateAssignmentResponse | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceApi.getActive();
        setServices(response);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async () => {
    if (!selectedService) return;

    try {
      const newAssignment = await assignmentApi.generate({
        customerName: "admin",
        customerEmail: "admin@example.com",
        telephone: "0909090909",
        serviceCode: selectedService.serviceCode,
        deviceCode: "KIO_1"
      }); console.log("Generated assignment:", newAssignment);

      setPopupData(newAssignment);

    } catch (error) {
      console.error("Failed to generate assignment:", error);
    }
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
            value={selectedService?.serviceCode}
            onChange={(value) => {
              const service = services.find(s => s.serviceCode === value);
              setSelectedService(service);
            }}
            className={styles.service}
          >
            {services.map((service: Service) => (
              <Option key={service.serviceCode} value={service.serviceCode}>
                {service.serviceName}
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

      {popupData && (
        <CapSoPopup
          capSo={popupData}
          onClose={() => {
            setPopupData(null);
            onCancel();
          }}
        />
      )}
    </>
  );
};

export default NewNumberForm;
