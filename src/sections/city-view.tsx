import { City } from "@/types";
import { Map } from "lucide-react";
import ContentSection from "@/components/content-section";
import { API_URL } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";

function CityView({ city }: { city: City }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="py-5">
        <h1 className="font-bold text-3xl">{city.name}</h1>
        <h2 className="flex items-center gap-1.5 font-normal text-lg">
          <Map /> {city.location}
        </h2>
      </div>

      <div className="w-full flex">
        <img
          className="w-full aspect-[9/7] md:aspect-[16/9] lg:aspect-[16/7] object-center rounded-xl overflow-hidden"
          src={API_URL + city.thumbnail}
          height={1024}
          width={1024}
          alt={city.name}
        />
      </div>

      <ContentSection title="Description" content={city.description} />
    </section>
  );
}

export function CityViewSkeleton() {
  return (
    <section className="flex flex-col gap-4 animate-pulse">
      <div className="py-5">
        <Skeleton className="h-10 rounded w-1/2 mb-2" />
        <Skeleton className="h-6 rounded w-1/3" />
      </div>
      <div className="w-full flex">
        <Skeleton className="bg-gray-100 rounded-xl overflow-hidden w-full aspect-[9/7] md:aspect-[16/9] lg:aspect-[16/7]" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-6 rounded w-1/4 mb-2" />
        <Skeleton className="h-4 rounded w-full" />
        <Skeleton className="h-4 rounded w-5/6 mb-2" />
        <Skeleton className="h-4 rounded w-3/4" />
      </div>
    </section>
  );
}

export default CityView;
