import { ProductRepository } from "../repositories/product-repository";
import { Product } from "../entities/product";

export class UpdateProduct {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string, data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  }): Promise<void> {
    // Verificar existencia
    const existing = await this.productRepo.getById(id);
    if (!existing) throw new Error("Producto no encontrado");

    const updated = new Product(
      id,
      data.name,
      data.description,
      data.price,
      data.stock,
      data.categoryId
    );

    await this.productRepo.update(updated);
  }
}
