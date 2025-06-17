import { useState, useEffect } from "react";
import { Row, Col, Grid } from "antd";
import { RightSidebar } from "../../components/DashboardContent/OverviewRightSidebar";
import { DashboardHeader } from "../../components/DashboardContent/DashboardHeader";
import { DashboardBody } from "../../components/DashboardContent/DashboardBody";

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
        <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{ padding: "16px" }}>
          <DashboardHeader />

          <DashboardBody showDrawer={showDrawer} isMobile={isMobile} />
        </Col>

        <RightSidebar
          isMobile={isMobile}
          onClose={onClose}
          visible={visible}
        />
      </Row>
    </div>
  );
};

export default DashboardContent;
