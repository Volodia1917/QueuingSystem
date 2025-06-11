import { API_URL, getToken } from "./useApi";

export const updateUser = async (email: string, formValues: Record<string, any>) => {

    const token = getToken();
    if (!token) throw new Error("Token không tồn tại");

    const formData = new FormData();

    // Duyệt qua các key trong formValues và append nếu có
    Object.entries(formValues).forEach(([key, value]) => {
        if (
            key !== "Email" && // bỏ qua email
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            formData.append(key, value);
        }
    });

    try {
        const response = await fetch(`${API_URL}/User/${email}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Cập nhật thành công:", data);
        } else {
            console.error("Lỗi cập nhật:", data.message);
        }

        return data;
        
    } catch (err) {
        console.error("Lỗi kết nối:", err);
    }

};
