// components/capso/Topbar.view.tsx
import React from 'react';
import styles from './Topbar.module.css';
import {UserPart} from "../../User/UserPart"

const Topbar = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.breadcrumb}>
        <span className={styles.link}>Cấp số</span>
        <span className={styles.separator}> &gt; </span>
        <span className={styles.current}>Danh sách cấp số</span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <UserPart />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
