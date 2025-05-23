import { Row, Col, Card, Typography, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Icons } from "./Icons";
import { ReactNode } from "react";

const { Text } = Typography;

interface CardData {
  key: string;
  icon: ReactNode;
  bgColor: string;
  title: string;
  value: string;
  percentage: string;
  status: "increase" | "decrease";
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
            padding: "6px"
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

const cardData: CardData[] = [
  {
    key: "issued",
    icon: <Icons.TicketIssued />,
    bgColor: "#E1F0FF",
    title: "Số thứ tự đã cấp",
    value: "4.221",
    percentage: "32.41%",
    status: "increase",
  },
  {
    key: "used",
    icon: <Icons.TicketUsed />,
    bgColor: "#E1F7E8",
    title: "Số thứ tự đã sử dụng",
    value: "3.721",
    percentage: "32.41%",
    status: "decrease",
  },
  {
    key: "waiting",
    icon: <Icons.TicketPending />,
    bgColor: "#FFF3E9",
    title: "Số thứ tự đang chờ",
    value: "468",
    percentage: "56.41%",
    status: "increase",
  },
  {
    key: "skipped",
    icon: <Icons.TicketSkipped />,
    bgColor: "#FEE9E9",
    title: "Số thứ tự đã bỏ qua",
    value: "32",
    percentage: "22.41%",
    status: "decrease",
  },
];

const DashboardCards = () => (
  <Row gutter={[16, 16]}>
    {cardData.map((card) => (
      <Col xs={24} sm={12} md={12} lg={6} key={card.key}>
        <StatCard data={card} />
      </Col>
    ))}
  </Row>
);

export default DashboardCards;
