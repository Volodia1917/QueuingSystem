import React, { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Flex,
  Divider,
} from "antd";
import { MainContentLayout } from "../Layout/MainContentLayout";
import { Icons } from "../Icons/Icons";
import "./ServiceList.css";
import TableCustom, { PaginationConfig } from "../Table/TableCustom";
import { FloatingButtonGroup } from "../FloatButtonCustom/FloatButtonGroup";

const { Title } = Typography;
const { Option } = Select;

interface ServiceRule {
  autoIncrement: {
    from: string;
    to: string;
  };
  prefix: string;
  resetDaily: boolean;
  example: string;
}

interface NumberRecord {
  key: string;
  number: string;
  status: "completed" | "waiting" | "absent";
  statusText: string;
}

interface ServiceDetailProps {
  service: {
    serviceCode: string;
    serviceName: string;
    description: string;
    status: "active" | "inactive";
    rules?: ServiceRule;
  };
  onBack: () => void;
  onEdit: () => void;
}

const ServiceInfoAndRules: React.FC<{
  service: ServiceDetailProps["service"];
}> = ({ service }) => {
  const defaultRules: ServiceRule = {
    autoIncrement: {
      from: "0001",
      to: "9999",
    },
    prefix: "0001",
    resetDaily: true,
    example: "201-2001",
  };

  const rules = service.rules || defaultRules;

  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        border: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Phần thông tin dịch vụ */}
      <div style={{ flex: 1 }}>
        <Title
          level={3}
          style={{
            color: "#ff7506",
            marginBottom: "24px",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Thông tin dịch vụ
        </Title>

        <Row gutter={[0, 3]}>
          <Col span={24}>
            <Flex align="center" gap={12}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#535261",
                  fontSize: "16px",
                  minWidth: "120px",
                }}
              >
                Mã dịch vụ:
              </span>
              <span
                style={{
                  color: "#535261",
                  fontSize: "16px",
                  padding: "8px 0",
                }}
              >
                {service.serviceCode}
              </span>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" gap={12}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#535261",
                  fontSize: "16px",
                  minWidth: "120px",
                }}
              >
                Tên dịch vụ:
              </span>
              <span
                style={{
                  color: "#535261",
                  fontSize: "16px",
                  padding: "8px 0",
                }}
              >
                {service.serviceName}
              </span>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" gap={12}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#535261",
                  fontSize: "16px",
                  minWidth: "120px",
                }}
              >
                Mô tả:
              </span>
              <span
                style={{
                  color: "#535261",
                  fontSize: "16px",
                  padding: "8px 0",
                }}
              >
                {service.description}
              </span>
            </Flex>
          </Col>
        </Row>
      </div>

      {/* Divider */}
      <Divider style={{ margin: "24px 0" }} />

      {/* Phần quy tắc cấp số */}
      <div style={{ flex: 1 }}>
        <Title
          level={4}
          style={{
            color: "#ff7506",
            marginBottom: "24px",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Quy tắc cấp số
        </Title>

        <Flex gap={16} vertical>
          <Flex align="center" gap={8}>
            <span
              style={{
                fontWeight: 600,
                color: "#535261",
                minWidth: "120px",
              }}
            >
              Tăng tự động từ:
            </span>
            <span
              style={{
                color: "#535261",
                fontWeight: 500,
              }}
            >
              {rules.autoIncrement.from}
            </span>
            <span
              style={{
                color: "#535261",
                margin: "0 4px",
              }}
            >
              đến
            </span>
            <span
              style={{
                color: "#535261",
                fontWeight: 500,
              }}
            >
              {rules.autoIncrement.to}
            </span>
          </Flex>

          <Flex align="center" gap={8}>
            <span
              style={{
                fontWeight: 600,
                color: "#535261",
                minWidth: "120px",
              }}
            >
              Prefix:
            </span>
            <span
              style={{
                color: "#535261",
                fontWeight: 500,
              }}
            >
              {rules.prefix}
            </span>
          </Flex>

          <Flex align="center" gap={8}>
            <span
              style={{
                fontWeight: 600,
                color: "#535261",
                minWidth: "120px",
              }}
            >
              {rules.resetDaily ? "Reset mỗi ngày" : "Không reset hàng ngày"}
            </span>
          </Flex>

          <Flex align="center" gap={8}>
            <span
              style={{
                fontWeight: 600,
                color: "#535261",
                minWidth: "120px",
              }}
            >
              Ví dụ:
            </span>
            <span
              style={{
                color: "#535261",
                fontWeight: 500,
              }}
            >
              {rules.example}
            </span>
          </Flex>
        </Flex>
      </div>
    </Card>
  );
};

const FilterSection: React.FC<{
  onStatusChange?: (status: string) => void;
  onDateChange?: (date: any) => void;
  onSearch?: (keyword: string) => void;
}> = ({ onStatusChange, onDateChange, onSearch }) => (
  <Flex
    gap={16}
    vertical
    style={{
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      marginBottom: "16px",
    }}
  >
    <Row gutter={[16, 16]} align="middle">
      <Col span={6}>
        <div>
          <span
            style={{
              fontWeight: 600,
              color: "#282828",
              marginBottom: "8px",
              fontSize: "16px",
              display: "block",
            }}
          >
            Trạng thái
          </span>
          <Select
            size="large"
            defaultValue="all"
            style={{
              width: "100%",
            }}
            placeholder="Tất cả"
            onChange={onStatusChange}
          >
            <Option value="all">Tất cả</Option>
            <Option value="completed">Đã hoàn thành</Option>
            <Option value="waiting">Đang thực hiện</Option>
            <Option value="absent">Vắng</Option>
          </Select>
        </div>
      </Col>
      <Col span={6}>
        <div>
          <span
            style={{
              fontWeight: 600,
              color: "#282828",
              marginBottom: "8px",
              fontSize: "16px",
              display: "block",
            }}
          >
            Chọn thời gian
          </span>
          <DatePicker
            style={{
              width: "100%",
            }}
            placeholder="10/10/2021"
            onChange={onDateChange}
          />
        </div>
      </Col>
      <Col span={6}>
        <div>
          <span
            style={{
              fontWeight: 600,
              color: "#282828",
              marginBottom: "8px",
              fontSize: "16px",
              display: "block",
            }}
          >
            Từ khóa
          </span>
          <Input.Search
            placeholder="Nhập từ khóa"
            style={{
              width: "100%",
            }}
            onSearch={onSearch}
          />
        </div>
      </Col>
    </Row>
  </Flex>
);

const NumberListTable: React.FC<{
  data?: NumberRecord[];
  loading?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
  pagination?: PaginationConfig;
}> = ({ data, loading = false, onPageChange, pagination }) => {
  const defaultData: NumberRecord[] = [
    {
      key: "1",
      number: "2010001",
      status: "completed",
      statusText: "Đã hoàn thành",
    },
    {
      key: "2",
      number: "2010002",
      status: "completed",
      statusText: "Đã hoàn thành",
    },
    {
      key: "3",
      number: "2010003",
      status: "waiting",
      statusText: "Đang thực hiện",
    },
    { key: "4", number: "2010004", status: "absent", statusText: "Vắng" },
    {
      key: "5",
      number: "2010005",
      status: "completed",
      statusText: "Đã hoàn thành",
    },
    {
      key: "6",
      number: "2010006",
      status: "waiting",
      statusText: "Đang thực hiện",
    },
    { key: "7", number: "2010007", status: "absent", statusText: "Vắng" },
    {
      key: "8",
      number: "2010008",
      status: "completed",
      statusText: "Đã hoàn thành",
    },
  ];

  const defaultPagination = {
    current: 1,
    total: 50,
    pageSize: 8,
    align: "end" as const,
    onChange: (page: number, pageSize: number) => {
      console.log("Page changed:", page, pageSize);
      onPageChange?.(page, pageSize);
    },
    style: {
      marginTop: "16px",
    },
  };

  const tableData = data || defaultData;
  const paginationConfig = pagination || defaultPagination;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#34cd79";
      case "waiting":
        return "#4277ff";
      case "absent":
        return "#ec3740";
      default:
        return "#535261";
    }
  };

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "number",
      key: "number",
      align: "center" as const,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string, record: NumberRecord) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "8px",
            marginLeft: "10px",
            paddingLeft: "10px",
            fontSize: "14px",
            fontWeight: 500,
            color: getStatusColor(status),
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              display: "inline-block",
              backgroundColor: getStatusColor(status),
            }}
          />
          {record.statusText}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div>
        <TableCustom
          columns={columns}
          data={tableData}
          pagination={paginationConfig}
          loading={loading}
          size="middle"
          style={{
            borderRadius: "0",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  service,
  onBack,
  onEdit,
}) => {
  const [filters, setFilters] = useState({
    status: "all",
    date: null,
    keyword: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 50,
    pageSize: 8,
  });
  const [loading, setLoading] = useState(false);
  const [numberData, setNumberData] = useState<NumberRecord[]>();

  const handleRefresh = () => {
    console.log("Refreshing data...");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status }));
    console.log("Status filter changed:", status);
  };

  const handleDateChange = (date: any) => {
    setFilters((prev) => ({ ...prev, date }));
    console.log("Date filter changed:", date);
  };

  const handleSearch = (keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword }));
    console.log("Search keyword:", keyword);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
    console.log("Page changed:", page, pageSize);
  };

  return (
    <MainContentLayout title="Quản lý dịch vụ">
      <Row gutter={24} style={{ height: "100%" }}>
        <Col span={8} style={{ height: "100%" }}>
          <ServiceInfoAndRules service={service} />
        </Col>

        <Col span={16} style={{ height: "100%" }}>
          <Card
            style={{
              borderRadius: "12px",
              border: "none",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              marginRight: "33px",
            }}
          >
            <FilterSection
              onStatusChange={handleStatusChange}
              onDateChange={handleDateChange}
              onSearch={handleSearch}
            />
            <div style={{ flex: 1 }}>
              <NumberListTable
                data={numberData}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <FloatingButtonGroup
        items={[
          {
            icon: <Icons.Edit width="28" height="28" />,
            label: "Cập nhật danh sách",
            onClick: handleRefresh,
            backgroundColor: "#ff9138",
          },
          {
            icon: <Icons.Back width="24" height="24" />,
            label: "Quay lại",
            onClick: onBack,
            backgroundColor: "#ff9138",
          },
        ]}
      />
    </MainContentLayout>
  );
};
