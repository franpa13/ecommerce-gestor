import { useMutation } from "@tanstack/react-query";
import { loginService, type LoginPayload, type LoginResponse } from "../../services/auth/login-user";


export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: loginService,
    });
};
