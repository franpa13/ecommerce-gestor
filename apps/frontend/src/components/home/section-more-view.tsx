import { SectionLayout } from "../../layouts/section-layout"
import { TitleSection } from "../ui/title-section"
import { GridProducts } from "./grid-products"
import { products } from "./section-best-prices"

export const SectionMoreView = () => {
    return (
        <SectionLayout >
            <TitleSection title="LO MEJOR DE TU ZONA" />
            <GridProducts products={products} />
        </SectionLayout>
    )
}
