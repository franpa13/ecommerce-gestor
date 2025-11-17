import { Card, CardContent } from "./card";
import { Heart } from "lucide-react";
import { CustomButton } from "./custom-button";

export type Product = {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    stock: number;
    price: number;
    imgUrl: string;
};

interface CardShopProps {
    prod: Product;
}

export const CardShop = ({ prod }: CardShopProps) => {
    return (
        <Card
            className="
        w-full max-w-xs p-0 
        rounded-2xl overflow-hidden
        bg-white dark:bg-neutral-900
        shadow-sm hover:shadow-xl
        border border-gray-200 dark:border-neutral-800
        transition-all duration-300 ease-out
        hover:-translate-y-1
      "
        >
            {/* Image */}
            <div
                className="
          w-full aspect-square relative 
          bg-gray-50 dark:bg-neutral-800
          overflow-hidden
        "
            >
                <img
                    src={prod.imgUrl || '/placeholder.svg'}
                    alt={prod.name}
                    className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
                />

                {/* Overlay gradient on hover */}
                <div
                    className="
            absolute inset-0 
            bg-gradient-to-b from-transparent to-black/20 
            opacity-0 group-hover:opacity-100 
            transition-all duration-500
          "
                />
            </div>

            {/* Content */}
            <CardContent className="px-4 py-4 flex flex-col gap-3">

                {/* Title + Price */}
                <div className="flex items-start justify-between gap-3">
                    <h2 className="text-[17px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {prod.name}
                    </h2>

                    <span className="text-[18px] font-bold text-gray-900 dark:text-gray-100">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(prod.price)}
                    </span>
                </div>

                {/* Category */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {prod.description}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    {/* Favorite */}
                    <CustomButton
                        label=""
                        icon={<Heart className="w-5 h-5" />}
                        variant="outline"
                        className="
              w-10 h-10 grid place-items-center
              rounded-xl
              border-gray-300 dark:border-neutral-700
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-neutral-800
              transition-all
            "
                    />

                    {/* Add to Cart */}
                    <CustomButton
                        label="+ Add to Cart"
                        variant="default"
                        className="
              flex-1 h-10 rounded-xl 
              bg-black dark:bg-white 
              text-white dark:text-black 
              font-medium
              hover:opacity-90 
              transition-all
            "
                    />
                </div>
            </CardContent>
        </Card>
    );
};
