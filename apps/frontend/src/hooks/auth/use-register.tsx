
import { useMutation } from "@tanstack/react-query";
import { registerUser, type RegisterPayload, type RegisterResponse } from "../../services/auth/register-user";


export const useRegister = () => {

    return useMutation<RegisterResponse, Error, RegisterPayload>({
        mutationFn: (payload) => registerUser(payload)
    });
};


