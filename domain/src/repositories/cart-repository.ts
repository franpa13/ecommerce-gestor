import { Cart } from "../entities/cart";


export interface CartRepository {
  getByUserId(userId: string): Promise<Cart>;
  save(cart: Cart): Promise<void>;
}
