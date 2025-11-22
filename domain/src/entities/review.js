"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    id;
    userId;
    productId;
    rating;
    comment;
    createdAt;
    constructor(id, userId, productId, rating, comment, createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }
}
exports.Review = Review;
//# sourceMappingURL=review.js.map