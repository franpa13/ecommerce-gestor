"use strict";
// domain/category/use-cases/delete-category.usecase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryUseCase = void 0;
class DeleteCategoryUseCase {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute(id) {
        return this.service.deleteCategory(id);
    }
}
exports.DeleteCategoryUseCase = DeleteCategoryUseCase;
//# sourceMappingURL=delete-category.js.map