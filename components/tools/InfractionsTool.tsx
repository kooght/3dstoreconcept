"use client";

import { useState, useMemo } from "react";
import { infractions, categories } from "@/lib/tools/infractions";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";

export function InfractionsTool() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return infractions.filter((inf) => {
      const matchSearch =
        search === "" ||
        inf.description.toLowerCase().includes(search.toLowerCase()) ||
        inf.code.toLowerCase().includes(search.toLowerCase()) ||
        inf.article.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || inf.categorie === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Rechercher"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Code, article ou description..."
          />
          <Select
            label="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "all", label: "Toutes les catégories" },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {filtered.length} infraction{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
        </p>
      </Card>

      <div className="space-y-3">
        {filtered.map((inf) => (
          <Card key={inf.code} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-mono font-medium text-[var(--accent)]">
                    {inf.code}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{inf.article}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{inf.description}</p>
              </div>
              <span className="rounded-full bg-[var(--sidebar-hover)] px-2.5 py-1 text-xs text-[var(--muted)]">
                {inf.categorie}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
              <span>Classe {inf.classe}</span>
              <span>Amende : <strong className="text-[var(--foreground)]">{inf.amende}</strong></span>
              <span>Points : <strong className="text-[var(--foreground)]">{inf.points}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
