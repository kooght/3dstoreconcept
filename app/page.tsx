import Link from "next/link";
import { tools } from "@/lib/tools/registry";
import { Shield, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)]">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">GendTools</h1>
            <p className="text-sm text-[var(--muted)]">
              Suite d&apos;outils pour faciliter votre travail au quotidien
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <p className="text-3xl font-bold text-[var(--accent)]">{tools.length}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Outils disponibles</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <p className="text-3xl font-bold text-[var(--accent)]">{categories.length}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Catégories</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:col-span-2">
          <p className="text-sm font-medium text-[var(--foreground)]">Accès rapide</p>
          <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
            Sélectionnez un outil dans le menu latéral ou cliquez sur une carte ci-dessous.
          </p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
            {category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((t) => t.category === category)
              .map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={`/outils/${tool.id}`}
                    className="group flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--accent)]/40 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                        {tool.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
