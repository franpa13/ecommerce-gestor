"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
const product_1 = require("../entities/product");
class UpdateProduct {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(id, data) {
        // Verificar existencia
        const existing = await this.productRepo.getById(id);
        if (!existing)
            throw new Error("Producto no encontrado");
        const updated = new product_1.Product(id, data.name, data.description, data.price, data.stock, data.categoryId);
        await this.productRepo.update(updated);
    }
}
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=update-product.js.map