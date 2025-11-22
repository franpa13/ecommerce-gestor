import type { Product } from "../../interfaces/cart-types"
import { SectionLayout } from "../../layouts/section-layout"
import { TitleSection } from "../ui/title-section"
import { GridProducts } from "./grid-products"

interface Props{
  products:Product[]
}
export const SectionMoreView = ({products}:Props) => {
    return (
        <SectionLayout >
            <TitleSection title="LO MEJOR DE TU ZONA" />
            <GridProducts products={products} />
        </SectionLayout>
    )
}
