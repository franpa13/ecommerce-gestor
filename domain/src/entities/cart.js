"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    id;
    userId;
    items;
    total;
    constructor(id, userId, items = [], total = 0) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
    }
}
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map