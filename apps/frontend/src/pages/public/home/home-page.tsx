import { CarrouselImages } from "../../../components/home/carrousel-images";
import { BestPrices } from "../../../components/home/section-best-prices";
import { SectionMostSell } from "../../../components/home/section-best-selling";
import { SectionMoreView } from "../../../components/home/section-more-view";
import { ErrorComponent } from "../../../components/ui/error-component";
import { GlobalSpinner } from "../../../components/ui/global-spinner";
import { useGetProducts } from "../../../hooks/products/use-get-products";

export const HomePage = () => {
  const { data, error, isLoading } = useGetProducts();
  const bestPrices = data?.slice(0, 4)
  const moreView = data?.slice(5, 9)
  const mostSell = data?.slice(10, 14)
  return (
    <>
      {isLoading && <GlobalSpinner />}
      {error && <ErrorComponent />}

      {!isLoading && !error && (
        <section>
          <CarrouselImages />
          <BestPrices products={bestPrices || []} />
          <img
            className='w-full '
            alt="banner"
            src="/banner_down.png"
          />
          <SectionMoreView products={moreView || []} />

          <img src="logo-bann.jpg" className=' w-full rounded-lg' alt="banner" />
          <SectionMostSell products={mostSell || []} />
        </section>
      )}
    </>
  );
};
