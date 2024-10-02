/* eslint-disable @typescript-eslint/no-explicit-any */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { API_URL } from "@/api";
import { Skeleton } from "./ui/skeleton";

interface HeroSliderProps {
  className?: string;
  slides: any[] | undefined;
}

export default function HeroSlider({ className, slides }: HeroSliderProps) {
  return (
    <section className={className}>
      <div className="w-full relative group rounded-xl overflow-hidden">
        <div className="w-full flex justify-between items-center absolute top-[45%] z-10 px-3 opacity-0 group-hover:opacity-100 duration-300">
          <button className="hero-navigation-prev w-8 h-8 rounded-full flex justify-center items-center cursor-pointer bg-gray-100 hover:bg-gray-200 border duration-300">
            <ArrowLeft size={18} />
          </button>
          <button className="hero-navigation-next w-8 h-8 flex justify-center items-center rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 border duration-300">
            <ArrowRight size={18} />
          </button>
        </div>
        <Swiper
          navigation={{
            nextEl: ".hero-navigation-next",
            prevEl: ".hero-navigation-prev",
          }}
          loop={true}
          draggable={true}
          spaceBetween={10}
          pagination={true}
          modules={[EffectFade, Navigation, Pagination]}
          className="hero-swiper"
        >
          {slides?.map(({ _id, imageUrl, title, description }) => (
            <SwiperSlide
              key={_id}
              className="relative aspect-[9/7] md:aspect-[16/9] lg:aspect-[16/7] object-center rounded-xl overflow-hidden"
            >
              <img
                className="w-full min-h-96 aspect-[9/7] md:aspect-[16/9] lg:aspect-[16/7] object-cover"
                src={imageUrl}
                width={1000}
                height={600}
                alt={title}
              />
              <div className="py-5 px-5 w-full absolute bottom-0 space-y-2 bg-gradient-to-b from-transparent to-black text-white">
                <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl line-clamp-2 overflow-hidden">
                  {title}
                </h1>
                <p className="font-light text-sm lg:text-md line-clamp-3 overflow-hidden">
                  {description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function HeroSliderSkeleton() {
  return (
    <section className="w-full relative group rounded-xl overflow-hidden">
      <div className="w-full h-[400px] relative">
        <div className="absolute top-[45%] z-10 w-full flex justify-between items-center px-3 opacity-100">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    </section>
  );
}
