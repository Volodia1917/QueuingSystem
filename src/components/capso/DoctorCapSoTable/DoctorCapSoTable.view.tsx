import React from "react";
import { Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AdminFilterAssignment } from "../../../libraries/assignmentApi";
import { formatDateTime, getStatusText, getStatusColor } from "../utils/capso.utils";
import styles from "../CapSoRow/CapSoRow.module.css";

interface DoctorCapSoTableProps {
    data: AdminFilterAssignment[];
    loading?: boolean;
    onExamine: (capSo: AdminFilterAssignment) => void;
    onSkip: (capSo: AdminFilterAssignment) => void;
    // Pagination props
    currentPage?: number;
    totalItems?: number;
    pageSize?: number;
    onPageChange?: (page: number, size?: number) => void;
}

const DoctorCapSoTable: React.FC<DoctorCapSoTableProps> = ({
    data,
    loading = false,
    onExamine,
    onSkip,
    currentPage = 1,
    totalItems = 0,
    pageSize = 10,
    onPageChange
}) => {
    const columns: ColumnsType<AdminFilterAssignment> = [
        {
            title: "STT",
            dataIndex: "code",
            key: "code",
            align: "center" as const,
            className: styles.cell,
            width: 80,
            fixed: 'left' as const,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
            align: "left" as const,
            className: styles.cell,
            width: 150,
            ellipsis: true,
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "serviceName",
            key: "serviceName",
            align: "left" as const,
            className: styles.cell,
            width: 120,
            ellipsis: true,
        },
        {
            title: "Thời gian cấp",
            dataIndex: "assignmentDate",
            key: "assignmentDate",
            align: "center" as const,
            className: styles.cell,
            width: 130,
            render: (dateString: string) => formatDateTime(dateString),
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "expireDate",
            key: "expireDate",
            align: "center" as const,
            className: styles.cell,
            width: 130,
            render: (dateString: string) => formatDateTime(dateString),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            className: styles.cell,
            width: 100,
            render: (status: number) => {
                const statusText = getStatusText(status);
                const color = getStatusColor(status);

                return (
                    <span className={styles.status}>
                        <span
                            className={styles.dot}
                            style={{ backgroundColor: color }}
                        ></span>
                        {statusText}
                    </span>
                );
            },
        },
        {
            title: "Nguồn cấp",
            dataIndex: "deviceCode",
            key: "deviceCode",
            align: "center" as const,
            className: styles.cell,
            width: 100,
            ellipsis: true,
        },
        {
            title: "Hành động",
            key: "action",
            align: "center" as const,
            className: styles.cell,
            width: 120,
            fixed: 'right' as const,
            render: (_, record) => {
                // Only show actions for "Đang chờ" status (status = 1)
                if (record.status === 1) {
                    return (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => onExamine(record)}
                                style={{
                                    padding: '4px 8px',
                                    height: '24px',
                                    minWidth: '40px'
                                }}
                            >
                                Khám
                            </Button>
                            <Button
                                danger
                                size="small"
                                onClick={() => onSkip(record)}
                                style={{
                                    padding: '4px 6px',
                                    height: '24px',
                                    minWidth: '40px'
                                }}
                            >
                                Bỏ qua
                            </Button>
                        </div>
                    );
                }
                return <span>-</span>;
            },
        },
    ];

    return (<Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="code"
        pagination={
            onPageChange ? {
                current: currentPage,
                total: totalItems,
                pageSize: pageSize,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
                onChange: onPageChange,
            } : false
        }
        bordered
        className={styles.table}
        scroll={{ x: 'max-content', y: 600 }}
        rowClassName={(_, index) =>
            index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
    />
    );
};

export default DoctorCapSoTable;
