"use client";

import { useState } from "react";
import { dmsToDecimal, decimalToDms } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function GpsTool() {
  const [mode, setMode] = useState<"dms-to-decimal" | "decimal-to-dms">("dms-to-decimal");
  const [degrees, setDegrees] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [direction, setDirection] = useState("N");
  const [isLatitude, setIsLatitude] = useState(true);
  const [decimal, setDecimal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleDmsToDecimal() {
    const d = parseFloat(degrees);
    const m = parseFloat(minutes);
    const s = parseFloat(seconds);
    if (!isNaN(d) && !isNaN(m) && !isNaN(s)) {
      const dec = dmsToDecimal(d, m, s, direction as "N" | "S" | "E" | "W");
      setResult(`${dec.toFixed(8)}°`);
    }
  }

  function handleDecimalToDms() {
    const dec = parseFloat(decimal);
    if (!isNaN(dec)) {
      const dms = decimalToDms(dec, isLatitude);
      setResult(`${dms.degrees}° ${dms.minutes}' ${dms.seconds}" ${dms.direction}`);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={mode === "dms-to-decimal" ? "primary" : "secondary"}
            size="sm"
            onClick={() => { setMode("dms-to-decimal"); setResult(null); }}
          >
            DMS → Décimal
          </Button>
          <Button
            variant={mode === "decimal-to-dms" ? "primary" : "secondary"}
            size="sm"
            onClick={() => { setMode("decimal-to-dms"); setResult(null); }}
          >
            Décimal → DMS
          </Button>
        </div>
      </Card>

      {mode === "dms-to-decimal" ? (
        <Card>
          <CardTitle>Degrés Minutes Secondes</CardTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Degrés" type="number" value={degrees} onChange={(e) => setDegrees(e.target.value)} placeholder="48" />
            <Input label="Minutes" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="51" />
            <Input label="Secondes" type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="24.12" />
            <Select
              label="Direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              options={[
                { value: "N", label: "Nord (N)" },
                { value: "S", label: "Sud (S)" },
                { value: "E", label: "Est (E)" },
                { value: "W", label: "Ouest (W)" },
              ]}
            />
          </div>
          <Button className="mt-6" onClick={handleDmsToDecimal}>Convertir</Button>
        </Card>
      ) : (
        <Card>
          <CardTitle>Coordonnée décimale</CardTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Valeur décimale" type="number" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="48.856614" />
            <Select
              label="Type"
              value={isLatitude ? "lat" : "lon"}
              onChange={(e) => setIsLatitude(e.target.value === "lat")}
              options={[
                { value: "lat", label: "Latitude" },
                { value: "lon", label: "Longitude" },
              ]}
            />
          </div>
          <Button className="mt-6" onClick={handleDecimalToDms}>Convertir</Button>
        </Card>
      )}

      {result && (
        <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <p className="text-sm text-[var(--muted)]">Résultat</p>
          <p className="mt-1 text-2xl font-bold font-mono text-[var(--accent)]">{result}</p>
        </Card>
      )}
    </div>
  );
}
