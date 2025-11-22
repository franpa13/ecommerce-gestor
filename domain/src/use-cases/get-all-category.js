"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoriesUseCase = void 0;
class GetAllCategoriesUseCase {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute() {
        return this.service.getAllCategories();
    }
}
exports.GetAllCategoriesUseCase = GetAllCategoriesUseCase;
//# sourceMappingURL=get-all-category.js.map