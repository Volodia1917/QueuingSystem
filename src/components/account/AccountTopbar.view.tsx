import React from 'react';
import styles from '../capso/Topbar/Topbar.module.css';
import { Bell } from 'lucide-react';
import {UserPart} from "../User/UserPart"

const AccountTopbar = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.breadcrumb}>
        <span className={styles.link}>Cài đặt hệ thống</span>
        <span className={styles.separator}> &gt; </span>
        <span className={styles.current}>Quản lý tài khoản</span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.userInfo}>
          <UserPart />
        </div>
      </div>
    </div>
  );
};

export default AccountTopbar;
