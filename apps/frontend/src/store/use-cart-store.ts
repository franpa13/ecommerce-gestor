import { create } from "zustand";
import type { CartItem, Product, Cart } from "../interfaces/cart-types";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (product: Product) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setCartFromServer: (cart: Cart | undefined) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.product.id === product.id);

      let newItems: CartItem[];

      if (exists) {
        newItems = state.items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newItems = [...state.items, { product, quantity: 1 }];
      }

      return {
        items: newItems,
        totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
        totalPrice: newItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      };
    }),

  decreaseItem: (productId) =>
    set((state) => {
      const item = state.items.find((i) => i.product.id === productId);
      if (!item) return state;

      let newItems: CartItem[];

      if (item.quantity === 1) {
        newItems = state.items.filter((i) => i.product.id !== productId);
      } else {
        newItems = state.items.map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      }

      return {
        items: newItems,
        totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
        totalPrice: newItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.product.id !== productId);

      return {
        items: newItems,
        totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
        totalPrice: newItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
      };
    }),

  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }),


  setCartFromServer: (cart) =>
    set({
      items: cart?.items,
      totalItems: cart?.items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: cart?.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
}));
