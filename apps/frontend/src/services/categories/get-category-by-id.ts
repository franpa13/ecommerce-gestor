import api from "../../api/api";
import type { Category } from "../../interfaces/categories-types";


export const getCategories = async (id: string): Promise<Category[]> => {
    const response = await api.get<Category[]>(`/categories/${id}`);
    return response.data;
};
