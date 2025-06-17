import React, { useState, useEffect } from "react";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import UserList from "./UserList";
import UserCreate from "./UserCreate";

const UserPage: React.FC = () => {
  const [view, setView] = useState<"list" | "create">("list");
  const { setBreadcrumbs, addBreadcrumb } = useBreadcrumb();

  // Set mặc định ban đầu khi vào trang
  useEffect(() => {
    setBreadcrumbs([{ title: "Người dùng", onClick: () => setView("list") }]);
  }, []);

  // Mỗi lần chuyển về "list", xóa breadcrumb về ban đầu
  useEffect(() => {
    if (view === "list") {
      setBreadcrumbs([{ title: "Người dùng", onClick: () => setView("list") }]);
    }
  }, [view]);

  // Hàm gọi khi nhấn "Thêm mới"
  const handleAdd = () => {
    addBreadcrumb({ title: "Thêm mới" });
    setView("create");
  };

  return (
    <div style={{ padding: 20 }}>
      {view === "list" && <UserList onAdd={handleAdd} />}
      {view === "create" && <UserCreate onBack={() => setView("list")} />}
    </div>
  );
};

export default UserPage;
