"use client";

import dynamic from "next/dynamic";
import type { ProductRow } from "./ProductsTable";

const ProductsTable = dynamic(
  () => import("./ProductsTable").then((m) => m.ProductsTable),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-sm text-gray-500">
        Chargement du tableau classable…
      </div>
    ),
  }
);

export function ProductsTableLoader({ products }: { products: ProductRow[] }) {
  return <ProductsTable products={products} />;
}
