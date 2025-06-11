import { Row, Col, Card, Typography, Space, Alert, Button, Empty } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";

import { Icons } from "../Icons/Icons";
import { useApiWithRefresh } from "../../hooks/useApiWithRefresh";

import { getStatisticNumbersOverview } from "../../libraries/statistic";

const { Text } = Typography;

interface CardData {
  icon: ReactNode;
  bgColor: string;
  title: string;
  value: string;
  percentage: string;
  status: "increase" | "decrease";
}

interface StatisticItem {
  title: string;
  value: number;
  percentageChange: number;
  isIncrease: boolean;
  icon: string;
  color: string;
}

interface StatisticResponse {
  [key: string]: StatisticItem;
}

const StatCard = ({ data }: { data: CardData }) => {
  const { icon, bgColor, title, value, percentage, status } = data;

  return (
    <Card
      variant="outlined"
      size={"small"}
      style={{
        borderRadius: "12px",
        // same height for all cards
        height: "100%",
      }}
    >
      <Space direction={"vertical"}>
        <Space align="center" size="middle">
          <div
            style={{
              backgroundColor: bgColor,
              padding: "3px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
            }}
          >
            {icon}
          </div>
          <Text>{title}</Text>
        </Space>
        <Space
          align="center"
          style={{
            marginTop: "6px",
            display: "flex",
            justifyContent: "space-between",
            padding: "6px",
          }}
        >
          <Text
            strong
            style={{
              fontSize: "27px",
              color: "#535261",
              marginRight: "8px",
              lineHeight: "36px",
            }}
          >
            {value}
          </Text>
          <div
            style={{
              backgroundColor:
                status === "increase"
                  ? "rgba(255, 149, 1, 0.15)"
                  : "rgba(231, 63, 63, 0.15)",
              padding: "3px 8px",
              borderRadius: "7px",
              fontSize: "10px",
              display: "inline-flex",
              alignItems: "center",
              alignSelf: "end",
              height: "18px",
            }}
          >
            <span
              style={{
                color: status === "increase" ? "#FF9500" : "#E73F3F",
                display: "flex",
                alignItems: "center",
              }}
            >
              {status === "increase" ? (
                <ArrowUpOutlined style={{ fontSize: "8px" }} />
              ) : (
                <ArrowDownOutlined style={{ fontSize: "8px" }} />
              )}
              <span style={{ marginLeft: "3px" }}>{percentage}</span>
            </span>
          </div>
        </Space>
      </Space>
    </Card>
  );
};

// Helper function to get icon component by icon name
const getIconByName = (iconName: string): ReactNode => {
  const iconMap: Record<string, ReactNode> = {
    "ticket-issued": <Icons.TicketIssued />,
    "ticket-used": <Icons.TicketUsed />,
    "ticket-waiting": <Icons.TicketPending />,
    "ticket-skipped": <Icons.TicketSkipped />,
  };

  return iconMap[iconName] || <Icons.TicketIssued />;
};

// Helper function to format number with thousands separator
const formatNumber = (num: number): string => {
  return num.toLocaleString("vi-VN");
};

const getStatus = (increase: boolean) => (increase ? "increase" : "decrease");

// Define display order for known fields
const FIELD_ORDER = ["total", "used", "waiting", "skipped"];

// Function to sort fields based on predefined order, with unknown fields at the end
const sortFieldsByOrder = (fields: string[]): string[] => {
  const knownFields = FIELD_ORDER.filter((field) => fields.includes(field));
  const unknownFields = fields.filter((field) => !FIELD_ORDER.includes(field));
  return [...knownFields, ...unknownFields];
};

const DashboardCards = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
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
      const response: StatisticResponse = await getStatisticNumbersOverview();

      // Get all fields from response (excluding $id fields)
      const fields = Object.keys(response).filter(
        (key) => !key.startsWith("$")
      );

      // Sort fields based on predefined order
      const sortedFields = sortFieldsByOrder(fields);

      const mappedData: CardData[] = sortedFields.map((fieldKey) => {
        const item = response[fieldKey];
        return {
          bgColor: item.color,
          icon: getIconByName(item.icon),
          title: item.title,
          value: formatNumber(item.value),
          percentage: `${Math.abs(item.percentageChange)}%`,
          status: getStatus(item.isIncrease),
        };
      });

      return mappedData;
    });

    if (result) {
      setCardData(result);
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

  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4].map((item) => (
          <Col xs={24} sm={12} md={12} lg={6} key={item}>
            <Card loading style={{ borderRadius: "12px", height: "120px" }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      {error && (
        <Alert
          message="Lỗi tải dữ liệu"
          description={
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text>{error}</Text>
              <Space>
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
              </Space>
            </Space>
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

      {cardData.length === 0 && !loading && !error ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có dữ liệu thống kê"
          style={{
            padding: "40px 0",
            background: "#fafafa",
            borderRadius: "8px",
          }}
        >
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRetry}
          >
            Tải lại
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {cardData.map((card, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={`card-${index}`}>
              <StatCard data={card} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default DashboardCards;
