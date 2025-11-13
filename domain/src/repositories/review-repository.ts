import { Review } from "../entities/review";


export interface ReviewRepository {
  getByProductId(productId: string): Promise<Review[]>;
  save(review: Review): Promise<void>;
}
