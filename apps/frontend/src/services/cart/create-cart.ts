import api from "../../api/api";
import type { CreateCartResponse } from "../../interfaces/cart-types";

export const createCart = async (): Promise<CreateCartResponse> => {
    const response = await api.post<CreateCartResponse>("/cart/items");
    return response.data;
};
