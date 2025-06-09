import { ConfigProvider, Flex, Image, Layout, Row } from "antd";
import React from "react";
import styles from "./WelcomeLayout.module.css";
import WelcomeLayoutTheme from "./WelcomeLayoutTheme";

const WelcomeLayout: React.FC = () => {
    return (
        <ConfigProvider {...WelcomeLayoutTheme}>
            <Flex flex="1" className={styles.welcome_wrapper}>
                <Image
                    src="./images/Frame.png"
                    alt="Welcome Image"
                    preview={false}
                />
            </Flex>
        </ConfigProvider>
    );
}

export default WelcomeLayout;