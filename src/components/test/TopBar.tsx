import React from "react";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import { Breadcrumb } from "antd";

const TopBar: React.FC = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <div>
      <Breadcrumb separator=">">
        {breadcrumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.onClick ? (
              <a onClick={item.onClick}>{item.title}</a>
            ) : (
              item.title
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default TopBar;
