import { VitesseTool } from "./VitesseTool";
import { GardeAVueTool } from "./GardeAVueTool";
import { GpsTool } from "./GpsTool";
import { DistanceTool } from "./DistanceTool";
import { AgeTool } from "./AgeTool";
import { AlcoolTool } from "./AlcoolTool";
import { InfractionsTool } from "./InfractionsTool";
import { ReferenceTool } from "./ReferenceTool";
import { ConvertisseurTool } from "./ConvertisseurTool";
import { ChronometreTool } from "./ChronometreTool";

const toolComponents: Record<string, React.ComponentType> = {
  vitesse: VitesseTool,
  "garde-a-vue": GardeAVueTool,
  gps: GpsTool,
  distance: DistanceTool,
  age: AgeTool,
  alcool: AlcoolTool,
  infractions: InfractionsTool,
  reference: ReferenceTool,
  convertisseur: ConvertisseurTool,
  chronometre: ChronometreTool,
};

export function ToolRenderer({ toolId }: { toolId: string }) {
  const Component = toolComponents[toolId];
  if (!Component) {
    return <p className="text-[var(--muted)]">Outil non trouvé.</p>;
  }
  return <Component />;
}
