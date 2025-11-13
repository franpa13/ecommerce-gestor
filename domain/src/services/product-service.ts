import { Product } from "../entities/product";


export class ProductService {
  static validateStock(product: Product, quantity: number): boolean {
    return product.stock >= quantity;
  }

  static decreaseStock(product: Product, quantity: number): Product {
    if (!this.validateStock(product, quantity)) {
      throw new Error("Stock insuficiente");
    }
    product.stock -= quantity;
    return product;
  }
}
