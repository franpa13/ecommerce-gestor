"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const product_1 = require("../entities/product");
class CreateProduct {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(data) {
        const product = new product_1.Product(crypto.randomUUID(), data.name, data.description, data.price, data.stock, data.categoryId);
        await this.productRepo.save(product);
    }
}
exports.CreateProduct = CreateProduct;
//# sourceMappingURL=create-product.js.map