import { Alert, Button, Flex, Typography } from "antd";
import { ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const Errors = ({
  error,
  onRetry,
  loading,
  isRefreshingToken,
  retryCount,
}: {
  error: string;
  onRetry: () => void;
  loading: boolean;
  isRefreshingToken: boolean;
  retryCount: number;
}) => {
  return (
    <div>
      <Alert
        message="Lỗi tải dữ liệu"
        description={
          <Flex vertical gap="small">
            <Text>{error}</Text>
            <Flex gap="small">
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                size="small"
                onClick={onRetry}
                loading={loading || isRefreshingToken}
                disabled={isRefreshingToken}
              >
                {isRefreshingToken ? "Đang làm mới..." : "Thử lại"}
              </Button>
              {retryCount > 0 && (
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Đã thử lại {retryCount} lần
                </Text>
              )}
            </Flex>
          </Flex>
        }
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{
          marginBottom: "16px",
          borderRadius: "8px",
        }}
        closable
        onClose={onRetry}
      />
    </div>
  );
};
