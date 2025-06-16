import React, { useState } from "react";
import CapSoRow from "../CapSoRow/CapSoRow.view";
import styles from "./CapSoTable.module.css";
import type { AdminFilterAssignment } from "../../../libraries/assignmentApi";
import CapSoDetail from "../CapSoDetail/CapSoDetail.view";
import { Pagination } from "antd";


interface CapSoTableProps {
  data?: AdminFilterAssignment[];
  loading?: boolean;
  onSelectDetail: (capSo: AdminFilterAssignment) => void;
  // Pagination props
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number, size?: number) => void;
}

const CapSoTable: React.FC<CapSoTableProps> = ({
  data: propData,
  loading = false,
  onSelectDetail: propOnSelect,
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange
}) => {
  // Use the data from props or empty array if no data
  const data: AdminFilterAssignment[] = propData || [];

  const [selectedCapSo, setSelectedCapSo] = useState<AdminFilterAssignment | null>(null);

  const handleSelectDetail = (capSo: AdminFilterAssignment) => {
    setSelectedCapSo(capSo);
    if (propOnSelect) {
      propOnSelect(capSo);
    }
  }; return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <CapSoRow
          data={data}
          loading={loading}
          onSelectDetail={handleSelectDetail}
        />
      </div>

      {/* Pagination inside table */}
      {onPageChange && (
        <div className={styles.paginationWrapper}>
          <Pagination
            current={currentPage}
            align="end"
            total={totalItems}
            pageSize={pageSize}
            showSizeChanger
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
            onChange={onPageChange}
          />
        </div>
      )}

      {selectedCapSo && (
        <CapSoDetail capSo={selectedCapSo} onBack={() => setSelectedCapSo(null)} />
      )}
    </div>
  );
};
export default CapSoTable;
