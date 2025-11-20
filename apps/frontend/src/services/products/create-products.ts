import api from "../../api/api";

interface ResponseProducts {
  message: string,
  id: string
}

export const createProducts = async (): Promise<ResponseProducts[]> => {
  const response = await api.post<ResponseProducts[]>("/products");
  return response.data;
};
