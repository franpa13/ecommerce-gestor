import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/products/get-products";
import type { Product } from "../../interfaces/cart-types";


export const useGetProducts = () => {



    const query = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 1000 * 60,
    });

    return query;
};
