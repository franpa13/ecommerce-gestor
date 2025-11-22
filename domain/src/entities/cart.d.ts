import { Product } from "./product";
export interface CartItem {
    product: Product;
    quantity: number;
}
export declare class Cart {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    constructor(id: string, userId: string, items?: CartItem[], total?: number);
}
//# sourceMappingURL=cart.d.ts.map