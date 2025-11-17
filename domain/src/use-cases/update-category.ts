// domain/category/use-cases/update-category.usecase.ts

import { CategoryService } from "../services/category-service";



export class UpdateCategoryUseCase {
constructor(private readonly service: CategoryService) {}


async execute(input: { id: string; name: string; description?: string }) {
return this.service.updateCategory(input.id, input.name, input.description);
}
}