import { ProductRepository } from "../repositories/product-repository";
export declare class CreateProduct {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(data: {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
    }): Promise<void>;
}
//# sourceMappingURL=create-product.d.ts.map