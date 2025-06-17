import { API_URL, getToken } from "../useApi";

import { Account } from "../../components/types/Account.type";


// Lấy danh sách tài khoản
export const fetchAccounts = async () => {
  const response = await fetch(`${API_URL}/User/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  // if (!response.ok) {
  //   throw new Error("Lỗi khi gọi API");
  // }

  // const data = await response.json();
  // const values = data?.$values || [];
  // return values as Account[];
  return response.json();
};

// Tạo tài khoản mới
export const createAccount = async (data: Account): Promise<Account> => {
  const response = await fetch("/api/User", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Lỗi khi thêm tài khoản");
  }

  return response.json(); // trả về tài khoản đã tạo (nếu backend trả về)
};
