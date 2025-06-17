import { API_URL, getToken } from "./useApi";
import { UserAccount } from "../components/types/UserAccount.type";

export const addUser = async (values: UserAccount) => {
    const formData = new FormData();

    for (const key in values) {
        const value = values[key as keyof UserAccount];
        if (value !== undefined && value !== null) {
            formData.append(key, value as any);
        }
    }

    if (values.Avatar) {
        formData.append("Avatar", values.Avatar);
    }

    const response = await fetch(`${API_URL}/User`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }

    return response.json();
};
