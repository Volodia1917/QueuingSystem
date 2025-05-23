import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Drawer, Button, Grid } from "antd";
import DashboardCards from "../../components/DashboardContent/DashboardCards";
import { AnalysisChart } from "../../components/DashboardContent/AnalysisChart";
import { OverviewRightSidebar } from "../../components/DashboardContent/OverviewRightSidebar";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const DashboardContent = () => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.lg;

  useEffect(() => {
    if (!isMobile && visible) {
      setVisible(false);
    }
  }, [isMobile, visible]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        background: "#F6F6F6",
        minHeight: "100vh",
        overflow: "hidden",
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <Row gutter={[16, 16]} style={{ margin: 0, width: "100%" }} wrap={false}>
        {/* Left Content */}
        <Col xs={24} sm={24} md={24} lg={18} xl={18} style={{ padding: "16px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div>
              <Title level={2} style={{ margin: 0, color: "#FF7506" }}>
                Dashboard
              </Title>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Title level={3} style={{ color: "#FF7506", margin: 0 }}>
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
        </Col>

        {/* Right Sidebar - Only visible on large screens */}
        {!isMobile ? (
          <Col
            xs={0}
            sm={0}
            md={0}
            lg={6}
            xl={6}
            style={{
              width: "100%",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <OverviewRightSidebar />
          </Col>
        ) : null}
      </Row>

      {/* Drawer for mobile view */}
      <Drawer
        title="Tổng quan"
        placement="right"
        onClose={onClose}
        open={visible}
        width={640}
      >
        <OverviewRightSidebar />
      </Drawer>
    </div>
  );
};

export default DashboardContent;
