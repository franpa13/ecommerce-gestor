import { CartRepository } from "../repositories/cart-repository";
import { OrderRepository } from "../repositories/order-repository";
import { OrderService } from "../services/order-service";

export class CheckoutOrder {
  constructor(
    private cartRepo: CartRepository,
    private orderRepo: OrderRepository
  ) {}

  async execute(userId: string) {
    const cart = await this.cartRepo.getByUserId(userId);

    // 🧠 Validación necesaria
    if (!cart) {
      throw new Error("No se encontró el carrito del usuario");
    }

    const order = OrderService.createOrderFromCart(userId, cart);
    await this.orderRepo.save(order);
    return order;
  }
}
