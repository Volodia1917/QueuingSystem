import { ConfigProviderProps } from "antd";

const LefSideBarTheme: ConfigProviderProps = {
  theme: {
    token: {
      colorText: "#000",
    },
    components: {
      Menu: {
        // Background
        itemBg: "#fff",
        itemSelectedBg: "#FF7506",
        itemActiveBg: "#FFF2E7",
        itemHoverBg: "#FFF2E7",

        // Text
        itemSelectedColor: "#FFF",
        itemHoverColor: "#000",
        subMenuItemSelectedColor: "#000",
      },
    },
  },
};

export default LefSideBarTheme;