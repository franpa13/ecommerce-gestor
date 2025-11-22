import { useState } from "react";
import { Link } from "react-router";
import { useIsMobile } from "../../../hooks/use-is-mobile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";

import { mainCategories } from "../../../const/categories";
import { ChevronDown, ChevronUp, CircleArrowRight, ShoppingBag } from "lucide-react";


export function EcommerceNavigation() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full   bg-accent text-white select-none shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="flex pl-8 py-2 items-center justify-start gap-2 w-full text-left font-semibold text-lg"
        >
          <div className="flex text-sm items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Compra por Categorías
          </div>
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4  " />
          )}
        </button>

        <div
          className={`mt-0 bg-white  shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 p-0" : "max-h-0 opacity-0 p-0"
            }`}
        >
          <div className="flex flex-col">
            {mainCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                className="
                  flex items-center gap-4 p-1 
                  text-gray-700 
                  transition-all
                  border-b
                "
              >
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="w-7 h-7 opacity-90"
                />
                <span className="text-base font-medium">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-accent/90 backdrop-blur-md text-white flex justify-center border-b border-white/10 shadow-sm">

      <NavigationMenu className="w-full max-w-7xl">

        <NavigationMenuList className="flex w-full justify-center gap-2 py-2">
          <div className="flex flex-col ">

            <span className="text-xs  text-gray-300">Comprar por</span>
            <div className="flex items-center gap-2 ">
              <Link to={"/ecommerce/products"} className=" underline decoration-2 decoration-offset-4">
                Categorías
              </Link>

              <CircleArrowRight size={20} />
            </div>
          </div>

          {mainCategories.map((cat) => (
            <NavigationMenuItem key={cat.label}>
              <NavigationMenuLink asChild>
                <Link
                  to={cat.href}
                  className="
                    flex flex-col items-center justify-center px-6 py-2 rounded-lg
                    transition-all hover:bg-white/10 hover:shadow
                  "
                >
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="w-7 h-7 opacity-95"
                  />
                  <span className="text-sm font-medium mt-1">{cat.label}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
