"use strict";
// domain/category/category.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const entities_1 = require("../entities");
class CategoryService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllCategories() {
        return this.repository.findAll();
    }
    async getCategoryById(id) {
        return this.repository.findById(id);
    }
    async createCategory(name, description) {
        const category = new entities_1.Category(crypto.randomUUID(), name, description);
        return this.repository.create(category);
    }
    async updateCategory(id, name, description) {
        const category = new entities_1.Category(id, name, description);
        return this.repository.update(category);
    }
    async deleteCategory(id) {
        await this.repository.delete(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map