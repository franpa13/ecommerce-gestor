import { CategoryService } from "../services/category-service";
export declare class UpdateCategoryUseCase {
    private readonly service;
    constructor(service: CategoryService);
    execute(input: {
        id: string;
        name: string;
        description?: string;
    }): Promise<import("../entities").Category>;
}
//# sourceMappingURL=update-category.d.ts.map