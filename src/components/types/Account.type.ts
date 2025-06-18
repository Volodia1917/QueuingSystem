export interface Account {
  id: string;
  email: string;
  fullName: string;
  telephone: string;
  userRole: string;
  status: string;

  password?: string; // thêm nếu cần dùng
  confirmPassword?: string; // thêm nếu cần dùng
  stt?: string;
  name?: string;
  service?: string;
  timeIssued?: string;
  expiry?: string;
  source?: string;
  issueTime?: string;
  expiryTime?: string;
  issuer?: string; 
}


