import { CarrouselImages } from '../../../components/home/carrousel-images';
import { BestPrices } from '../../../components/home/section-best-prices';
import { SectionMoreView } from '../../../components/home/section-more-view';

export const HomePage = () => {
  return (
    <section>
      <CarrouselImages />
      <BestPrices />
      <img src="logo-bann.jpg" className='h-[300px] w-full' alt="banner" />
      <SectionMoreView />
    </section>
  )
}
