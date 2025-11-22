// src/application/services/product-creator.service.ts

import { ProductRepository } from "../../../../domain/dist";
import { Product } from "../../../../domain/dist/src/entities";


export class ProductCreatorService {
  constructor(private productRepo: ProductRepository) {}

  async create(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    imgUrl: string;
  }): Promise<{ id: string; success: boolean }> {
    
    console.log("🟢 Creando producto en servicio:", data);
    
    const product = new Product(
      crypto.randomUUID(),
      data.name,
      data.description,
      data.price,
      data.stock,
      data.imgUrl,
      data.categoryId
    );

    console.log("📦 Producto creado:", product);
    
    await this.productRepo.save(product);
    
    return { id: product.id, success: true };
  }
}