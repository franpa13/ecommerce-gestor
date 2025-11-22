import type { Product } from '../../interfaces/cart-types';
import { SectionLayout } from '../../layouts/section-layout';
import { TitleSection } from '../ui/title-section';
import { GridProducts } from './grid-products';

interface Props{
  products:Product[]
}
export const SectionMostSell = ({products}:Props) => {
  return (
    <SectionLayout tag='TecnoCart'>
        <TitleSection title="LOS MAS VENDIDOS Y CODICIADOS" />
        <GridProducts products={products} />
    </SectionLayout>
  )
}
