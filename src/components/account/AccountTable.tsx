import React, { useEffect, useState } from "react";
import TableCustom, { PaginationConfig } from "../Table/TableCustom";
import { getUser } from "../../libraries/getUser";
import { Button } from "antd";
import { Account } from "../types/Account.type";

interface AccountTableProps {
  onUpdateUser: (user: Account) => void;
  onSelectedUpdate: () => void;
}

const AccountTable: React.FC<AccountTableProps> = (props) => {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    total: 0,
    pageSize: 10,
  });

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const fetch_data = await getUser();
    console.log("Kết quả từ getUser:", fetch_data);

    // ✅ Luôn đảm bảo `data` là mảng
    if (Array.isArray(fetch_data)) {
      setData(fetch_data); // Trường hợp OK
    } else if (fetch_data && Array.isArray(fetch_data.$values)) {
      setData(fetch_data.$values); // Nếu dữ liệu nằm trong fetch_data.data
    } else {
      console.warn("⚠️ Dữ liệu getUser không hợp lệ. Đặt về mảng rỗng.");
      setData([]); // Fallback để không gây lỗi
    }

    setLoading(false);
  };

  fetchData();
}, []);


  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "email",
      key: "email",
      align: "left",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "left",
    },
    {
      title: "Số điện thoại",
      dataIndex: "telephone",
      key: "telephone",
      align: "left",
    },
    {
      title: "Vai trò",
      dataIndex: "userRole",
      key: "userRole",
      align: "left",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      align: "left",
      render: (status: string) => (
        <span style={{ color: status === "Hoạt động" ? "green" : "red" }}>
          ● {status}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_:any, record:Account) =>{
        console.log("Thông tin của user: ", record);
        return (
          <a onClick={() => {
            props.onSelectedUpdate(); // Gọi hàm để mở view cập nhật
            props.onUpdateUser(record);

          }}>Cập nhật</a>
        )
      } 
    },
  ];
  return <TableCustom columns={columns} data={data} loading={loading} />;
}

export default AccountTable;