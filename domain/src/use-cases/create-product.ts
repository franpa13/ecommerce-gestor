import { Product } from "../entities";
import { ProductRepository } from "../repositories";

export class CreateProduct {
  constructor(private productRepo: ProductRepository) { }

  async execute(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    imgUrl: string;
  }): Promise<void> {
    console.log("Datos en use case:", data); // ← Agrega este log
    
    const product = new Product(
      crypto.randomUUID(),
      data.name,
      data.description,
      data.price,
      data.stock,
      data.imgUrl, // ← Asegúrate de que esto se pasa correctamente
      data.categoryId,
    );

    console.log("Producto creado:", product); // ← Y este log
    
    await this.productRepo.save(product);
  }
}