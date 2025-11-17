import { CategoryService } from "../services/category-service";

export class GetAllCategoriesUseCase {
constructor(private readonly service: CategoryService) {}


async execute() {
return this.service.getAllCategories();
}
}