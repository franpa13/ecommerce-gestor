import api from "../../api/api";
import type { Product } from "../../interfaces/cart-types";
interface ResponseUpdate {
    message: string
}
type UpdateProductData = Omit<Product, "id">
export const updateProduct = async ({ data }: { data: UpdateProductData }): Promise<ResponseUpdate> => {
    const response = await api.put<ResponseUpdate>("/products", data);
    return response.data;
};
