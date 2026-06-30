import {
  Gauge,
  Clock,
  MapPin,
  Route,
  Calendar,
  Wine,
  BookOpen,
  Hash,
  ArrowLeftRight,
  Timer,
  type LucideIcon,
} from "lucide-react";

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export const tools: ToolDefinition[] = [
  {
    id: "vitesse",
    title: "Vitesse / Distance / Temps",
    description: "Calculs de cinématique routière pour reconstitution",
    icon: Gauge,
    category: "Routier",
  },
  {
    id: "garde-a-vue",
    title: "Garde à vue",
    description: "Chronomètre avec limites légales (24h / 48h)",
    icon: Clock,
    category: "Procédure",
  },
  {
    id: "gps",
    title: "Coordonnées GPS",
    description: "Conversion DMS ↔ décimal",
    icon: MapPin,
    category: "Géolocalisation",
  },
  {
    id: "distance",
    title: "Distance GPS",
    description: "Distance entre deux points géographiques",
    icon: Route,
    category: "Géolocalisation",
  },
  {
    id: "age",
    title: "Calcul d'âge",
    description: "Âge précis à une date de référence",
    icon: Calendar,
    category: "Administratif",
  },
  {
    id: "alcool",
    title: "Estimation alcoolémie",
    description: "Estimation théorique (formule de Widmark)",
    icon: Wine,
    category: "Routier",
  },
  {
    id: "infractions",
    title: "Référentiel infractions",
    description: "Codes et sanctions du Code de la route",
    icon: BookOpen,
    category: "Routier",
  },
  {
    id: "reference",
    title: "Numérotation PV",
    description: "Générateur de références de procès-verbal",
    icon: Hash,
    category: "Administratif",
  },
  {
    id: "convertisseur",
    title: "Convertisseur d'unités",
    description: "Vitesse, distance, poids",
    icon: ArrowLeftRight,
    category: "Utilitaires",
  },
  {
    id: "chronometre",
    title: "Chronomètre",
    description: "Chronomètre d'intervention avec tours",
    icon: Timer,
    category: "Utilitaires",
  },
];

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((t) => t.id === id);
}
