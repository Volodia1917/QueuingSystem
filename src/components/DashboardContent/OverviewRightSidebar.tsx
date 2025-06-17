import React, { useEffect, useState } from "react";
import { Typography, Card, Empty, Skeleton, Col, Drawer } from "antd";

import { Icons } from "../Icons/Icons";
import OverviewCalendar from "./Calendar";
import { OverviewItem, type OverviewItemData } from "./OverviewItem";
import { UserPart } from "../User/UserPart";
import { useApiWithRefresh } from "../../hooks/useApiWithRefresh";

import { getStatisticOverallSummary } from "../../libraries/statistic";
import { Errors } from "../Errors/Errors";

const { Title } = Typography;

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

const OverviewRightSidebar = () => {
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
      <HeaderOverview />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <OverviewItems />
      </div>

      <div style={{ marginTop: "16px" }}>
        <OverviewCalendar />
      </div>
    </div>
  );
};

const HeaderOverview = () => {
  return (
    <>
      <UserPart />

      <div style={{ marginBottom: "16px" }}>
        <Title level={4} style={{ color: "#FF7A00", margin: 0 }}>
          Tổng quan
        </Title>
      </div>
    </>
  );
};

const OverviewItems = () => {
  const [overviewItems, setOverviewItems] = useState<OverviewItemData[]>([]);
  const { loading, error, isRefreshingToken, executeWithRefresh, retryCount } =
    useApiWithRefresh();

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
      setOverviewItems([]);
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

  return (
    <>
      {error && (
        <Errors
          error={error}
          onRetry={handleRetry}
          loading={loading}
          isRefreshingToken={isRefreshingToken}
          retryCount={retryCount}
        />
      )}
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
        />
      ) : (
        <>
          {overviewItems.map((item) => (
            <OverviewItem key={item.id} item={item} />
          ))}
        </>
      )}
    </>
  );
};

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

export const RightSidebar = ({
  isMobile,
  onClose,
  visible,
}: {
  isMobile: boolean;
  onClose: () => void;
  visible: boolean;
}) => {
  return (
    <>
      {isMobile ? (
        <Drawer
          title="Tổng quan"
          placement="right"
          onClose={onClose}
          open={visible}
          width={700}
        >
          <OverviewRightSidebar />
        </Drawer>
      ) : (
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={8}
          xl={8}
          style={{
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <OverviewRightSidebar />
        </Col>
      )}
    </>
  );
};
