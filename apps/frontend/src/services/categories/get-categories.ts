import api from "../../api/api";
import type { Category } from "../../interfaces/categories-types";


export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
};
