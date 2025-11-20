import api from "../../api/api";
import type { Product } from "../../interfaces/cart-types";


export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
};
