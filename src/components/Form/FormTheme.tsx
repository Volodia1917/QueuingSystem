import { ConfigProviderProps } from "antd";

const FormTheme: ConfigProviderProps = {
    theme: {
        token:{
            fontSize: 18,                           // Kích cỡ chữ mặc định
            colorPrimary: "#FF9138",                // Màu mặc định cho các button có type = primary
            borderRadius: 8                         // Đường cong viền mặc định
        },

        components: {
            Form:{
                itemMarginBottom: 16,               // Khoảng cách giữa các FormItem
                labelColor: "#37474F"               // Màu mặc định cho label
            },
            Input: {
                colorTextPlaceholder: "#535261"     // Màu mặc định cho Text trong Input
            },
            Button: {
                
                // Định dạng cho type = default
                colorText: "#FF9138",               // Màu chữ 
                colorBorder: "#FF9138",             // Màu đường viền
                fontSize: 16,

                // Định dạng cho type = primary
                colorPrimary: "#FF9138",
                colorPrimaryActive: "#FF9138",
                colorPrimaryHover: "#FF9138",

                // Định dạng cho type = link

                colorLink: "#E73F3F",
                colorLinkActive: "#E73F3F",
                colorLinkHover: "#E73F3F"
            },
            Alert: {
                colorText: "#E73F3F",
                fontSize: 14,
            },
            Typography: {
                fontSizeHeading1: 22
            }


        }
    }
}

export default FormTheme;