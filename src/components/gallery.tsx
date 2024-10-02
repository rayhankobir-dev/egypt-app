import { API_URL } from "@/api";
import { GalleryImage } from "@/types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images) return <GallerySkeleton />;
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {images?.map(({ imageUrl }, index) => (
          <img
            className="p-1 rounded-xl aspect-[16/10] object-cover"
            key={index}
            src={imageUrl}
            height={1024}
            width={1024}
            alt="City"
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export function GallerySkeleton() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-1">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
