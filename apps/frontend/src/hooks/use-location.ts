import { useLocation as useReactRouterLocation } from "react-router";

export const useLocation = () => {
  const { pathname } = useReactRouterLocation();

  const determineLocation = (href: string) => {
    if (!href) return false;

    // Caso especial: raíz "/"
    if (href === "/") {
      return pathname === "/";
    }

    // Coincidencia por prefijo
    return pathname.startsWith(href);
  };

  return { pathname, determineLocation };
};
