import { config } from "./config";
import { getToken } from "./useApi";

export const ASSIGNMENT_API_URL = `${config.backendUrl}/api/Assignment`;
export const SERVICE_API_URL = `${config.backendUrl}/api/Service`;

// Types cho Service API
export interface Service {
  serviceCode: string;
  serviceName: string;
  description: string | null;
  isInOperation: boolean;
  createdDate: string | null;
}

// Types cho Assignment API
export interface GenerateAssignmentRequest {
  customerName: string;
  customerEmail: string;
  telephone: string;
  serviceCode: string;
  deviceCode: string;
}

export interface GenerateAssignmentResponse {
  code: string;
  customerName: string;
  customerEmail: string;
  telephone: string;
  assignmentDate: string;
  expireDate: string;
  status: number;
  serviceCode: string;
  deviceCode: string;
  service: any;
  device: any;
  createdDate: string;
  updatedDate: string | null;
  deletedDate: string | null;
  createdUser: string | null;
  updatedUser: string | null;
  deletedUser: string | null;
}

export interface AssignmentListRequest {
  page?: number;
  pageSize?: number;
  serviceId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  customerName?: string;
}

export interface AssignmentListResponse {
  data: GenerateAssignmentResponse[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UpdateAssignmentStatusRequest {
  id: string;
  status: "Đang chờ" | "Đã sử dụng" | "Bỏ qua";
}

// Types cho Admin Filter API Response
export interface AdminFilterAssignment {
  code: string;
  customerName: string;
  customerEmail: string;
  telephone: string;
  assignmentDate: string;
  expireDate: string;
  status: number;
  serviceCode: string;
  serviceName: string;
  deviceCode: string;
  createdDate: string;
  updatedDate: string | null;
}

export interface AdminFilterResponse {
  totalItems: number;
  page: number;
  pageSize: number;
  items: AdminFilterAssignment[];
}

export interface AdminFilterRequest {
  page?: number;
  pageSize?: number;
  serviceCode?: string;
  status?: number;
  source?: string;
  startDate?: string;
  endDate?: string;
  keyword?: string;
}

// Service API functions
export const serviceApi = {
  // Lấy danh sách tất cả dịch vụ
  getAll: async (): Promise<Service[]> => {
    const response = await fetch(`${SERVICE_API_URL}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get services: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  },

  // Lấy services đang hoạt động
  getActive: async (): Promise<Service[]> => {
    const allServices = await serviceApi.getAll();
    return allServices.filter(service => service.isInOperation);
  },
};

export const assignmentApi = {
  // Test API call for byrole endpoint
  getByRole: async (): Promise<any> => {
    const response = await fetch(`${ASSIGNMENT_API_URL}/byrole`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get assignments by role: ${response.statusText}`);
    }

    return response.json();
  },

  // Tạo số mới
  generate: async (request: GenerateAssignmentRequest): Promise<GenerateAssignmentResponse> => {
    const response = await fetch(`${ASSIGNMENT_API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate assignment: ${response.statusText}`);
    }

    return response.json();
  },
  
  // Cập nhật trạng thái assignment thành "Đã sử dụng"
  toProcessing: async (code: string): Promise<void> => {
    
    const response = await fetch(`${ASSIGNMENT_API_URL}/to-processing?code=${encodeURIComponent(code)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update assignment to processing: ${response.statusText}`);
    }
  },

  // Cập nhật trạng thái assignment thành "Bỏ qua"
  toNext: async (code: string): Promise<void> => {
    const response = await fetch(`${ASSIGNMENT_API_URL}/to-next?code=${encodeURIComponent(code)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update assignment to next: ${response.statusText}`);
    }
  },

  // Lấy danh sách cấp số cho admin với filter
  adminFilter: async (request: AdminFilterRequest = {}): Promise<AdminFilterResponse> => {
    const params = new URLSearchParams();
    
    if (request.page) params.append("Page", request.page.toString());
    if (request.pageSize) params.append("PageSize", request.pageSize.toString());
    if (request.serviceCode) params.append("ServiceCode", request.serviceCode);
    if (request.status !== undefined) params.append("Status", request.status.toString());
    if (request.source) params.append("Source", request.source);
    if (request.startDate) params.append("StartDate", request.startDate);
    if (request.endDate) params.append("EndDate", request.endDate);
    if (request.keyword) params.append("Keyword", request.keyword);

    const url = params.toString() 
      ? `${ASSIGNMENT_API_URL}/admin-filter?${params.toString()}`
      : `${ASSIGNMENT_API_URL}/admin-filter`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get admin filter assignments: ${response.statusText}`);
    }

    return response.json();
  },
};

// Export default
export default assignmentApi;
