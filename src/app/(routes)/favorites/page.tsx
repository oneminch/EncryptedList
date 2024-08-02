import type { Metadata } from "next";
import { metadata as pageMeta } from "@/lib/metadata";
import ProductListSkeleton from "@/components/products/ProductListSkeleton";

export const metadata: Metadata = {
  title: pageMeta["/favorites"].title,
  description: pageMeta["/favorites"].description
};

export default function FavoritesPage() {
  return (
    <>
      <h1>Favorites</h1>
      <div className="md:grid md:grid-cols-1 md:gap-2 space-y-2 md:space-y-0">
        <ProductListSkeleton />
        <ProductListSkeleton />
      </div>
    </>
  );
}
