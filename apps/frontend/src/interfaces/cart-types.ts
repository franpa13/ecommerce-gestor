export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string | null;
  imgUrl:string  | null
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
}


export interface CreateCartResponse {
  message: string;
  cart: Cart;
}
export type GetCartResponse = Cart;