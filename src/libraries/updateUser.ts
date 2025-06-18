import { API_URL, getToken } from "./useApi";
import { UserAccount } from "../components/types/UserAccount.type";

export const updateUser = async (email: string, values: UserAccount) => {
    const formData = new FormData();

    (
        Object.keys(values) as (keyof UserAccount)[]
    ).forEach((key) => {
        const value = values[key];
        if (value !== undefined && value !== null && typeof value !== "object") {
            formData.append(key, value.toString());
        }
      });

    if (values.Avatar instanceof File) {
        formData.append("Avatar", values.Avatar);
    }

    formData.forEach((value, key) => {
        console.log("formData:", key, value);
      });

    const response = await fetch(`${API_URL}/User/${email}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return response.text(); // fallback nếu không phải JSON
    }
};
