import { ProductRepository } from "../repositories/product-repository";
export declare class DeleteProduct {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=delete-product.d.ts.map