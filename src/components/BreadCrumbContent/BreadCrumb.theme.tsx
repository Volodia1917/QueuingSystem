import { ConfigProviderProps } from "antd";

const BreadCrumbTheme: ConfigProviderProps = {
  theme: {
    token: {
      colorText: "#7E7D88",
      fontSize: 20,
    },
    components: {
      Breadcrumb: {
        colorText: "#FF7506",

        colorInfoHover: "#7E7D88",
        linkHoverColor: "#7E7D88",
        colorBgTextHover: "none",
      },
    },
  },
};

export default BreadCrumbTheme