import api from "../../api/api";
import type { User } from "../../interfaces/user-types";


export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user:User;
    token: string;
}

export const loginService = async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
};
