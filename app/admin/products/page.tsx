import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductsTable, type ProductRow } from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

function parseImage(images: string): string | null {
  try {
    const parsed = JSON.parse(images);
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
      return parsed[0];
    }
  } catch {
    /* ignore */
  }
  return null;
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows: ProductRow[] = products.map((item) => ({
    id: item.id,
    title: item.title,
    price: Number(item.price),
    status: item.status,
    brand: item.brand,
    imageUrl: parseImage(item.images),
    boutique: item.brand || "3D Store",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cliquez sur une colonne pour classer le tableau
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#303030] flex items-center gap-2"
        >
          <Plus size={18} />
          Ajouter un produit
        </Link>
      </div>

      <ProductsTable products={rows} />
    </div>
  );
}
