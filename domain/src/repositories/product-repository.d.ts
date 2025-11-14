import { Product } from "../entities/product";
export interface ProductRepository {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    save(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=product-repository.d.ts.map