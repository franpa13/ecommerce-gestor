import { CategoryService } from "../services/category-service";
export declare class GetCategoryUseCase {
    private readonly service;
    constructor(service: CategoryService);
    execute(id: string): Promise<import("../entities").Category | null>;
}
//# sourceMappingURL=get-category.d.ts.map