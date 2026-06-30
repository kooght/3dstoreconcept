"use client";

import { useState } from "react";
import { generateReference } from "@/lib/tools/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy, Check } from "lucide-react";

export function ReferenceTool() {
  const [prefix, setPrefix] = useState("PV");
  const [unit, setUnit] = useState("COB");
  const [sequence, setSequence] = useState("1");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    const seq = parseInt(sequence) || 1;
    setResult(generateReference(prefix.toUpperCase(), unit.toUpperCase(), seq));
    setCopied(false);
  }

  async function handleCopy() {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Paramètres de référence</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input label="Préfixe" type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="PV" />
          <Input label="Unité / Brigade" type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="COB" />
          <Input label="Numéro séquentiel" type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} placeholder="1" />
        </div>
        <Button className="mt-6" onClick={handleGenerate}>Générer la référence</Button>
      </Card>

      {result && (
        <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <p className="text-sm text-[var(--muted)]">Référence générée</p>
          <div className="mt-2 flex items-center gap-3">
            <p className="font-mono text-2xl font-bold text-[var(--accent)]">{result}</p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Format : PRÉFIXE-UNITÉ-AAAAMM-NNNN. Adaptez le préfixe et l&apos;unité selon les conventions de votre compagnie ou brigade.
        </p>
      </Card>
    </div>
  );
}
