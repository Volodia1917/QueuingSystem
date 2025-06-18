import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import { Col, Flex, Layout, Row } from "antd";
import styles from "./Layout.module.css";

interface ContentLayoutProps {
	title?: string;
	filter?: React.ReactNode;
	button?: React.ReactNode;
	children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
	title,
	filter,
	button,
	children,
}) => {
	return (
		<>
			<Col className={styles.content}>
				<Flex vertical gap={16}>
					{/* Title */}
					{title && (
						<Row>
							<PageTitle title={title} />
						</Row>
					)}

					{/* Filter */}
					{filter && <Row>{filter}</Row>}

					{/* Table */}
					<Row>{children}</Row>
				</Flex>
			</Col>
			<Col className={styles.float_button}>{button}</Col>
		</>
	);
};

export default ContentLayout;
