import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  constructor(
    public id: string,
    public userId: string,
    public items: CartItem[] = [],
    public total: number = 0
  ) {}
}