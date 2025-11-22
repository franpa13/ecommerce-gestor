import { useMutation } from "@tanstack/react-query";
import type { CreateCartResponse } from "../../interfaces/cart-types";

import { useCartStore } from "../../store/use-cart-store";
import { createCart, type AddToCartPayload } from "../../services/cart/create-cart";
import { toast } from "sonner";

export const useCreateCart = () => {
    const setCartFromServer = useCartStore(state => state.setCartFromServer);

    return useMutation<CreateCartResponse, Error, AddToCartPayload>({
        mutationFn: createCart,
        onSuccess: (data) => {
            // data.cart ← viene del backend
            setCartFromServer(data.cart);
            toast.success("El producto se añadio correctamente")
        }
    });
};
