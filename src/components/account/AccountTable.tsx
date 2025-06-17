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
  const [data, setData] = useState([]);
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
      setData(fetch_data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Vai trò",
      dataIndex: "userRole",
      key: "userRole",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
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