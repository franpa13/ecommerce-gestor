import { SectionLayout } from "../../layouts/section-layout"
import type { Product } from "../ui/custom-card";
import { TitleSection } from "../ui/title-section"
import { GridProducts } from './grid-products';
 export  const products: Product[] = [
    {
      id: "1",
      name: "Zapatillas Running Pro",
      description: "Zapatillas deportivas para running con tecnología de amortiguación avanzada",
      categoryId: "calzado",
      stock: 15,
      price: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
      id: "2",
      name: "Camiseta Básica Algodón",
      description: "Camiseta 100% algodón orgánico, cómoda y transpirable",
      categoryId: "ropa",
      stock: 30,
      price: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
      id: "3",
      name: "Smartphone Android",
      description: "Teléfono inteligente con pantalla AMOLED y triple cámara",
      categoryId: "electronica",
      stock: 8,
      price: 299.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
      id: "4",
      name: "Auriculares Inalámbricos",
      description: "Auriculares Bluetooth con cancelación de ruido activa",
      categoryId: "electronica",
      stock: 20,
      price: 79.99,
      imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

  ];
export const BestPrices = () => {

  return (
    <SectionLayout>

      <TitleSection title="LAS MEJORES OFERTAS" />
      <GridProducts products={products} />
    </SectionLayout>

  )
}
