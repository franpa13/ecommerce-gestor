"use strict";
// domain/category/use-cases/create-category.usecase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryUseCase = void 0;
class CreateCategoryUseCase {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute(input) {
        return this.service.createCategory(input.name, input.description);
    }
}
exports.CreateCategoryUseCase = CreateCategoryUseCase;
//# sourceMappingURL=create-category.js.map