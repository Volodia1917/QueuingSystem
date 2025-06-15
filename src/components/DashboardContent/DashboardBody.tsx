import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import DashboardCards from "./DashboardCards";
import { AnalysisChart } from "./AnalysisChart";

const { Title } = Typography;

export const DashboardBody = ({
  isMobile,
  showDrawer,
}: {
  isMobile: boolean;
  showDrawer: () => void;
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Title level={4} style={{ color: "#FF7506", margin: 0 }}>
          Biểu đồ cấp số
        </Title>
        {isMobile && (
          <Button
            type="primary"
            icon={<MenuUnfoldOutlined />}
            onClick={showDrawer}
            style={{
              backgroundColor: "#FF7506",
              borderColor: "#FF7506",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </div>

      <DashboardCards />

      {/* Chart */}
      <div
        style={{
          marginTop: "16px",
          height: "400px",
          width: "100%",
        }}
      >
        <AnalysisChart />
      </div>
    </>
  );
};
