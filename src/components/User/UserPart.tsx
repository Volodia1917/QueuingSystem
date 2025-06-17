import { Avatar, Button, Flex } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Icons } from "../Icons/Icons";
import styles from "./UserPart.module.css";


const { Text } = Typography;

export const UserPart = () => {
  return (
    <>
      <Flex
        align="center"
        justify="flex-end"
        gap={12}
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
            <Button className={styles.user_avatar}>
              <Avatar
                src={localStorage.getItem("avatar")}
                icon={<UserOutlined />}
                alt="Avatar User"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Button>
            <div>
              <Text style={{ fontSize: "12px", color: "#7E7E7E" }}>
                Xin chào
              </Text>
              <Text strong style={{ display: "block", fontSize: "14px" }}>
                {localStorage.getItem("userFullName")}
              </Text>
            </div>
          </Flex>

      </Flex>
    </>
  );
};
