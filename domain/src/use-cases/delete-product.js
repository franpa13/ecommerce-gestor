"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = void 0;
class DeleteProduct {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(id) {
        const existing = await this.productRepo.getById(id);
        if (!existing)
            throw new Error("Producto no encontrado");
        await this.productRepo.delete(id);
    }
}
exports.DeleteProduct = DeleteProduct;
//# sourceMappingURL=delete-product.js.map