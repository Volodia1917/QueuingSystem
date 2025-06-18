import React from "react";
import { Breadcrumb, Typography } from "antd";

const { Title } = Typography;

interface PageTitleProps {
  title: string;
  style?: React.CSSProperties;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, style
  // , breadcrumb 
}) => {
  return (
      <Title
        level={3}
        style={{
          fontWeight: 700,
          color: "#FF7506", 
          ...style
        }}
      >
        {title}
      </Title>
  )
};

export default PageTitle;
