import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './AccountFilterPanel.module.css';


const AccountFilterPanel = () => {
  
  return (
    <div className={styles.filterPanel}>
      {/* Tên vai trò */}
      <div className={styles.leftGroup}>
        <div className={styles.filterItem}>
          <label>Tên vai trò</label>
          <div className={styles.customSelect}>
            <select>
              <option>Tất cả</option>
              <option>Hoạt động </option>
              <option>Ngưng hoạt động</option>
            </select>
            <i className="bx bx-caret-down"></i>
          </div>
        </div>
      </div>       

      {/* Từ khóa */}
      <div className={styles.rightGroup}>
        <div className={styles.filterItem}>
          <label>Từ khoá</label>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Nhập từ khóa" />
            <Search size={18} color="#FF7506" className={styles.rightIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountFilterPanel;
