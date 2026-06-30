import { notFound } from "next/navigation";
import { getToolById } from "@/lib/tools/registry";
import { ToolRenderer } from "@/components/tools/ToolRenderer";

interface PageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateStaticParams() {
  const { tools } = await import("@/lib/tools/registry");
  return tools.map((tool) => ({ toolId: tool.id }));
}

export default async function ToolPage({ params }: PageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool) {
    notFound();
  }

  const Icon = tool.icon;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            {tool.category}
          </p>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">{tool.title}</h1>
          <p className="text-sm text-[var(--muted)]">{tool.description}</p>
        </div>
      </div>

      <ToolRenderer toolId={toolId} />
    </div>
  );
}
