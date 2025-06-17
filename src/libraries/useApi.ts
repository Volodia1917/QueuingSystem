import { config } from "./config";
import { MENU_KEYS } from "./config";
import { type MenuKey } from "./config";

export const API_URL = `${config.backendUrl}/api`;

export type UserRole = "Doctor" | "Staff" | "Admin" | "";

export const getToken = () => {
  return localStorage.getItem("token") || "";
};

export const getTokenRefresh = () => {
  return localStorage.getItem("tokenRefresh") || "";
};

export const getEmailCurrentUser = () => {
  return localStorage.getItem("email") || "";
};

export const getUserRole = (): UserRole => {
  return (localStorage.getItem("role") || "") as UserRole;
};

export const checkMenuAccess = (
  menuKey: MenuKey,
  userRole: UserRole
): boolean => {
  switch (userRole) {
    case "Doctor":
      return menuKey === MENU_KEYS.DOCTOR_PAGE;

    case "Staff":
      return menuKey !== MENU_KEYS.ACCOUNT_MANAGEMENT;

    case "Admin":
    default:
      // Admin và các role khác có quyền truy cập tất cả
      return true;
  }
};

export const getDefaultMenuForRole = (userRole: UserRole): MenuKey => {
  switch (userRole) {
    case "Doctor":
      return MENU_KEYS.DOCTOR_PAGE;
    default:
      return MENU_KEYS.DASHBOARD;
  }
};

export const getErrorMessage = (error: any) => {
  if (error?.response?.status === 401) {
    return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
  } else if (error?.response?.status === 403) {
    return "Bạn không có quyền truy cập dữ liệu này.";
  } else if (error?.response?.status === 404) {
    return "Không tìm thấy API endpoint.";
  } else if (error?.response?.status >= 500) {
    return "Lỗi server. Vui lòng thử lại sau.";
  } else if (
    error?.message?.includes("Network Error") ||
    error?.code === "NETWORK_ERROR"
  ) {
    return "Lỗi kết nối mạng. Vui lòng kiểm tra internet.";
  } else if (error?.name === "TimeoutError") {
    return "Quá thời gian chờ. Vui lòng thử lại.";
  } else {
    return "Lỗi không xác định. Vui lòng thử lại.";
  }
};

export const refreshToken = async (
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    const response = await fetch(`${API_URL}/Authentication/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: getEmailCurrentUser(),
        refreshToken: getTokenRefresh(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenRefresh", data.refreshToken);
      onSuccess?.();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenRefresh");
      localStorage.removeItem("email");
      onError?.();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("tokenRefresh");
    localStorage.removeItem("email");
    onError?.();
  }
};

export const handleError = (
  error: any,
  callback?: () => void,
  onRefreshError?: () => void
) => {
  const errorMessage = getErrorMessage(error);

  if (error?.response?.status === 401) {
    refreshToken(callback, () => {
      onRefreshError?.();
    });
  }

  return errorMessage;
};
