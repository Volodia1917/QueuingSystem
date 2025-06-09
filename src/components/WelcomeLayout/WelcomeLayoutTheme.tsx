import { ConfigProviderProps } from "antd";
import React from "react";

const WelcomeLayoutTheme: ConfigProviderProps = {
	theme: {
		components: {
			Typography: {
				fontSize: 36,
				colorText: "#FF7506",
			},
		},
	},
};

export default WelcomeLayoutTheme;
