export const BACKEND_URL = "http://localhost:5006/api";

export const getToken = () => {
  return localStorage.getItem("token") || "";
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
