import { ProductRepository } from "../repositories";
export declare class UpdateProduct {
    private productRepo;
    constructor(productRepo: ProductRepository);
    execute(id: string, data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        imgUrl?: string;
        categoryId?: string;
    }): Promise<void>;
}
//# sourceMappingURL=update-product.d.ts.map