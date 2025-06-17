import { Result, Button} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Login from "./pages/login/Login.view";
import { BreadcrumbProvider } from "./components/Layout/BreadcrumbContext";
import MainLayout from "./components/Layouts/MainLayout";

function App() {
  // const [selectMenu, setSelectedMenu] = useState<MenuKey>(MENU_KEYS.DASHBOARD);
  // const userRole: UserRole = getUserRole();

  // useEffect(() => {
  //   const defaultMenu = getDefaultMenuForRole(userRole);
  //   setSelectedMenu(defaultMenu);
  // }, [userRole]);

  // const receiveSelectedMenu = (index: MenuKey) => {
  //   if (!checkMenuAccess(index, userRole)) {
  //     return;
  //   }

  //   setSelectedMenu(index);
  // };

  // const renderContent = () => {
  //   if (!checkMenuAccess(selectMenu, userRole)) {
  //     return (
  //       <AccessDenied
  //         onBackToHome={() => {
  //           const defaultMenu = getDefaultMenuForRole(userRole);
  //           setSelectedMenu(defaultMenu);
  //         }}
  //       />
  //     );
  //   }

  return localStorage.getItem("isLogined") != "true" ? (
    <Login />
  ) : (
    <BreadcrumbProvider>
      <MainLayout />
    </BreadcrumbProvider>
  );
}
export const AccessDenied: React.FC<{
  title?: string;
  subTitle?: string;
  onBackToHome?: () => void;
}> = ({ title, subTitle, onBackToHome }) => {
  return (
    <Result
      icon={<ExclamationCircleOutlined style={{ color: "#faad14" }} />}
      title={title}
      subTitle={subTitle}
      extra={
        onBackToHome && (
          <Button type="primary" onClick={onBackToHome}>
            Về trang chủ
          </Button>
        )
      }
    />
  );
};

export default App;
