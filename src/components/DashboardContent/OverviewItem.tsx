import { Card, Flex, Typography } from "antd";
import React from "react";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
const { Text } = Typography;

export interface OverviewItemData {
  id: string;
  percentage: number;
  label: string;
  totalValue: string;
  icon: React.ReactNode;
  backgroundColor: string;
  chartColor?: string;
  details: {
    name: string;
    value: string;
    color: string;
  }[];
}

const parseNumericValue = (stringValue: string): number => {
  return parseFloat(stringValue.replace(/\./g, ""));
};

export const OverviewItem = ({ item }: { item: OverviewItemData }) => {
  const {
    label: title,
    icon,
    chartColor,
    details,
    percentage,
    backgroundColor,
  } = item;

  const displayPercentageColor = chartColor || "#8884d8";

  const numericDetails = details.map((d) => ({
    ...d,
    numericValue: parseNumericValue(d.value),
  }));

  const totalSumOfDetails = numericDetails.reduce(
    (sum, d) => sum + d.numericValue,
    0
  );

  const segmentDataForChartOriginal = numericDetails.map((d) => ({
    name: d.name,
    value:
      totalSumOfDetails > 0 ? (d.numericValue / totalSumOfDetails) * 100 : 0,
    fill: d.color,
  }));

  const segmentDataForChart = [...segmentDataForChartOriginal].reverse();

  return (
    <Card
      size="small"
      variant="borderless"
      style={{
        marginBottom: "8px",
        borderRadius: "12px",
        background: "#fff",
        overflow: "hidden",
        width: "100%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
      styles={{
        body: {
          padding: "8px 12px",
        },
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ flexWrap: "wrap" }}
      >
        <Flex align="center" style={{ flexShrink: 0, marginRight: "16px" }}>
          <div
            style={{
              position: "relative",
              width: 70,
              height: 70,
              flexShrink: 0,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="95%"
                barSize={12}
                data={segmentDataForChart}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  minPointSize={1}
                  background={{
                    fill: backgroundColor,
                  }}
                  dataKey="value"
                  angleAxisId={0}
                  cornerRadius={3}
                  label={false}
                  isAnimationActive={false}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fill: displayPercentageColor,
                  }}
                >
                  {`${percentage}%`}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Info Section */}
          <div
            style={{
              paddingLeft: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              strong
              style={{
                fontSize: "20px",
                lineHeight: "1.2",
                color: "#333",
                marginBottom: "2px",
              }}
            >
              {item.totalValue}
            </Text>
            <Text
              style={{
                color: "#555",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
              }}
            >
              {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                    style: { color: displayPercentageColor, fontSize: "16px" },
                  })
                : null}
              <span>{title}</span>
            </Text>
          </div>
        </Flex>

        {/* Right section - details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flexGrow: 1,
            minWidth: "150px",
          }}
        >
          {details.map((detail, index) => (
            <Flex key={index} justify="space-between" align="center">
              <Text
                style={{
                  fontSize: "13px",
                  color: "#444",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: detail.color,
                    marginRight: "6px",
                  }}
                />
                <span>{detail.name}</span>
              </Text>
              <Text
                strong
                style={{
                  color: detail.color,
                  fontSize: "13px",
                  marginLeft: "8px",
                }}
              >
                {detail.value}
              </Text>
            </Flex>
          ))}
        </div>
      </Flex>
    </Card>
  );
};
