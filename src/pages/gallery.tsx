/* eslint-disable @typescript-eslint/no-explicit-any */
import useGet from "@/hooks/use-get";
import Gallery, { GallerySkeleton } from "@/components/gallery";
import { Helmet } from "react-helmet-async";

export default function GalleryPage() {
  const { data, isLoading, isError } = useGet<any>("/gallery");
  return (
    <>
      <Helmet>
        <title>Gallery | World Egypt</title>
        <meta name="description" content="Explore Places Gallery" />
      </Helmet>
      <section className="flex flex-col gap-7 py-5">
        <div className="max-w-5xl flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Explore Places Gallery</h1>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
            aspernatur cupiditate ratione vitae dolorem praesentium iure optio
            possimus consequuntur adipisci repellendus itaque excepturi nemo sed
            earum. At neque veniam ducimus!
          </p>
        </div>
        {isLoading || isError ? (
          <GallerySkeleton />
        ) : (
          <Gallery images={data?.data.gallery} />
        )}
      </section>
    </>
  );
}
