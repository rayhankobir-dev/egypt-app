/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import useGet from "@/hooks/use-get";
import Spinner from "@/components/spinner";
import HomeHistory from "@/sections/history";
import AdminSlides from "@/sections/admin-slides";

export default function Dashboard() {
  const {
    data: homeData,
    isLoading,
    refetch: refetchHome,
  } = useGet<any>("/home/admin");

  const { home } = homeData?.data || {};

  return (
    <div className="w-full py-2">
      <Suspense fallback={<Spinner />}>
        {isLoading ? (
          <Spinner className="text-green-600" />
        ) : (
          <>
            <AdminSlides refetch={refetchHome} slides={home.slides} />
            <HomeHistory historyData={home.history} />
          </>
        )}
      </Suspense>
    </div>
  );
}
