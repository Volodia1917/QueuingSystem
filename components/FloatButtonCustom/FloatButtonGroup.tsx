import { Divider, Space } from "antd";

import { Card } from "antd";
import React from "react";

export const MIN_WIDTH_OF_FLOAT_BUTTON = 100;

export interface FloatingButtonItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  backgroundColor?: string;
}

export const FloatingButtonGroup: React.FC<{
  items: FloatingButtonItem[];
  position?: {
    right?: string;
    top?: string;
    transform?: string;
  };
}> = ({
  items,
  position = {
    right: "24px",
    top: "50%",
    transform: "translateY(-50%)",
  },
}) => {
  const SingleButton: React.FC<FloatingButtonItem> = ({
    icon,
    label,
    onClick,
    backgroundColor = "#ff9138",
  }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: "16px 1px",
      }}
      onMouseEnter={(e) => {
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = "scale(1.1)";
          iconContainer.style.boxShadow = `0 6px 20px ${backgroundColor}80`;
        }
      }}
      onMouseLeave={(e) => {
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = "scale(1)";
          iconContainer.style.boxShadow = `0 4px 12px ${backgroundColor}66`;
        }
      }}
      onMouseDown={(e) => {
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = "scale(0.95)";
        }
      }}
      onMouseUp={(e) => {
        const iconContainer = e.currentTarget.querySelector(
          ".icon-container"
        ) as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = "scale(1.1)";
        }
      }}
    >
      {/* Icon Container */}
      <div
        className="icon-container"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 12px ${backgroundColor}66`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "none",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: backgroundColor,
          textAlign: "center",
          lineHeight: "16px",
          maxWidth: "80px",
          wordWrap: "break-word",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: position.right,
        top: position.top,
        transform: position.transform,
        zIndex: 1000,
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
        padding: 0,
        minWidth: `${MIN_WIDTH_OF_FLOAT_BUTTON}px`,
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <SingleButton {...item} />
          {index < items.length - 1 && (
            <Divider
              style={{
                margin: 0,
                borderColor: "#f0f0f0",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Space>
  );
};
