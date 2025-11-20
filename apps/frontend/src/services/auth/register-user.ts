import api from "../../api/api";
import type { User } from '../../interfaces/user-types';


export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    user: User
    token: string;
}

export const registerUser = async (
    payload: RegisterPayload
): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", payload);
    return response.data;
};
