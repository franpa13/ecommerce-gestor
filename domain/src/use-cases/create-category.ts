// domain/category/use-cases/create-category.usecase.ts

import { CategoryService } from "../services/category-service";



export class CreateCategoryUseCase {
constructor(private readonly service: CategoryService) {}


async execute(input: { name: string; description?: string }) {
return this.service.createCategory(input.name, input.description);
}
}