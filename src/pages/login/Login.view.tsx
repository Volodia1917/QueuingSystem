import { Col, Flex, Image, Row } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";
import Form from "../../components/Form/Form";
import WelcomeLayout from "../../components/WelcomeLayout/WelcomeLayout";
import WelcomeLayoutWithText from "../../components/WelcomeLayout/WelcomeLayoutWithText";

const Login: React.FC = () => {
	const [pageMode, setPageMode] = useState<string>('login');

	return (
    <Row wrap={false} className={styles.container}>
      {/* Layout bên trái */}
      <Col flex="0 0 41%" className={styles.left}>
        <Flex className={styles.left_wrapper} gap="75px" vertical>
          {/* Logo */}
          <Row justify={"center"}>
            <Image
              src="images/Logo.png"
              alt="Logo Alta-Software"
              preview={false}
            />
          </Row>

          {/* Form Layout */}
          <Row className={styles.form_container}>
            <Form pageMode={setPageMode} />
          </Row>
        </Flex>
      </Col>

      {/* Layout bên phải */}
      <Col flex="1" className={styles.right}>
        <Row align={"middle"} className={styles.welcome}>
			{pageMode === "login"? (
				<WelcomeLayoutWithText />
			) : (
				<WelcomeLayout />
			)}
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
