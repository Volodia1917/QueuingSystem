import { CustomBreadcrumb } from "../Layout/CustomBreadcrumb";

export const DashboardHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <CustomBreadcrumb
          size="medium"
          style={{ margin: 0, color: "#FF7506" }}
          items={[{ title: "Dashboard" }]}
        />
      </div>
    </div>
  );
};
