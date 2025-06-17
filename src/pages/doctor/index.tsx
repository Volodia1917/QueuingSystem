import React, { useState, useEffect } from "react";
import styles from "./../capso/CapSoList.module.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import DoctorCapSoTable from "../../components/capso/DoctorCapSoTable/DoctorCapSoTable.view";
import {
  assignmentApi,
  AdminFilterAssignment,
  AdminFilterRequest,
} from "../../libraries/assignmentApi";
import { message } from "antd";

const CapSoList: React.FC = () => {
  const [capSoList, setCapSoList] = useState<AdminFilterAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<AdminFilterRequest>({});

  useEffect(() => {
    const fetchCapSoList = async () => {
      setLoading(true);
      try {
        const response = await assignmentApi.getByRole();
        setCapSoList(response.items);
        setTotalItems(response.totalItems);
      } catch (error) {
        console.error("Failed to fetch cap so list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapSoList();
  }, [currentPage, pageSize, filters]);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  const handleExamine = async (capSo: AdminFilterAssignment) => {
    try {
      setLoading(true);
      await assignmentApi.toProcessing(capSo.code);
      message.success("Đã cập nhật trạng thái thành công!");

      // Refresh data
      const response = await assignmentApi.getByRole();
      setCapSoList(response.items);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Cập nhật trạng thái thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async (capSo: AdminFilterAssignment) => {
    try {
      setLoading(true);
      await assignmentApi.toNext(capSo.code);
      message.success("Đã bỏ qua thành công!");

      // Refresh data
      const response = await assignmentApi.getByRole();
      setCapSoList(response.items);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Bỏ qua thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.pageHeader}>
          <PageTitle title="Quản lý cấp số" />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tableWithButton}>
            <DoctorCapSoTable
              data={capSoList}
              loading={loading}
              onExamine={handleExamine}
              onSkip={handleSkip}
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapSoList;
