import { Product } from "../entities";
import { ProductRepository } from "../repositories";

export class UpdateProduct {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imgUrl?: string;
    categoryId?: string;
  }): Promise<void> {

    const existing = await this.productRepo.getById(id);
    if (!existing) throw new Error("Producto no encontrado");

    const updated = new Product(
      id,
      data.name ?? existing.name,
      data.description ?? existing.description,
      data.price ?? existing.price,
      data.stock ?? existing.stock,
      data.imgUrl ?? existing.imgUrl,
      data.categoryId ?? existing.categoryId
    );

    await this.productRepo.update(updated);
  }
}
