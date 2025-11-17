// domain/category/category.service.ts

import { Category } from "../entities";
import { ICategoryRepository } from "../repositories/category-repository";

export class CategoryService {
constructor(private readonly repository: ICategoryRepository) {}


async getAllCategories() {
return this.repository.findAll();
}


async getCategoryById(id: string) {
return this.repository.findById(id);
}


async createCategory(name: string, description?: string) {
const category = new Category(crypto.randomUUID(), name, description);
return this.repository.create(category);
}


async updateCategory(id: string, name: string, description?: string) {
const category = new Category(id, name, description);
return this.repository.update(category);
}


async deleteCategory(id: string) {
await this.repository.delete(id);
}
}