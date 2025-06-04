import React, { useState } from "react";
import { DeviceList } from "./DeviceList";
import { AddDeviceForm } from "./AddDeviceForm";
import { EditDeviceForm } from "./EditDeviceForm";
import { DeviceDetail } from "./DeviceDetail";

type ViewType = "list" | "add" | "edit" | "detail";

interface DeviceData {
  key: string;
  deviceCode: string;
  deviceName: string;
  ipAddress: string;
  activeStatus: "active" | "inactive";
  connectionStatus: "connected" | "disconnected";
  services: string;
}

export const DeviceDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);

  const handleAddDevice = () => {
    setCurrentView("add");
  };

  const handleViewDetail = (device: DeviceData) => {
    setSelectedDevice(device);
    setCurrentView("detail");
  };

  const handleUpdateDevice = (device: DeviceData) => {
    setSelectedDevice(device);
    setCurrentView("edit");
  };

  const handleCancel = () => {
    setSelectedDevice(null);
    setCurrentView("list");
  };

  const handleSubmit = (deviceData: any) => {
    console.log("Device data submitted:", deviceData);
    setCurrentView("list");
  };

  const handleEdit = () => {
    setCurrentView("edit");
  };

  switch (currentView) {
    case "add":
      return <AddDeviceForm onCancel={handleCancel} onSubmit={handleSubmit} />;

    case "edit":
      return (
        <EditDeviceForm
          deviceData={selectedDevice}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      );

    case "detail":
      return (
        <DeviceDetail
          deviceData={selectedDevice}
          onEdit={handleEdit}
          onBack={handleCancel}
        />
      );

    default:
      return (
        <DeviceList
          onAddDevice={handleAddDevice}
          onViewDetail={handleViewDetail}
          onUpdateDevice={handleUpdateDevice}
        />
      );
  }
};

export default DeviceDemo;
