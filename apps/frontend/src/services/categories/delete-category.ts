import api from "../../api/api";

export interface DeleteCategoryResponse {
    message: string;
}

export const deleteCategory = async (id: string): Promise<DeleteCategoryResponse> => {
    const response = await api.delete<DeleteCategoryResponse>(`/categories/${id}`);
    return response.data;
};
