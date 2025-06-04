import React, { useState } from "react";
import { ServiceList } from "./ServiceList";
import { AddService } from "./AddService";
import { ServiceDetail } from "./ServiceDetail";
import { UpdateService } from "./UpdateService";

interface ServiceData {
  key: string;
  serviceCode: string;
  serviceName: string;
  description: string;
  status: "active" | "inactive";
}

type ViewType = "list" | "add" | "detail" | "edit" | "queue";

export const ServiceStatus: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );

  const handleAddService = () => {
    setCurrentView("add");
  };

  const handleViewDetail = (service: ServiceData) => {
    setSelectedService(service);
    setCurrentView("detail");
  };

  const handleUpdateService = (service: ServiceData) => {
    setSelectedService(service);
    setCurrentView("edit");
      // Ví dụ data nhận được:
  // {
  //   serviceCode: "201",
  //   serviceName: "Khám tim mạch", 
  //   description: "Dịch vụ khám tim mạch chuyên sâu",
  //   autoFrom: "0001",
  //   autoTo: "9999", 
  //   prefixValue: "KTM",
  //   suffixValue: "2024",
  //   autoIncrement: true,
  //   prefix: "KTM",        // null nếu checkbox không check
  //   suffix: "2024",       // null nếu checkbox không check  
  //   resetDaily: false
  // }
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedService(null);
  };

  const handleSubmitService = (data: any) => {
    console.log("Service data submitted:", data);
    setCurrentView("list");
  };

  const handleEditService = () => {
    setCurrentView("edit");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "add":
        return (
          <AddService
            onCancel={handleBackToList}
            onSubmit={handleSubmitService}
          />
        );
      case "edit":
        return (
          <UpdateService
            onCancel={handleBackToList}
            onSubmit={handleUpdateService}
          />
        );

      case "detail":
        return selectedService ? (
          <ServiceDetail
            service={selectedService}
            onBack={handleBackToList}
            onEdit={handleEditService}
          />
        ) : null;

      case "list":
      default:
        return (
          <ServiceList
            onAddService={handleAddService}
            onViewDetail={handleViewDetail}
            onUpdateService={handleUpdateService}
          />
        );
    }
  };

  return <>{renderCurrentView()}</>;
};
