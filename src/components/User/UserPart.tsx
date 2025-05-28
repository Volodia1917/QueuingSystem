import { Avatar, Button, Flex } from "antd";
import React from "react";
import { Icons } from '../Icons/Icons';
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

export const UserPart = () => {
  return (
    <>
      <Flex
        align="center"
        justify="flex-end"
        gap={12}
        style={{ marginBottom: "16px" }}
      >
        <Button
          type="text"
          icon={<Icons.NotificationBell />}
          style={{
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Flex align="center" gap={12}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1.5px solid #FF7A00",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            <Avatar
              size={40}
              src="/images/user.jpg"
              icon={<UserOutlined />}
              alt="Avatar User"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div>
            <Text style={{ fontSize: "12px", color: "#7E7E7E" }}>Xin chào</Text>
            <Text strong style={{ display: "block", fontSize: "14px" }}>
              Lê Quỳnh Ái Vân
            </Text>
          </div>
        </Flex>
      </Flex>
    </>
  );
};
