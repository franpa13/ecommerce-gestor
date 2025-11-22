"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const entities_1 = require("../entities");
class CreateProduct {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(data) {
        console.log("Datos en use case:", data); // ← Agrega este log
        const product = new entities_1.Product(crypto.randomUUID(), data.name, data.description, data.price, data.stock, data.imgUrl, // ← Asegúrate de que esto se pasa correctamente
        data.categoryId);
        console.log("Producto creado:", product); // ← Y este log
        await this.productRepo.save(product);
    }
}
exports.CreateProduct = CreateProduct;
//# sourceMappingURL=create-product.js.map