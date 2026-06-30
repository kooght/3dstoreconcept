"use client";

import { useState } from "react";
import { calculateSpeed, calculateDistance, calculateTime } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Mode = "speed" | "distance" | "time";

export function VitesseTool() {
  const [mode, setMode] = useState<Mode>("speed");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function getTimeInHours(): number {
    const t = parseFloat(time);
    if (timeUnit === "minutes") return t / 60;
    if (timeUnit === "seconds") return t / 3600;
    return t;
  }

  function handleCalculate() {
    if (mode === "speed") {
      const d = parseFloat(distance);
      const t = getTimeInHours();
      if (d > 0 && t > 0) {
        const v = calculateSpeed(d, t);
        setResult(`${v.toFixed(2)} km/h`);
      }
    } else if (mode === "distance") {
      const v = parseFloat(speed);
      const t = getTimeInHours();
      if (v > 0 && t > 0) {
        const d = calculateDistance(v, t);
        setResult(`${d.toFixed(3)} km (${(d * 1000).toFixed(1)} m)`);
      }
    } else {
      const v = parseFloat(speed);
      const d = parseFloat(distance);
      if (v > 0 && d > 0) {
        const t = calculateTime(v, d);
        const hours = Math.floor(t);
        const minutes = Math.round((t - hours) * 60);
        setResult(`${t.toFixed(4)} h (${hours}h ${minutes}min)`);
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Type de calcul</CardTitle>
        <div className="mt-4 flex flex-wrap gap-2">
          {([
            ["speed", "Calculer la vitesse"],
            ["distance", "Calculer la distance"],
            ["time", "Calculer le temps"],
          ] as const).map(([value, label]) => (
            <Button
              key={value}
              variant={mode === value ? "primary" : "secondary"}
              size="sm"
              onClick={() => { setMode(value); setResult(null); }}
            >
              {label}
            </Button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {(mode === "speed" || mode === "time") && (
            <Input
              label="Distance"
              type="number"
              unit="km"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Ex: 1.5"
            />
          )}
          {(mode === "speed" || mode === "distance") && (
            <>
              <Input
                label="Temps"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 45"
              />
              <Select
                label="Unité de temps"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                options={[
                  { value: "hours", label: "Heures" },
                  { value: "minutes", label: "Minutes" },
                  { value: "seconds", label: "Secondes" },
                ]}
              />
            </>
          )}
          {(mode === "distance" || mode === "time") && (
            <Input
              label="Vitesse"
              type="number"
              unit="km/h"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="Ex: 90"
            />
          )}
        </div>
        <Button className="mt-6" onClick={handleCalculate}>
          Calculer
        </Button>
      </Card>

      {result && (
        <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <p className="text-sm text-[var(--muted)]">Résultat</p>
          <p className="mt-1 text-3xl font-bold text-[var(--accent)]">{result}</p>
        </Card>
      )}

      <Card>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Formules : V = D/T · D = V×T · T = D/V. Utile pour la reconstitution d&apos;accidents et l&apos;analyse de scènes.
        </p>
      </Card>
    </div>
  );
}
