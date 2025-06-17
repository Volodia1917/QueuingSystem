import React, { useState, useEffect } from "react";
import styles from "./CapSoList.module.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import FilterPanel from "../../components/capso/FilterPanel/FilterPanel.view";
import CapSoTable from "../../components/capso/CapSoTable/CapSoTable.view";
import FloatingActionButton from "../../components/capso/FloatingActionBtn/FloatingActionBtn.view";
import CapSoDetail from "../../components/capso/CapSoDetail/CapSoDetail.view";
import NewNumberForm from "../../components/capso/NewNumberForm/NewNumberForm.view";
import {
  assignmentApi,
  serviceApi,
  AdminFilterAssignment,
  GenerateAssignmentResponse,
  AdminFilterRequest,
  Service,
} from "../../libraries/assignmentApi";

const CapSoList: React.FC = () => {
  const [selectedCapSo, setSelectedCapSo] =
    useState<AdminFilterAssignment | null>(null);
  const [selectedService, setSelectedService] = useState(false); // state mới
  const [capSoList, setCapSoList] = useState<AdminFilterAssignment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<AdminFilterRequest>({});
  // Fetch services for filter dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceList = await serviceApi.getAll();
        setServices(serviceList);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchCapSoList = async () => {
      setLoading(true);
      try {
        const response = await assignmentApi.adminFilter({
          page: currentPage,
          pageSize: pageSize,
          ...filters,
        });
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
  const handleFilterChange = (newFilters: AdminFilterRequest) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAddNewCapSo = (newCapSo: GenerateAssignmentResponse) => {
    // Refresh the list after adding new assignment
    const fetchCapSoList = async () => {
      try {
        const response = await assignmentApi.adminFilter({
          page: currentPage,
          pageSize: pageSize,
          ...filters,
        });
        setCapSoList(response.items);
        setTotalItems(response.totalItems);
      } catch (error) {
        console.error("Failed to refresh cap so list:", error);
      }
    };
    fetchCapSoList();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.pageHeader}>
          <PageTitle title="Quản lý cấp số" />
        </div>

        {selectedCapSo ? (
          <CapSoDetail
            capSo={selectedCapSo}
            onBack={() => setSelectedCapSo(null)}
          />
        ) : selectedService ? (
          <NewNumberForm
            onCancel={() => setSelectedService(false)}
            onSubmit={handleAddNewCapSo}
          />
        ) : (
          <>
            {" "}
            <div className={styles.mainContent}>
              <div className={styles.filterpanel}>
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  services={services}
                />
              </div>{" "}
              <div className={styles.tableWithButton}>
                <CapSoTable
                  data={capSoList}
                  loading={loading}
                  onSelectDetail={(capSo) => setSelectedCapSo(capSo)}
                  currentPage={currentPage}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
                <div className={styles.floatingButton}>
                  <FloatingActionButton
                    onClick={() => setSelectedService(true)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CapSoList;
