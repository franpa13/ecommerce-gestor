import { CartItem } from "./cart";

export class Order {
  constructor(
    public id: string,
    public userId: string,
    public items: CartItem[],
    public total: number,
    public status: 'pending' | 'paid' | 'shipped' | 'delivered' = 'pending',
    public createdAt: Date = new Date()
  ) {}
}