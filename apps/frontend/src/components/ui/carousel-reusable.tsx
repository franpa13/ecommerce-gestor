import * as React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider, type TrackDetails } from "keen-slider/react";
import { CustomButton } from "./custom-button";

interface Props {
  images: string[];
  loop?: boolean;
  initial?: number;
  spacing?: number;
}

export default function Carousel({
  images = [],
  loop = true,
  initial = 0,
  spacing = 0,
}: Props) {
  const [details, setDetails] = React.useState<TrackDetails | null>(null);

  const [sliderRef, slider] = useKeenSlider({
    loop,
    initial,
    detailsChanged(s) {
      setDetails(s.track.details);
    },
    slides: {
      perView: 1,
      spacing,
    },
  });

  function scaleStyle(idx: number) {
    if (!details) return {};
    const slide = details.slides[idx];
    const scaleSize = 0.02;
    const scale = 1 - (scaleSize - scaleSize * slide.portion);

    return {
      transform: `scale(${scale})`,
      transition: "transform 0.3s ease",
    };
  }

  return (
    <div className="relative w-full">
      {/* Carrusel */}
      <div ref={sliderRef} className="keen-slider h-auto overflow-hidden">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="keen-slider__slide h-auto flex justify-center items-center"
          >
            <div style={scaleStyle(idx)} className="h-auto w-full">
              <div className="w-full h-auto overflow-hidden">
                <img src={src} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón PREV */}
      <CustomButton
        label="‹"
        onClick={() => slider.current?.prev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      />

      {/* Botón NEXT */}
      <CustomButton
        label="›"
        onClick={() => slider.current?.prev()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      />


    </div>
  );
}
