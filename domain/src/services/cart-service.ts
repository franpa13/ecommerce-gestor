import { Cart } from "../entities/cart";
import { Product } from "../entities/product";


export class CartService {
  static addProduct(cart: Cart, product: Product, quantity: number): Cart {
    const existingItem = cart.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    cart.total = this.calculateTotal(cart);
    return cart;
  }

  static removeProduct(cart: Cart, productId: string): Cart {
    cart.items = cart.items.filter(item => item.product.id !== productId);
    cart.total = this.calculateTotal(cart);
    return cart;
  }

  static calculateTotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}
