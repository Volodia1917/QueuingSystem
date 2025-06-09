import React from "react";
import { Breadcrumb, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useBreadcrumb, BreadcrumbItem } from "./BreadcrumbContext";

const { Text } = Typography;

interface CustomBreadcrumbProps {
  items?: BreadcrumbItem[];
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CustomBreadcrumb Component
 *
 * Displays a breadcrumb navigation with custom styling and behavior.
 * The last item is highlighted in orange (#FF7506) and non-clickable.
 * Previous items are clickable and styled in gray (#7E7D88).
 *
 * @param props - Component props
 * @returns JSX element or null if no breadcrumb items
 *
 * **Note: use <BreadcrumbProvider> if show error '...must be used within a BreadcrumbProvider'
 *
 * @example
 * // Basic usage with context (recommended)
 * ```tsx
 * import { CustomBreadcrumb } from './components/Layout/CustomBreadcrumb';
 * import { useBreadcrumbNavigation } from './hooks/useBreadcrumbNavigation';
 *
 * const MyComponent = () => {
 *   const { setDeviceBreadcrumb } = useBreadcrumbNavigation();
 *
 *   useEffect(() => {
 *     setDeviceBreadcrumb('list', () => navigate('/devices'));
 *   }, []);
 *
 *   return <CustomBreadcrumb />;
 * };
 * ```
 *
 * @example
 * // Direct usage with items prop
 * ```tsx
 * const breadcrumbItems = [
 *   { title: 'Trang chủ', onClick: () => navigate('/') },
 *   { title: 'Thiết bị', onClick: () => navigate('/devices') },
 *   { title: 'Chi tiết thiết bị' }
 * ];
 *
 * <CustomBreadcrumb items={breadcrumbItems} />
 * ```
 *
 * @example
 * // Usage in different sections
 * ```tsx
 * // Device section
 * const { setDeviceBreadcrumb } = useBreadcrumbNavigation();
 * setDeviceBreadcrumb('add'); // Shows: Thiết bị > Thêm thiết bị
 * setDeviceBreadcrumb('edit'); // Shows: Thiết bị > Cập nhật thiết bị
 * setDeviceBreadcrumb('detail'); // Shows: Thiết bị > Chi tiết thiết bị
 *
 * // Service section
 * const { setServiceBreadcrumb } = useBreadcrumbNavigation();
 * setServiceBreadcrumb('list'); // Shows: Dịch vụ > Danh sách dịch vụ
 * ```
 *
 * @example
 * // Custom styling
 * ```tsx
 * <CustomBreadcrumb
 *   className="my-breadcrumb"
 *   style={{
 *     padding: '20px 0',
 *     backgroundColor: '#f5f5f5'
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CustomBreadcrumb items={[{ title: "Dashboard" }]} />
 * ```
 */
export const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
  items,
  size = "medium",
  className,
  style,
}) => {
  const { breadcrumbs } = useBreadcrumb();
  const breadcrumbItems = items || breadcrumbs;

  if (!breadcrumbItems || breadcrumbItems.length === 0) {
    return null;
  }

  const antdBreadcrumbItems = breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;

    return {
      title: (
        <Text
          style={{
            color: isLast ? "#FF7506" : "#7E7D88",
            fontSize:
              size === "small" ? "12px" : size === "medium" ? "14px" : "16px",
            fontWeight: isLast ? 600 : 400,
            cursor: item.onClick && !isLast ? "pointer" : "default",
          }}
          onClick={item.onClick && !isLast ? item.onClick : undefined}
        >
          {item.title}
        </Text>
      ),
    };
  });

  return (
    <div
      style={{
        padding: "16px 0",
        ...style,
      }}
      className={className}
    >
      <Breadcrumb
        separator={
          <RightOutlined
            style={{
              fontSize: "12px",
              color: "#7E7D88",
              margin: "0 8px",
            }}
          />
        }
        items={antdBreadcrumbItems}
      />
    </div>
  );
};
