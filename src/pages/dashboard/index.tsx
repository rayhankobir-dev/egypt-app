/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/spinner";
import useGet from "@/hooks/use-get";
import AdminSlides from "@/sections/admin-slides";
import HomeHistory from "@/sections/history";

export default function Dashboard() {
  const { data: homeData, isLoading } = useGet<any>("/home");

  if (isLoading) return <Spinner />;

  const { home } = homeData?.data || {};
  return (
    <>
      <div className="py-2">
        <AdminSlides slides={home.slides} />
        <HomeHistory historyData={home.history} />
      </div>
    </>
  );
}
