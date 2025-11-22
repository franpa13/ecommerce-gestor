import { CategoryService } from "../services/category-service";
export declare class DeleteCategoryUseCase {
    private readonly service;
    constructor(service: CategoryService);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=delete-category.d.ts.map