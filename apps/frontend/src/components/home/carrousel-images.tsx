import Carousel from '../ui/carousel-reusable';

export const CarrouselImages = () => {
    // const imagesDefault: string[] = ["/nortec.webp", "/jbl.webp", "/infinix.webp"]
    const images: string[] = ["https://images.fravega.com/f300/6dd4d4729d0c11bbba1ae805a647fe6f.jpg.webp", "https://images.fravega.com/f300/ae8084fba2d8c64698fa6ca455f1a9de.jpg.webp", "https://images.fravega.com/f300/5b5c1bd4b64422681fc152115d627a45.jpg.webp"]
    return (
        <div>
            <Carousel images={images}></Carousel>
        </div>
    )
}
