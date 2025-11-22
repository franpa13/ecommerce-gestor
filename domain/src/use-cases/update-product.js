"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
const entities_1 = require("../entities");
class UpdateProduct {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(id, data) {
        const existing = await this.productRepo.getById(id);
        if (!existing)
            throw new Error("Producto no encontrado");
        const updated = new entities_1.Product(id, data.name ?? existing.name, data.description ?? existing.description, data.price ?? existing.price, data.stock ?? existing.stock, data.imgUrl ?? existing.imgUrl, data.categoryId ?? existing.categoryId);
        await this.productRepo.update(updated);
    }
}
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=update-product.js.map