
import { SectionLayout } from "../../layouts/section-layout"

import { TitleSection } from "../ui/title-section"
import { GridProducts } from './grid-products';
import {type Product } from '../../interfaces/cart-types';

interface Props{
  products:Product[]
}
export const BestPrices = ({products}:Props) => {
 
  return (
    <SectionLayout>

      <TitleSection title="LAS MEJORES OFERTAS" />
      <GridProducts products={products} />
    </SectionLayout>

  )
}
