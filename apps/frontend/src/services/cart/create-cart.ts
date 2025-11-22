import api from "../../api/api";
import type { CreateCartResponse } from "../../interfaces/cart-types";
export interface AddToCartPayload {
    productId: string;
    quantity: number;

}
export const createCart = async (
    data: AddToCartPayload
): Promise<CreateCartResponse> => {
console.log(data , "data");

    const response = await api.post<CreateCartResponse>("/cart/items", data);


    return response.data;
};
