import api from "../../api/api";
import type { GetCartResponse } from "../../interfaces/cart-types";

export const getCart = async (): Promise<GetCartResponse> => {
    const response = await api.get<GetCartResponse>("/cart");
    return response.data;
};
