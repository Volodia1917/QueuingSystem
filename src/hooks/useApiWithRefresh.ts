import { useState, useCallback } from "react";
import { handleError } from "../libraries/useApi";

interface UseApiWithRefreshReturn {
  loading: boolean;
  error: string | null;
  isRefreshingToken: boolean;
  executeWithRefresh: <T>(apiCall: () => Promise<T>) => Promise<T | null>;
  clearError: () => void;
  retryCount: number;
}

export const useApiWithRefresh = (): UseApiWithRefreshReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRefresh = useCallback(async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiCall();
      setRetryCount(0);
      return result;
    } catch (error: any) {
      console.error("API call error:", error);

      // Handle error with potential token refresh
      if (error?.response?.status === 401 && !isRefreshingToken) {
        setIsRefreshingToken(true);
        setError("Đang làm mới phiên đăng nhập...");

        return new Promise((resolve) => {
          handleError(
            error,
            async () => {
              // Callback after successful token refresh
              try {
                setIsRefreshingToken(false);
                setError(null);
                setRetryCount((prev) => prev + 1);

                const retryResult = await apiCall();
                resolve(retryResult);
              } catch (retryError) {
                const errorMessage = handleError(retryError as any);
                setError(errorMessage);
                setIsRefreshingToken(false);
                resolve(null);
              }
            },
            () => {
              setIsRefreshingToken(false);
              setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
              resolve(null);
            }
          );
        });
      } else {
        const errorMessage = handleError(error);
        setError(errorMessage);
        return null;
      }
    } finally {
      setLoading(false);
    }
  }, [isRefreshingToken]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    isRefreshingToken,
    executeWithRefresh,
    clearError,
    retryCount,
  };
}; 