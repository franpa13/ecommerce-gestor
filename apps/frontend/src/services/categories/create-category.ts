import api from "../../api/api";
import type { Category } from "../../interfaces/categories-types";
export type CategoryData = Omit<Category, "id">
interface Response {
    message: string
}
export const getCategories = async ({ data }: { data: CategoryData }): Promise<Response> => {
    const response = await api.post<Response>("/categories", data);
    return response.data;
};
