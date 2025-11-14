import { ProductRepository } from "../repositories/product-repository";

export class DeleteProduct {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.productRepo.getById(id);
    if (!existing) throw new Error("Producto no encontrado");

    await this.productRepo.delete(id);
  }
}
