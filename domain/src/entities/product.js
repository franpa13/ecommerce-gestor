"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    name;
    description;
    price;
    stock;
    imgUrl;
    categoryId;
    constructor(id, name, description, price, stock, imgUrl, categoryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imgUrl = imgUrl;
        this.categoryId = categoryId;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map