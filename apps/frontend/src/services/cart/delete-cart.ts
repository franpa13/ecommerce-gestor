import api from "../../api/api";

export interface DeleteCartResponse {
  message: string;
}

export const deleteCart = async (): Promise<DeleteCartResponse> => {
  const response = await api.delete<DeleteCartResponse>("/cart");
  return response.data;
};
