import React, { useState } from "react";
import styles from "./CapSoList.module.css";

// import LeftSidebar from "@/components/Layout/LeftSidebar";
// import PageTitle from "@/components/PageTitle/PageTitle";
// import FilterPanel from "@/components/capso/FilterPanel/FilterPanel.view";
// import CapSoTable from "@/components/capso/CapSoTable/CapSoTable.view";
// import Pagination from "@/components/capso/Pagination/Pagination.view";
// import FloatingActionButton from "@/components/capso/FloatingActionBtn/FloatingActionBtn.view";

import LeftSidebar from "../../components/Layout/LeftSidebar";
import PageTitle from "../../components/PageTitle/PageTitle";
import FilterPanel from "../../components/capso/FilterPanel/FilterPanel.view";
import CapSoTable from "../../components/capso/CapSoTable/CapSoTable.view";
import Pagination from "../../components/capso/Pagination/Pagination.view";
import FloatingActionButton from "../../components/capso/FloatingActionBtn/FloatingActionBtn.view";
import Topbar from "../../components/capso/Topbar/Topbar.view"
import CapSoDetail from "../../components/capso/CapSoDetail/CapSoDetail.view";
import NewNumberForm from "../../components/capso/NewNumberForm/NewNumberForm.view"
import type { CapSo } from "../../components/types/CapSo.type";

const CapSoList: React.FC = () => {
  const [selectedCapSo, setSelectedCapSo] = useState<CapSo | null>(null);
  const [selectedService, setSelectedService] = useState(false); // state mới
  
  const [capSoList, setCapSoList] = useState<CapSo[]>([
    {
      id: "1",
      stt: "2001",
      name: "Nguyễn Văn A",
      fullName: "Nguyễn Văn A",
      service: "Khám sản",
      timeIssued: "10:00 - 01/01/2024",
      issueTime: "10:00 - 01/01/2024",
      expiry: "18:00 - 01/01/2024",
      expiryTime: "18:00 - 01/01/2024",
      issuer: "Admin",
      status: "Đang chờ",
      phone: "0987654321",
      email: "a@example.com",
      source: "Kiosk",
    },
    // các item khác
  ]);

  const handleAddNewCapSo = (newCapSo: CapSo) => {
    setCapSoList((prev) => [...prev, newCapSo]);
  };


  return (
    // <LeftSidebar
    //   content={
        <div className={styles.container}>
          <div className={styles.topbar}>
            {/* <Topbar /> */}
          </div>

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
                services={["Khám tim mạch", "Khám sản - Phụ khoa", "Khám răng hàm mặt", "Khám tai mũi họng"]}
                onCancel={() => setSelectedService(false)}
                onSubmit={handleAddNewCapSo}
              />
            ) : (
              <>
                <div className={styles.mainContent}>
                  <div className={styles.filterpanel}>
                    <FilterPanel />
                  </div>
                  <div className={styles.tableWithButton}>
                    <CapSoTable 
                    data={capSoList} 
                    onSelectDetail={(capSo) => setSelectedCapSo(capSo)} 
                    />
                    <div className={styles.floatingButton}>
                      <FloatingActionButton onClick={() => setSelectedService(true)} />
                    </div>
                  </div>
                  <div className={styles.paginationWrapper}>
                    <Pagination />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
    //   }
    // />
  );
};

export default CapSoList;