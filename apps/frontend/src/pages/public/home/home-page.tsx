import { CarrouselImages } from '../../../components/home/carrousel-images';
import { BestPrices } from '../../../components/home/section-best-prices';
import { SectionMoreView } from '../../../components/home/section-more-view';
import { SectionMostSell } from '../../../components/home/section-best-selling';

export const HomePage = () => {
  return (
    <section>
      <CarrouselImages />
      <BestPrices />
      <img src="logo-bann.jpg" className='h-[300px] w-full rounded-lg' alt="banner" />
      <SectionMoreView />
      <img className='w-full' alt="banner" src="https://aremsaprod.vtexassets.com/assets/vtex.file-manager-graphql/images/cb9b4d4b-0991-4990-9bf7-99fd4b8ccf85___5cacf07c8cd36feba1d08af1a34db6d3.png" />
      <SectionMostSell />
    </section>
  )
}
