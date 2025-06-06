import React, { useState } from "react";
import CapSoRow from "../CapSoRow/CapSoRow.view";
import styles from "./CapSoTable.module.css";
import type { CapSo } from "../../types/CapSo.type";
import CapSoDetail from "../CapSoDetail/CapSoDetail.view";


interface CapSoTableProps {
  data?: CapSo[];
  onSelectDetail: (capSo: CapSo) => void;
}

const CapSoTable: React.FC <CapSoTableProps> = ({ data: propData, onSelectDetail: propOnSelect }) => {
  const data: CapSo[] = [
    {
    id: '1',
    stt: '2010001',
    name: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    source: 'Kiosk',
    fullName: "Nguyễn Văn A",
    issueTime: "10:00 - 01/01/2024",
    expiryTime: "18:00 - 01/01/2024",
    issuer: "Admin",
    phone: "0909090909",
    email: "a@example.com",
  },
  {
    id: '2',
    stt: '2010002',
    name: 'Huỳnh Ái Vân',
    service: 'Khám sản - Phụ Khoa',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đã sử dụng',
    source: 'Kiosk',
  },
  {
    id: '3',
    stt: '2010003',
    name: 'Lê Ái Vân',
    service: 'Khám răng hàm mặt',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    source: 'Hệ thống',
  },
  {
    id: '4',
    stt: '2010004',
    name: 'Nguyễn Ái Vân',
    service: 'Khám tai mũi họng',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    source: 'Hệ thống',
  },
  {
    id: '5',
    stt: '2010005',
    name: 'Trần Thị Ái Vân',
    service: 'Khám hô hấp',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    source: 'Kiosk',
  },
  {
    id: '6',
    stt: '2010006',
    name: 'Lê Huỳnh Nghĩa',
    service: 'Khám tổng quát',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Đã sử dụng',
    source: 'Hệ thống',
  },
  {
    id: '7',
    stt: '2010007',
    name: 'Lê Huỳnh Đức',
    service: 'Khám tai mũi họng',
    timeIssued: '14:35 - 07/11/2021',
    expiry: '14:35 - 12/11/2021',
    status: 'Bỏ qua',
    source: 'Kiosk',
  },
  // {
  //   id: '8',
  //   stt: '2010008',
  //   name: 'Phạm Văn Mạnh',
  //   service: 'Khám tổng quát',
  //   timeIssued: '14:35 - 07/11/2021',
  //   expiry: '14:35 - 12/11/2021',
  //   status: 'Bỏ qua',
  //   source: 'Hệ thống',
  // },
  // {
  //   id: '9',
  //   stt: '2010009',
  //   name: 'Lê Thị Cẩm Tiên',
  //   service: 'Khám tai mũi họng',
  //   timeIssued: '14:35 - 07/11/2021',
  //   expiry: '14:35 - 12/11/2021',
  //   status: 'Đã sử dụng',
  //   source: 'Hệ thống',
  // },
    // Thêm dữ liệu nếu muốn
  ];

  // State lưu bản ghi được chọn để hiện chi tiết
  const [selectedCapSo, setSelectedCapSo] = useState<CapSo | null>(null);

  // Hàm xử lý chọn bản ghi
  const handleSelectDetail = (capSo: CapSo) => {
    setSelectedCapSo(capSo);
    if (propOnSelect) {
      propOnSelect(capSo);
    }
  };

  return (
    <div className={styles.wrapper}>
      <CapSoRow data={data} onSelectDetail={handleSelectDetail} />
      {selectedCapSo && (
        <CapSoDetail capSo={selectedCapSo} onBack={() => setSelectedCapSo(null)} />
      )}
    </div>
  );
};
export default CapSoTable;
