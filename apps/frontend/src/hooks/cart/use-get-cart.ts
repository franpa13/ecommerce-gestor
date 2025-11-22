import { useQuery } from "@tanstack/react-query";
import type { GetCartResponse } from "../../interfaces/cart-types";
import { getCart } from "../../services/cart/get-cart";
import { useAuthStore } from "../../store/use-auth-store";

export const useCartQuery = () => {
    const token = useAuthStore((state) => state.token);
    return useQuery<GetCartResponse>({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled: !!token,
    });

};
