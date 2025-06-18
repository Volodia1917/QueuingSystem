import React from "react";
import { Typography, Row, Col } from "antd";

import {
  FloatingButtonGroup,
  FloatingButtonItem,
  MIN_WIDTH_OF_FLOAT_BUTTON,
} from "../FloatButtonCustom/FloatButtonGroup";

const { Title } = Typography;

interface MainContentLayoutProps {
  title: string;
  children: React.ReactNode;
  floatButtonItems?: FloatingButtonItem[];
}

export const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  title,
  children,
  floatButtonItems,
}) => {
  const marginRight = MIN_WIDTH_OF_FLOAT_BUTTON;
  return (
    <div
      style={{
        background: "#f6f6f6",
        width: "100%",
        padding: "24px",
        boxSizing: "border-box",
        overflow: "auto",
        paddingRight: `calc(${marginRight}px + 24px)`,
      }}
    >
      <Row style={{ marginBottom: "24px" }}>
        <Title
          level={3}
          style={{
            color: "#ff7506",
            marginBottom: 0,
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          {title}
        </Title>
      </Row>

      <div
        style={{
          width: "100%",
        }}
      >
        {children}
        {floatButtonItems && <FloatingButtonGroup items={floatButtonItems} />}
      </div>
    </div>
  );
};
