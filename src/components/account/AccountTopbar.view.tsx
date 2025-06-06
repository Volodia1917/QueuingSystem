import React from 'react';
import styles from '../capso/Topbar/Topbar.module.css';
import { Bell } from 'lucide-react';

const AccountTopbar = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.breadcrumb}>
        <span className={styles.link}>Cài đặt hệ thống</span>
        <span className={styles.separator}> &gt; </span>
        <span className={styles.current}>Quản lý tài khoản</span>
      </div>

      <div className={styles.rightSection}>
        <Bell size={20} className={styles.bellIcon} />
        <div className={styles.userInfo}>
          <img
            src="/images/user.jpg" // Đổi thành ảnh thật nếu có
            alt="avatar"
            className={styles.avatar}
          />
          <div>
            <p className={styles.greeting}>Xin chào</p>
            <p className={styles.username}>Bùi Anh Khoa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTopbar;
