import { error } from "console"
import { resolve } from "path"

export const getLogin = async (url: string, userName: string, password: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userName, password: password, role: 'Admin' }),
            credentials: 'include', // nếu backend yêu cầu cookie/auth
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return await response.json();
    } catch (err) {
        console.error("Login error", err);
        return 'No network connection';
    }
};
