"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";

type ConversionType = "speed" | "distance" | "weight";

const conversions: Record<ConversionType, { units: { value: string; label: string; factor: number }[] }> = {
  speed: {
    units: [
      { value: "kmh", label: "km/h", factor: 1 },
      { value: "ms", label: "m/s", factor: 3.6 },
      { value: "knots", label: "nœuds", factor: 1.852 },
      { value: "mph", label: "mph", factor: 1.60934 },
    ],
  },
  distance: {
    units: [
      { value: "km", label: "km", factor: 1 },
      { value: "m", label: "mètres", factor: 0.001 },
      { value: "miles", label: "miles", factor: 1.60934 },
      { value: "nmi", label: "milles nautiques", factor: 1.852 },
    ],
  },
  weight: {
    units: [
      { value: "kg", label: "kg", factor: 1 },
      { value: "g", label: "grammes", factor: 0.001 },
      { value: "lb", label: "livres", factor: 0.453592 },
    ],
  },
};

export function ConvertisseurTool() {
  const [type, setType] = useState<ConversionType>("speed");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kmh");

  const units = conversions[type].units;
  const numValue = parseFloat(value);

  const results = !isNaN(numValue)
    ? units.map((unit) => {
        const fromFactor = units.find((u) => u.value === fromUnit)?.factor || 1;
        const baseValue = numValue * fromFactor;
        const converted = baseValue / unit.factor;
        return { unitKey: unit.value, label: unit.label, converted };
      })
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <Select
          label="Type de conversion"
          value={type}
          onChange={(e) => {
            setType(e.target.value as ConversionType);
            setFromUnit(conversions[e.target.value as ConversionType].units[0].value);
            setValue("");
          }}
          options={[
            { value: "speed", label: "Vitesse" },
            { value: "distance", label: "Distance" },
            { value: "weight", label: "Poids" },
          ]}
        />
      </Card>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Valeur"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="100"
          />
          <Select
            label="Unité source"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            options={units.map((u) => ({ value: u.value, label: u.label }))}
          />
        </div>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardTitle>Résultats</CardTitle>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {results.map((r) => (
              <div
                key={r.unitKey}
                className={`rounded-lg px-4 py-3 ${r.unitKey === fromUnit ? "bg-[var(--accent)]/10 border border-[var(--accent)]/30" : "bg-[var(--sidebar-hover)]"}`}
              >
                <p className="text-xs text-[var(--muted)]">{r.label}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-[var(--foreground)]">
                  {r.converted.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
