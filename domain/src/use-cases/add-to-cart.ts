import { CartRepository } from "../repositories/cart-repository";
import { ProductRepository } from "../repositories/product-repository";
import { CartService } from "../services/cart-service";

export class AddToCart {
  constructor(
    private cartRepo: CartRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(userId: string, productId: string, quantity: number) {
    const cart = await this.cartRepo.getByUserId(userId);
    const product = await this.productRepo.getById(productId);
    if (!product) throw new Error("Producto no encontrado");

    const updatedCart = CartService.addProduct(cart, product, quantity);
    await this.cartRepo.save(updatedCart);
    return updatedCart;
  }
}
