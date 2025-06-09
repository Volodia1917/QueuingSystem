import { useCallback } from "react";
import {
  useBreadcrumb,
  BreadcrumbItem,
} from "../components/Layout/BreadcrumbContext";

export const useBreadcrumbNavigation = () => {
  const { setBreadcrumbs } = useBreadcrumb();

  const setDeviceBreadcrumb = useCallback(
    (
      currentPage: "list" | "add" | "edit" | "detail",
      onNavigateToList?: () => void
    ) => {
      const baseBreadcrumbs: BreadcrumbItem[] = [
        {
          title: "Thiết bị",
          onClick: onNavigateToList,
        },
      ];

      switch (currentPage) {
        case "list":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Danh sách thiết bị" }]);
          break;
        case "add":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Thêm thiết bị" }]);
          break;
        case "edit":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Cập nhật thiết bị" }]);
          break;
        case "detail":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Chi tiết thiết bị" }]);
          break;
      }
    },
    [setBreadcrumbs]
  );

  const setServiceBreadcrumb = useCallback(
    (
      currentPage: "list" | "add" | "edit" | "detail",
      onNavigateToList?: () => void
    ) => {
      const baseBreadcrumbs: BreadcrumbItem[] = [
        {
          title: "Dịch vụ",
          onClick: onNavigateToList,
        },
      ];

      switch (currentPage) {
        case "list":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Danh sách dịch vụ" }]);
          break;
        case "add":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Thêm dịch vụ" }]);
          break;
        case "edit":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Cập nhật dịch vụ" }]);
          break;
        case "detail":
          setBreadcrumbs([...baseBreadcrumbs, { title: "Chi tiết dịch vụ" }]);
          break;
      }
    },
    [setBreadcrumbs]
  );

  const setCustomBreadcrumb = useCallback(
    (breadcrumbs: BreadcrumbItem[]) => {
      setBreadcrumbs(breadcrumbs);
    },
    [setBreadcrumbs]
  );

  return {
    setDeviceBreadcrumb,
    setServiceBreadcrumb,
    setCustomBreadcrumb,
  };
};
