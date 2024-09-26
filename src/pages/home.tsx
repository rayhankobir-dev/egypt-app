/* eslint-disable @typescript-eslint/no-explicit-any */
import useGet from "@/hooks/use-get";
import CityCardSlider, {
  CityCardSliderSkeleton,
} from "@/components/city-card-slider";
import CtaSection from "@/components/cta-section";
import PlanTripSection from "@/components/plan-section";
import ContentSection from "@/components/content-section";
import HeroSlider, { HeroSliderSkeleton } from "@/components/hero-slider";

const LoadingState = () => (
  <>
    <HeroSliderSkeleton />
    <CityCardSliderSkeleton />
    <CtaSection />
    <PlanTripSection />
  </>
);

const ErrorState = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Error: Unable to load data.</h1>
    <p className="mt-2">Please try refreshing the page or check back later.</p>
  </div>
);

export default function HomePage() {
  const { data: homeData, isLoading, isError } = useGet<any>("/home");

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  const { slides, cities } = homeData?.data || {};

  return (
    <>
      <HeroSlider slides={slides} />
      <ContentSection
        title="History of Egypt"
        content={homeData.data.home.history}
      />
      <CityCardSlider title="Top Cities" subTitle="" cities={cities} />
      <CtaSection />
      <PlanTripSection />
    </>
  );
}
