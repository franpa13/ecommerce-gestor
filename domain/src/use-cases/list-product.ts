import { ProductRepository } from "../repositories/product-repository";

export class ListProducts {
  constructor(private productRepo: ProductRepository) {}

  async execute() {
    return await this.productRepo.getAll();
  }
}