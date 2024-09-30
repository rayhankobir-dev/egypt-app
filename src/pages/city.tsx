/* eslint-disable @typescript-eslint/no-explicit-any */
import useGet from "@/hooks/use-get";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PageNotFound from "@/pages/page-not-found";
import CityView, { CityViewSkeleton } from "@/sections/city-view";

export default function CitySinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGet<any>(`/cities/${slug}`);

  if (isLoading) return <CityViewSkeleton />;

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{data?.data.city.name} | World Egypt</title>
        <meta name="description" content={data?.data.city.description} />
      </Helmet>
      <CityView city={data?.data.city} />
    </>
  );
}
