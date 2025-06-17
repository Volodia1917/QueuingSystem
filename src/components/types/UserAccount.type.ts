export interface UserAccount {
    Email?: string;
    Password?: string;
    ConfirmPassword?: string;
    FullName?: string;
    Telephone?: string;
    UserRole?: string;
    Note?: string;
    Avatar?: File; // nếu có file thì dùng kiểu File
    ServiceCode?: string;
    CreatedDate?: string;
    UpdatedDate?: string;
    DeletedDate?: string;
    CreatedUser?: string;
    UpdatedUser?: string;
    DeletedUser?: string;
}
  