import { ProductRepository } from "../repositories/product-repository";
import { Product } from "../entities/product";
export declare class GetProductById {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(id: string): Promise<Product | null>;
}
//# sourceMappingURL=get-product-by-id.d.ts.map