import { Cart } from "../entities/cart";
import { Order } from "../entities/order";

export class OrderService {
  static createOrderFromCart(userId: string, cart: Cart): Order {
    if (cart.items.length === 0) throw new Error("El carrito está vacío");
    return new Order(
      crypto.randomUUID(),
      userId,
      cart.items,
      cart.total,
      "pending"
    );
  }
}
