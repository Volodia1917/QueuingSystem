import { API_URL, getToken } from "./useApi";

export const getUser = async () => {
    try {
        const response = await fetch(`${API_URL}/User/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Lỗi fetch user:", err);
        return []; 
    }
};
