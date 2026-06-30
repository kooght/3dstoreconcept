"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Home } from "lucide-react";
import { tools } from "@/lib/tools/registry";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[var(--sidebar)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">GENDTOOLS</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Outils Gendarmerie</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/"
          className={cn(
            "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <Home className="h-4 w-4" />
          Tableau de bord
        </Link>

        <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Outils
        </p>

        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = pathname === `/outils/${tool.id}`;
          return (
            <Link
              key={tool.id}
              href={`/outils/${tool.id}`}
              className={cn(
                "mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{tool.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Outil d&apos;aide à la décision. Ne se substitue pas aux textes officiels.
        </p>
      </div>
    </aside>
  );
}
