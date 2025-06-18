export const VIEW_KEYS = {
    SYSTEM_SETTINGS: "Cài đặt hệ thống",
    ACCOUNT_MANAGEMENT: "Quản lý tài khoản",
    ADD_USER: "Thêm tài khoản",
} as const;

export type ViewKeys = (typeof VIEW_KEYS)[keyof typeof VIEW_KEYS];