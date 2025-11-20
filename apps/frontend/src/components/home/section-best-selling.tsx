import { SectionLayout } from '../../layouts/section-layout';
import { TitleSection } from '../ui/title-section';
import { GridProducts } from './grid-products';
import { products } from './section-best-prices';

export const SectionMostSell = () => {
  return (
    <SectionLayout tag='TecnoCart'>
        <TitleSection title="LOS MAS VENDIDOS Y CODICIADOS" />
        <GridProducts products={products} />
    </SectionLayout>
  )
}
