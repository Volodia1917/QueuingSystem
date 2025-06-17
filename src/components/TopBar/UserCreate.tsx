import React from "react";
import { Button } from "antd";

const UserCreate: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div>
      <h2>Thêm mới người dùng</h2>
      <Button onClick={onBack}>Quay lại danh sách</Button>
    </div>
  );
};

export default UserCreate;
