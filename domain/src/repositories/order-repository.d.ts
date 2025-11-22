import { Order } from "../entities/order";
export interface OrderRepository {
    getByUserId(userId: string): Promise<Order[]>;
    save(order: Order): Promise<void>;
    updateStatus(orderId: string, status: string): Promise<void>;
}
//# sourceMappingURL=order-repository.d.ts.map