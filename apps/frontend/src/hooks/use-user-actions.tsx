
import { useAuthStore } from "../store/use-auth-store";
import { Heart, LogOut, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from "../store/use-cart-store";
export interface UserAction {
  label: string;
  icon: React.ReactElement;
  navigate: string;

}

export const useUserActions = (): UserAction[] => {
  const { token } = useAuthStore();
  const totalItems = useCartStore(state => state.totalItems);


  if (!token) {
    // Usuario NO logeado
    return [
      {
        label: "Ingresar",
        icon: <User className="w-8 h-8" />,
        navigate: "/auth/login",
      },
      {
        label: "Favoritos",
        icon: <Heart className="w-8 h-8" />,
        navigate: "/ecommerce/favorites",
      },
      {
        label: "Carrito",
        icon: (
          <div className="relative">
            <ShoppingCart className="w-8 h-8" />
            <span className="absolute -top-3 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        ),
        navigate: "/ecommerce/cart",
      },
    ];
  }

  // Usuario logeado
  return [
    {
      label: "Perfil",
      icon: <User className="w-6 h-6" />,
      navigate: "/ecommerce/profile",
    },
    {
      label: "Favoritos",
      icon: <Heart className="w-6 h-6" />,
      navigate: "/ecommerce/favorites",
    },
    {
      label: "Carrito",
      icon: (
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        </div>
      ),
      navigate: "/ecommerce/cart",
    },
    {
      label: "Cerrar sesión",
      icon: <LogOut className="w-6 h-6" />,
      navigate: "logout"
    },
  ];
};