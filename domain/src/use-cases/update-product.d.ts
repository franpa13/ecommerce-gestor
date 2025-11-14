import { ProductRepository } from "../repositories/product-repository";
export declare class UpdateProduct {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(id: string, data: {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
    }): Promise<void>;
}
//# sourceMappingURL=update-product.d.ts.map