import { Review } from "../entities/review";
import { ReviewRepository } from "../repositories/review-repository";

export class CreateReview {
  constructor(private reviewRepo: ReviewRepository) {}

  async execute(userId: string, productId: string, rating: number, comment: string) {
    const review = new Review(crypto.randomUUID(), userId, productId, rating, comment);
    await this.reviewRepo.save(review);
    return review;
  }
}
