"use strict";
// domain/category/use-cases/get-category.usecase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryUseCase = void 0;
class GetCategoryUseCase {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute(id) {
        return this.service.getCategoryById(id);
    }
}
exports.GetCategoryUseCase = GetCategoryUseCase;
//# sourceMappingURL=get-category.js.map