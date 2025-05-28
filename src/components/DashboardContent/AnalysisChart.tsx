import { Card, Select, Space, Typography } from "antd";
import React from "react";
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

const { Title, Text } = Typography;
const { Option } = Select;

const data = [
  {
    name: "01",
    value: 2400,
  },
  {
    name: "05",
    value: 3200,
  },
  {
    name: "10",
    value: 4000,
  },
  {
    name: "13",
    value: 3200,
  },
  {
    name: "16",
    value: 3500,
  },
  {
    name: "19",
    value: 4221,
    isHighest: true,
  },
  {
    name: "22",
    value: 3800,
  },
  {
    name: "26",
    value: 4100,
  },
  {
    name: "31",
    value: 3700,
  },
];

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
          {dataPoint.value}
        </div>
      );
    }
  }

  return null;
};

export const AnalysisChart = () => {
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
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Bảng thống kê theo ngày
          </Title>
          <Text type="secondary">Tháng 11/2021</Text>
        </div>
        <Space>
          <Text>Xem theo</Text>
          <Select defaultValue="ngay" style={{ width: 120 }}>
            <Option value="ngay">Ngày</Option>
            <Option value="tuan">Tuần</Option>
            <Option value="thang">Tháng</Option>
          </Select>
        </Space>
      </div>
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
              tickFormatter={(value) => `${value}/ngày`}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={6}
              domain={[0, 6000]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x="19"
              stroke="#4277FF"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
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
    </Card>
  );
};
