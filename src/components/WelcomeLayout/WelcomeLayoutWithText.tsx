import React from "react";
import { ConfigProvider, Flex, Image, Row, Typography } from "antd";
import styles from "./WelcomeLayout.module.css";
import WelcomeLayoutTheme from "./WelcomeLayoutTheme";

const {Paragraph} = Typography;

const WelcomeLayoutWithText: React.FC = () => {
    return (
      <ConfigProvider {...WelcomeLayoutTheme}>
        <Flex flex="1" className={styles.welcome_wrapper}>
            <Image
              src="./images/welcome.png"
              alt="Welcome Image"
              preview={false}
            />

          <Flex vertical className={styles.welcome_title}>
            <Paragraph className={styles.welcome_title_item}>
              Hệ thống
            </Paragraph>
            <Paragraph
              style={{ fontWeight: 900 }}
              className={styles.welcome_title_item}
            >
              QUẢN LÝ XẾP HÀNG
            </Paragraph>
          </Flex>
        </Flex>
      </ConfigProvider>
    );
}

export default WelcomeLayoutWithText;