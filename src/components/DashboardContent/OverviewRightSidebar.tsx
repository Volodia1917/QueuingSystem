import React, { useEffect, useState } from "react";
import { Button, Flex, Typography, Alert, Card, Empty, Skeleton } from "antd";
import { ReloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { Icons } from "../Icons/Icons";
import OverviewCalendar from "./Calendar";
import { OverviewItem, type OverviewItemData } from "./OverviewItem";
import { UserPart } from "../User/UserPart";
import { useApiWithRefresh } from "../../hooks/useApiWithRefresh";

import { getStatisticOverallSummary } from "../../libraries/statistic";

const { Text, Title } = Typography;

interface DetailItem {
  name: string;
  value: string;
  color: string;
}

interface SummaryItem {
  label: string;
  color: string;
  details: {
    $values: DetailItem[];
  };
  total: number;
  activePercentage: number;
}

interface OverallSummaryResponse {
  [key: string]: SummaryItem;
}

const getIconByKey = (key: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    devices: <Icons.OverviewDevice />,
    services: <Icons.OverviewService />,
    numbersGiven: <Icons.OverviewQueue />,
    numbers: <Icons.OverviewQueue />, // fallback
  };

  return iconMap[key] || <Icons.OverviewDevice />;
};

const formatNumber = (num: number): string => {
  return num.toLocaleString("vi-VN");
};

const FIELD_ORDER = ["devices", "services", "numbersGiven"];

const sortFieldsByOrder = (fields: string[]): string[] => {
  const knownFields = FIELD_ORDER.filter((field) => fields.includes(field));
  const unknownFields = fields.filter((field) => !FIELD_ORDER.includes(field));
  return [...knownFields, ...unknownFields];
};

export const OverviewRightSidebar = () => {
  const [overviewItems, setOverviewItems] = useState<OverviewItemData[]>([]);
  const {
    loading,
    error,
    isRefreshingToken,
    executeWithRefresh,
    clearError,
    retryCount,
  } = useApiWithRefresh();

  const fetchData = async () => {
    const result = await executeWithRefresh(async () => {
      const response: OverallSummaryResponse =
        await getStatisticOverallSummary();

      const fields = Object.keys(response).filter(
        (key) => !key.startsWith("$")
      );

      const sortedFields = sortFieldsByOrder(fields);

      const mappedData: OverviewItemData[] = sortedFields.map((fieldKey) => {
        const item = response[fieldKey];

        return {
          id: fieldKey,
          percentage: Math.round(item.activePercentage),
          totalValue: formatNumber(item.total),
          label: item.label,
          chartColor: item.color,
          backgroundColor: "#f0f0f0",
          icon: getIconByKey(fieldKey),
          details: item.details.$values.map((detail) => ({
            name: detail.name,
            value: detail.value,
            color: detail.color,
          })),
        };
      });

      return mappedData;
    });

    if (result) {
      setOverviewItems(result);
    } else {
      // Set fallback data when API fails
      setOverviewItems([
        {
          id: "devices",
          percentage: 0,
          totalValue: "0",
          label: "Thiết bị",
          chartColor: "#ff8c00",
          backgroundColor: "#f0f0f0",
          icon: <Icons.OverviewDevice />,
          details: [
            { name: "Đang hoạt động", value: "0", color: "#ff8c00" },
            { name: "Ngừng hoạt động", value: "0", color: "#505050" },
          ],
        },
        {
          id: "services",
          percentage: 0,
          totalValue: "0",
          label: "Dịch vụ",
          chartColor: "#007bff",
          backgroundColor: "#f0f0f0",
          icon: <Icons.OverviewService />,
          details: [
            { name: "Đang hoạt động", value: "0", color: "#007bff" },
            { name: "Ngừng hoạt động", value: "0", color: "#505050" },
          ],
        },
        {
          id: "numbers",
          percentage: 0,
          totalValue: "0",
          label: "Cấp số",
          chartColor: "#28a745",
          backgroundColor: "#f0f0f0",
          icon: <Icons.OverviewQueue />,
          details: [
            { name: "Đã sử dụng", value: "0", color: "#28a745" },
            { name: "Đang chờ", value: "0", color: "#ffc107" },
            { name: "Bỏ qua", value: "0", color: "#505050" },
          ],
        },
      ]);
    }
  };

  const handleRetry = () => {
    if (!isRefreshingToken) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const LoadingSkeleton = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          size="small"
          style={{
            borderRadius: "12px",
            marginBottom: "8px",
            height: "80px",
          }}
        >
          <Skeleton
            active
            avatar={{ shape: "circle", size: 64 }}
            paragraph={{ rows: 2 }}
            title={false}
          />
        </Card>
      ))}
    </div>
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflow: "auto",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div style={{ marginBottom: "16px" }}>
        <Title level={4} style={{ color: "#FF7A00", margin: 0 }}>
          Tổng quan
        </Title>
      </div>

      {error && (
        <Alert
          message="Lỗi tải dữ liệu"
          description={
            <Flex vertical gap="small">
              <Text>{error}</Text>
              <Flex gap="small">
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={handleRetry}
                  loading={loading || isRefreshingToken}
                  disabled={isRefreshingToken}
                >
                  {isRefreshingToken ? "Đang làm mới..." : "Thử lại"}
                </Button>
                {retryCount > 0 && (
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Đã thử lại {retryCount} lần
                  </Text>
                )}
              </Flex>
            </Flex>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          style={{
            marginBottom: "16px",
            borderRadius: "8px",
          }}
          closable
          onClose={clearError}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : overviewItems.length === 0 && !error ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có dữ liệu tổng quan"
            style={{
              padding: "20px 0",
              background: "#fafafa",
              borderRadius: "8px",
            }}
          >
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleRetry}
              loading={loading || isRefreshingToken}
              disabled={isRefreshingToken}
            >
              {isRefreshingToken ? "Đang làm mới..." : "Tải lại"}
            </Button>
          </Empty>
        ) : (
          overviewItems.map((item) => (
            <OverviewItem key={item.id} item={item} />
          ))
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        <OverviewCalendar defaultDate={new Date(2021, 10, 19)} />
        {/* <OverviewCalendar defaultDate={new Date()} /> */}
      </div>
    </div>
  );
};
