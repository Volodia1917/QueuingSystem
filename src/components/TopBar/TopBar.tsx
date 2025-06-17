import React from "react";
import { Breadcrumb, Col, Flex, Layout, Row } from "antd";
import { useBreadcrumb } from "../Layout/BreadcrumbContext";
import styles from "./TopBar.module.css";
import BreadCrumbContent from "../BreadCrumbContent/BreadCrumbContent";
import UserPage from "./UserPage";
import { UserPart } from "../User/UserPart";

const TopBar: React.FC = () => {

	return (
		<Layout 
			className={styles.container}
		>
			<Flex flex={1} justify="space-between" align="center">

				{/* BreadCrumb */}
				<Col>
					<BreadCrumbContent/>
				</Col>

				{/* User Part */}
				<Col>
					<UserPart/>
				</Col>
			</Flex>
			
		</Layout>
  	);
};

export default TopBar;
