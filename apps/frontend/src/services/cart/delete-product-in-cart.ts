import api from "../../api/api";

export interface DeleteCartProduct {
  message: string;
}
export const deleteProductInCart = async (productId: string): Promise<DeleteCartProduct> => {
  const response = await api.delete<DeleteCartProduct>(`/cart/items/${productId}`);
  return response.data;
};
