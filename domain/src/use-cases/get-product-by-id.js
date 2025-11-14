"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductById = void 0;
class GetProductById {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(id) {
        return this.productRepo.getById(id);
    }
}
exports.GetProductById = GetProductById;
//# sourceMappingURL=get-product-by-id.js.map