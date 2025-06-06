// components/capso/Topbar.view.tsx
import React from 'react';
import styles from './Topbar.module.css';
import { Bell } from 'lucide-react';

const Topbar = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.breadcrumb}>
        <span className={styles.link}>Cấp số</span>
        <span className={styles.separator}> &gt; </span>
        <span className={styles.current}>Danh sách cấp số</span>
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
            <p className={styles.username}>Lê Quỳnh Ái Vân</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
