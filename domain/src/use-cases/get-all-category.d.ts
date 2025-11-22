import { CategoryService } from "../services/category-service";
export declare class GetAllCategoriesUseCase {
    private readonly service;
    constructor(service: CategoryService);
    execute(): Promise<import("../entities").Category[]>;
}
//# sourceMappingURL=get-all-category.d.ts.map