import React from "react";
import { Pagination } from "antd";
import styles from "./Pagination.module.css";
import "boxicons/css/boxicons.min.css"; // Đảm bảo bạn đã import

const CustomPagination: React.FC = () => {
  return (
    <div className={styles.paginationContainer}>
      <Pagination
        defaultCurrent={1}
        total={100}
        pageSize={10}
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === "page") {
            return <span className={styles.pageNumber}>{page}</span>;
          }

          if (type === "prev") {
            return (
              <button className={styles.arrowButton}>
                <i className="bx bx-caret-left"></i>
              </button>
            );
          }

          if (type === "next") {
            return (
              <button className={styles.arrowButton}>
                <i className="bx bx-caret-right"></i>
              </button>
            );
          }

          return originalElement;
        }}
      />
    </div>
  );
};

export default CustomPagination;
