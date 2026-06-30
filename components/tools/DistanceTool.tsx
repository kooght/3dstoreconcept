"use client";

import { useState } from "react";
import { haversineDistance } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function DistanceTool() {
  const [lat1, setLat1] = useState("");
  const [lon1, setLon1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lon2, setLon2] = useState("");
  const [result, setResult] = useState<{ km: number; m: number } | null>(null);

  function handleCalculate() {
    const a = parseFloat(lat1);
    const b = parseFloat(lon1);
    const c = parseFloat(lat2);
    const d = parseFloat(lon2);
    if ([a, b, c, d].every((v) => !isNaN(v))) {
      const km = haversineDistance(a, b, c, d);
      setResult({ km, m: km * 1000 });
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Point A (départ)</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Latitude" type="number" value={lat1} onChange={(e) => setLat1(e.target.value)} placeholder="48.8566" unit="°" />
          <Input label="Longitude" type="number" value={lon1} onChange={(e) => setLon1(e.target.value)} placeholder="2.3522" unit="°" />
        </div>
      </Card>

      <Card>
        <CardTitle>Point B (arrivée)</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Latitude" type="number" value={lat2} onChange={(e) => setLat2(e.target.value)} placeholder="45.7640" unit="°" />
          <Input label="Longitude" type="number" value={lon2} onChange={(e) => setLon2(e.target.value)} placeholder="4.8357" unit="°" />
        </div>
      </Card>

      <Button onClick={handleCalculate}>Calculer la distance</Button>

      {result && (
        <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <p className="text-sm text-[var(--muted)]">Distance (formule de Haversine)</p>
          <p className="mt-1 text-3xl font-bold text-[var(--accent)]">{result.km.toFixed(3)} km</p>
          <p className="mt-1 text-lg text-[var(--foreground)]">{result.m.toFixed(1)} mètres</p>
        </Card>
      )}
    </div>
  );
}
