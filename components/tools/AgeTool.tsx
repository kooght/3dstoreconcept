"use client";

import { useState } from "react";
import { calculateAge } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AgeTool() {
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  function handleCalculate() {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const ref = new Date(referenceDate);
    if (birth <= ref) {
      setResult(calculateAge(birth, ref));
    }
  }

  const isMinor = result && result.years < 18;
  const isMajor = result && result.years >= 18;

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Date de naissance"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            label="Date de référence"
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
          />
        </div>
        <Button className="mt-6" onClick={handleCalculate}>Calculer l&apos;âge</Button>
      </Card>

      {result && (
        <>
          <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
            <p className="text-sm text-[var(--muted)]">Âge exact</p>
            <p className="mt-1 text-3xl font-bold text-[var(--accent)]">
              {result.years} ans, {result.months} mois et {result.days} jours
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Soit {result.totalDays.toLocaleString("fr-FR")} jours au total
            </p>
          </Card>

          <Card>
            <CardTitle>Statut juridique</CardTitle>
            <div className="mt-3 space-y-2">
              {isMinor && (
                <p className="rounded-lg bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
                  Personne mineure (moins de 18 ans) — Procédures spécifiques applicables
                </p>
              )}
              {isMajor && (
                <p className="rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-700">
                  Personne majeure (18 ans ou plus)
                </p>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
