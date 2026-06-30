"use client";

import { useState } from "react";
import { estimateBloodAlcohol } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export function AlcoolTool() {
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [percentage, setPercentage] = useState("12");
  const [hours, setHours] = useState("0");
  const [sex, setSex] = useState("male");
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate() {
    const w = parseFloat(weight);
    const v = parseFloat(volume);
    const p = parseFloat(percentage);
    const h = parseFloat(hours);
    if (w > 0 && v > 0 && p > 0) {
      const bac = estimateBloodAlcohol(w, v, p, h, sex === "male");
      setResult(bac);
    }
  }

  function getStatus(bac: number) {
    if (bac < 0.2) return { label: "Sous le seuil légal", color: "text-green-600", bg: "bg-green-500/10" };
    if (bac < 0.5) return { label: "Attention", color: "text-amber-600", bg: "bg-amber-500/10" };
    if (bac < 0.8) return { label: "Dépassement seuil (0,50 g/L)", color: "text-orange-600", bg: "bg-orange-500/10" };
    return { label: "Dépassement seuil aggravé (0,80 g/L)", color: "text-red-600", bg: "bg-red-500/10" };
  }

  return (
    <div className="space-y-6">
      <Card className="border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Estimation théorique basée sur la formule de Widmark. Seul un éthylotest homologué ou une prise de sang fait foi. Ne pas utiliser comme preuve.
          </p>
        </div>
      </Card>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Poids" type="number" unit="kg" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="75" />
          <Select
            label="Sexe"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            options={[
              { value: "male", label: "Homme" },
              { value: "female", label: "Femme" },
            ]}
          />
          <Input label="Volume consommé" type="number" unit="cl" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="75" />
          <Input label="Degré d'alcool" type="number" unit="%" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="12" />
          <Input label="Heures écoulées" type="number" unit="h" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="0" />
        </div>
        <Button className="mt-6" onClick={handleCalculate}>Estimer</Button>
      </Card>

      {result !== null && (
        <>
          <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
            <p className="text-sm text-[var(--muted)]">Alcoolémie estimée</p>
            <p className="mt-1 text-3xl font-bold text-[var(--accent)]">{result.toFixed(2)} g/L</p>
          </Card>
          <Card>
            <div className={`rounded-lg px-4 py-3 text-sm font-medium ${getStatus(result).bg} ${getStatus(result).color}`}>
              {getStatus(result).label}
            </div>
            <div className="mt-4 space-y-2 text-xs text-[var(--muted)]">
              <p>Seuil conducteur standard : 0,50 g/L</p>
              <p>Seuil jeune conducteur (&lt; 3 ans permis) : 0,20 g/L</p>
              <p>Seuil aggravé (délit) : 0,80 g/L</p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
