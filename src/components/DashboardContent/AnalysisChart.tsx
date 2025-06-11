import {
  Card,
  Select,
  Space,
  Typography,
  Spin,
  Alert,
  Button,
  DatePicker,
  Empty,
} from "antd";
import {
  ReloadOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import dayjs from "dayjs";

import { getStatisticChartData } from "../../libraries/statistic";
import { getErrorMessage } from "../../libraries/useApi";

const { Title, Text } = Typography;
const { Option } = Select;

interface StatisticData {
  name: string; // trục x
  value: number; // trục y
  isHighest?: boolean;
}

interface ChartDataItem {
  $id: string;
  date: string;
  value: number;
  period: string;
}

interface ChartDataResponse {
  $id: string;
  $values: ChartDataItem[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    if (dataPoint.isHighest) {
      return (
        <div
          style={{
            backgroundColor: "#4277FF",
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {dataPoint.value.toLocaleString("vi-VN")}
        </div>
      );
    }
  }

  return null;
};

type PeriodType = "day" | "week" | "month" | "year";

const PERIOD_OPTIONS = [
  { value: "day", label: "Ngày", vietnameseName: "ngày" },
  { value: "week", label: "Tuần", vietnameseName: "tuần" },
  { value: "month", label: "Tháng", vietnameseName: "tháng" },
  { value: "year", label: "Năm", vietnameseName: "năm" },
];

export const AnalysisChart = () => {
  const [data, setData] = useState<StatisticData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [period, setPeriod] = useState<PeriodType>("month");
  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs | null>(null);
  const [useCustomMonth, setUseCustomMonth] = useState(false);

  const processApiData = (apiResponse: ChartDataResponse): StatisticData[] => {
    if (
      !apiResponse ||
      !apiResponse.$values ||
      !Array.isArray(apiResponse.$values)
    ) {
      return [];
    }

    const chartData = apiResponse.$values;
    const maxValue = Math.max(...chartData.map((item) => item.value || 0));

    return chartData.map((item) => ({
      name: item.date || "",
      value: item.value || 0,
      isHighest: (item.value || 0) === maxValue,
    }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let month: string | undefined;

      // If custom month is selected, use it
      if (useCustomMonth && selectedMonth) {
        month = selectedMonth.format("YYYY-MM");
      }

      const apiResponse: ChartDataResponse = await getStatisticChartData(
        period,
        month
      );

      const processedData = processApiData(apiResponse);
      setData(processedData);
    } catch (error: any) {
      console.error("Error fetching chart data:", error);

      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchData();
  };

  const handlePeriodChange = (value: PeriodType) => {
    setPeriod(value);

    setUseCustomMonth(false);
    setSelectedMonth(null);
  };

  const handleMonthChange = (month: dayjs.Dayjs | null) => {
    setSelectedMonth(month);
    setUseCustomMonth(!!month);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [period, selectedMonth, useCustomMonth]);

  const currentPeriodInfo = PERIOD_OPTIONS.find((p) => p.value === period);
  const highestPoint = data.find((item) => item.isHighest);
  const maxValue = Math.max(...data.map((item) => item.value), 0);
  const yAxisMax = maxValue === 0 ? 100 : Math.ceil(maxValue * 1.2);

  const getDateRangeText = () => {
    if (useCustomMonth && selectedMonth) {
      return `Tháng ${selectedMonth.format("MM/YYYY")}`;
    }

    switch (period) {
      case "day":
        return `30 ngày gần nhất`;
      case "week":
        return `4 tuần gần nhất`;
      case "month":
        return `12 tháng gần nhất`;
      case "year":
        return `5 năm gần nhất`;
      default:
        return "";
    }
  };

  return (
    <Card
      style={{
        marginTop: "24px",
        borderRadius: "12px",
        border: "1px solid #D9D9D9",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Bảng thống kê theo {currentPeriodInfo?.vietnameseName}
          </Title>
          <Text type="secondary">{getDateRangeText()}</Text>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <Space size="large" wrap>
            <Space>
              <Text>Chọn tháng</Text>
              <DatePicker
                value={selectedMonth}
                onChange={handleMonthChange}
                picker="month"
                format="MM/YYYY"
                placeholder="Chọn tháng"
                style={{ width: 160 }}
                disabled={loading}
                allowClear
                suffixIcon={<CalendarOutlined />}
              />
            </Space>

            <Space>
              <Text>Xem theo</Text>
              <Select
                value={period}
                style={{ width: 120 }}
                onChange={handlePeriodChange}
                loading={loading}
              >
                {PERIOD_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Space>
          </Space>

          {useCustomMonth && (
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Sử dụng tháng tùy chỉnh
            </Text>
          )}
        </div>
      </div>

      {error && (
        <Alert
          message="Lỗi tải dữ liệu biểu đồ"
          description={
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text>{error}</Text>
              <Space>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={handleRetry}
                  loading={loading}
                >
                  Thử lại
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
          onClose={() => setError(null)}
        />
      )}

      {loading ? (
        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : data.length === 0 && !error ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có dữ liệu biểu đồ"
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
        <div style={{ height: "300px", width: "100%" }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CFE0FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#CFE0FF" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={6}
                domain={[0, yAxisMax]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString("vi-VN")}
              />
              <Tooltip content={<CustomTooltip />} />
              {highestPoint && (
                <ReferenceLine
                  x={highestPoint.name}
                  stroke="#4277FF"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              )}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4277FF"
                fill="url(#colorValue)"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  fill: "white",
                  stroke: "#4277FF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};
