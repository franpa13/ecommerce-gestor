import { Category } from "../entities";
import { ICategoryRepository } from "../repositories/category-repository";
export declare class CategoryService {
    private readonly repository;
    constructor(repository: ICategoryRepository);
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(name: string, description?: string): Promise<Category>;
    updateCategory(id: string, name: string, description?: string): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}
//# sourceMappingURL=category-service.d.ts.map