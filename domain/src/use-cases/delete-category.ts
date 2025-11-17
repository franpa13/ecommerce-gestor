// domain/category/use-cases/delete-category.usecase.ts

import { CategoryService } from "../services/category-service";


export class DeleteCategoryUseCase {
constructor(private readonly service: CategoryService) {}


async execute(id: string) {
return this.service.deleteCategory(id);
}
}