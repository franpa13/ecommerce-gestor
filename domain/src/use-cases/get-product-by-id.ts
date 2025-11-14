import { ProductRepository } from "../repositories/product-repository";
import { Product } from "../entities/product";

export class GetProductById {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepo.getById(id);
  }
}
