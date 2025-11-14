import { Product, ProductRepository } from "../src";


export class ProductRepositoryMock implements ProductRepository {
  
  public products: Product[] = [];

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(updated: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) this.products[index] = updated;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
  }
}
