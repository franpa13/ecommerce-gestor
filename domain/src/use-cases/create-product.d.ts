import { ProductRepository } from "../repositories";
export declare class CreateProduct {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(data: {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
        imgUrl: string;
    }): Promise<void>;
}
//# sourceMappingURL=create-product.d.ts.map