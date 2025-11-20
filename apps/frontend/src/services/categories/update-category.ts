import api from "../../api/api";
import type { CategoryData } from "./create-category";

export interface Data {
    id: string;
    data: CategoryData
}

export interface UpdateCategoryResponse {
    message: string;

}

export const updateCategory = async ({ id, data }: Data): Promise<UpdateCategoryResponse> => {
    const response = await api.put<UpdateCategoryResponse>(`/categories/${id}`, data);
    return response.data;
};
