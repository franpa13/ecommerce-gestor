import { CategoryService } from "../services/category-service";
export declare class CreateCategoryUseCase {
    private readonly service;
    constructor(service: CategoryService);
    execute(input: {
        name: string;
        description?: string;
    }): Promise<import("../entities").Category>;
}
//# sourceMappingURL=create-category.d.ts.map