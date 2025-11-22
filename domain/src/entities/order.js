"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    id;
    userId;
    items;
    total;
    status;
    createdAt;
    constructor(id, userId, items, total, status = 'pending', createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map