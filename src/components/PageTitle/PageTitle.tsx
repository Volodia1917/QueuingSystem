import React from "react";
import { Breadcrumb, Typography } from "antd";

const { Title } = Typography;

interface PageTitleProps {
  title: string;
  // breadcrumb?: string[];
}

const PageTitle: React.FC<PageTitleProps> = ({ title
  // , breadcrumb 
}) => {
  return (
    <div style={{ marginBottom: 24 }}>
      {/* <Breadcrumb
        style={{ marginBottom: 8 }}
        items={breadcrumb.map((b) => ({ title: b }))}
      /> */}
      
      <Title
        level={3}
        style={{
          margin: 0,
          fontWeight: 700,
          color: "#FF7506", // màu cam nổi bật giống giao diện mẫu
        }}
      >
        {title}
      </Title>
    </div>
  );
};

export default PageTitle;
