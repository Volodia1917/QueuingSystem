import React from "react";
import { Button } from "antd";

const UserList: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <Button type="primary" onClick={onAdd}>
        Thêm mới
      </Button>
    </div>
  );
};

export default UserList;
