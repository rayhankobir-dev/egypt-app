import { City } from "@/types";
import { Map } from "lucide-react";

import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link
      to={`/cities/${city.slug}`}
      className="w-full h-full flex flex-col gap-2 hover:opacity-80 duration-300 overflow-hidden"
    >
      <img
        className="w-full rounded-lg aspect-[16/10] object-cover"
        src={city.thumbnail}
        width={300}
        height={300}
        alt={city.name}
      />
      <div>
        <h2 className="flex items-center gap-1.5 font-semibold text-xl">
          <Map size={16} /> {city.name}
        </h2>
        <p className="font-light text-sm">{city.location}</p>
      </div>
    </Link>
  );
}

export function CityCardSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-2 hover:opacity-80 duration-300 overflow-hidden">
      <Skeleton className="w-full h-40 rounded-lg" />
      <div>
        <Skeleton className="w-2/3 h-6 rounded mb-2" />
        <Skeleton className="w-1/2 h-4 rounded" />
      </div>
    </div>
  );
}
