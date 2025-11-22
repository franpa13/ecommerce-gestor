"use strict";
// domain/category/use-cases/update-category.usecase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryUseCase = void 0;
class UpdateCategoryUseCase {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute(input) {
        return this.service.updateCategory(input.id, input.name, input.description);
    }
}
exports.UpdateCategoryUseCase = UpdateCategoryUseCase;
//# sourceMappingURL=update-category.js.map