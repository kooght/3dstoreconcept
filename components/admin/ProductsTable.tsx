"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  FolderOpen,
  ImageIcon,
  ShoppingBag,
} from "lucide-react";

export type ProductRow = {
  id: string;
  title: string;
  price: number;
  status: string;
  brand: string | null;
  imageUrl: string | null;
  boutique: string;
};

type SortKey = "title" | "boutique" | "price" | "status";
type SortDir = "asc" | "desc";

const statusLabel: Record<string, string> = {
  ACTIVE: "Actif",
  DRAFT: "Brouillon",
  ARCHIVED: "Archivé",
};

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown size={14} className="text-gray-400" />;
  return dir === "asc" ? (
    <ArrowUp size={14} className="text-gray-800" />
  ) : (
    <ArrowDown size={14} className="text-gray-800" />
  );
}

export function ProductsTable({ products }: { products: ProductRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [query, setQuery] = useState("");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? products.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.boutique.toLowerCase().includes(q) ||
            (p.brand || "").toLowerCase().includes(q) ||
            p.status.toLowerCase().includes(q)
        )
      : products;

    return [...base].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "price") {
        cmp = a.price - b.price;
      } else if (sortKey === "title") {
        cmp = a.title.localeCompare(b.title, "fr");
      } else if (sortKey === "boutique") {
        cmp = a.boutique.localeCompare(b.boutique, "fr");
      } else {
        cmp = a.status.localeCompare(b.status, "fr");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [products, query, sortKey, sortDir]);

  const headers: { key: SortKey | null; label: string; className?: string }[] = [
    { key: null, label: "Image", className: "w-20" },
    { key: "title", label: "Produit" },
    { key: "boutique", label: "Boutiques" },
    { key: "price", label: "Prix (€)", className: "text-right" },
    { key: "status", label: "Statut" },
    { key: null, label: "Accès STL", className: "text-right" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrer les produits…"
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
            <tr>
              {headers.map((h) => (
                <th key={h.label} className={`px-6 py-3 ${h.className || ""}`}>
                  {h.key ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(h.key!)}
                      className="inline-flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                      aria-label={`Trier par ${h.label}`}
                    >
                      {h.label}
                      <SortIcon active={sortKey === h.key} dir={sortDir} />
                    </button>
                  ) : (
                    h.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={20} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          item.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="hover:underline"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 px-2.5 py-1 text-xs font-medium">
                      {item.boutique}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {Number(item.price).toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : item.status === "DRAFT"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {statusLabel[item.status] || item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <FolderOpen size={14} />
                        Voir dossier
                      </Link>
                      <Link
                        href={`/products/${item.id}`}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                        title="Voir en boutique"
                      >
                        <ShoppingBag size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
