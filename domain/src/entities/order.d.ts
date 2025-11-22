import { CartItem } from "./cart";
export declare class Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
    createdAt: Date;
    constructor(id: string, userId: string, items: CartItem[], total: number, status?: 'pending' | 'paid' | 'shipped' | 'delivered', createdAt?: Date);
}
//# sourceMappingURL=order.d.ts.map