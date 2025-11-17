// domain/category/use-cases/get-category.usecase.ts

import { CategoryService } from "../services/category-service";


export class GetCategoryUseCase {
constructor(private readonly service: CategoryService) {}


async execute(id: string) {
return this.service.getCategoryById(id);
}
}