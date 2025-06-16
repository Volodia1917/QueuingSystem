// Utility functions for CapSo components

/**
 * Formats a date string to Vietnamese locale format
 * @param dateString - ISO date string
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Converts numeric status to Vietnamese text
 * @param status - Numeric status code
 * @returns Vietnamese status text
 */
export const getStatusText = (status: number): string => {
  switch (status) {
    case 1:
      return "Đang chờ";
    case 2:
      return "Đã sử dụng";
    case 3:
      return "Bỏ qua";
    default:
      return "Không xác định";
  }
};

/**
 * Gets the appropriate color for status display
 * @param status - Numeric status code
 * @returns Hex color code
 */
export const getStatusColor = (status: number): string => {
  const statusText = getStatusText(status);
  switch (statusText) {
    case "Đang chờ":
      return "#4277ff";
    case "Bỏ qua":
      return "#E73F3F";
    case "Đã sử dụng":
      return "#7E7D88";
    default:
      return "#34CD26";
  }
};
