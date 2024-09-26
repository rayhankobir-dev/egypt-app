/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from "@/types";
import useGet from "@/hooks/use-get";
import Wrapper from "@/components/wrapper";
import SectionTitle from "@/components/section-title";
import CityCard, { CityCardSkeleton } from "@/components/city-card";

export default function CityGridView() {
  const { data, isLoading, isError } = useGet<any>("/cities");

  return (
    <Wrapper>
      <SectionTitle title="Cities" />
      {isLoading || isError ? (
        <GridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 gap-y-7">
          {data?.data.cities?.map((city: City) => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
      )}
    </Wrapper>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 gap-y-7">
      {Array.from({ length: 8 }).map((_, index) => (
        <CityCardSkeleton key={index} />
      ))}
    </div>
  );
}
