import { ProductRepository } from "../repositories/product-repository";
import { Product } from "../entities/product";



export class CreateProduct {
  constructor(private productRepo: ProductRepository) {}

  async execute(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  }): Promise<void> {
    const product = new Product(
      crypto.randomUUID(),
      data.name,
      data.description,
      data.price,
      data.stock,
      data.categoryId
    );

    await this.productRepo.save(product);
  }
}
