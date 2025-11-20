import api from "../../api/api";
import type { CreateCartResponse } from "../../interfaces/cart-types";
export interface UpdateResponse extends CreateCartResponse { }
export const updateCart = async (
    productId: string,
    quantity: number
): Promise<UpdateResponse> => {
    const response = await api.put<UpdateResponse>(`/cart/items/${productId}`, {
        quantity,
    });
    return response.data;
};
