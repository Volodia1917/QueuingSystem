import React from "react";
import { Breadcrumb, ConfigProvider } from "antd";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import styles from "./BreadCrumbContent.module.css";
import BreadCrumbTheme from "./BreadCrumb.theme";

const BreadCrumbContent: React.FC = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ConfigProvider {...BreadCrumbTheme}>
      <div>
        <Breadcrumb className={styles.content} separator=">">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Breadcrumb.Item key={index}>
                {item.onClick && !isLast ? (
                  <a onClick={item.onClick}>{item.title}</a>
                ) : (
                  <span>{item.title}</span>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    </ConfigProvider>
  );
};

export default BreadCrumbContent;
