import React from "react";
import { CardShop } from "../ui/custom-card";
import { type Product} from '../../interfaces/cart-types';

interface GridProductsProps {
    products: Product[];
    className?: string;
}

export const GridProducts: React.FC<GridProductsProps> = ({
    products,
    className = "",
}) => {
    return (
        <div className={`flex justify-center items-start  pt-5 md:pt-0  ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 place-items-center w-full px-0 max-w-7xl">
                {products.map((product) => (
                    <CardShop key={product.id} prod={product} />
                ))}
            </div>
        </div>
    );
};