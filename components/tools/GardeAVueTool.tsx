"use client";

import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDuration, formatDateTime } from "@/lib/utils";
import { AlertTriangle, Play, Pause, RotateCcw } from "lucide-react";

const LIMIT_24H = 24 * 60 * 60 * 1000;
const LIMIT_48H = 48 * 60 * 60 * 1000;

export function GardeAVueTool() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || !startTime) return;
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime.getTime());
    }, 100);
    return () => clearInterval(interval);
  }, [running, startTime]);

  function handleStart() {
    const now = new Date();
    setStartTime(now);
    setElapsed(0);
    setRunning(true);
  }

  function handleStop() {
    setRunning(false);
  }

  function handleReset() {
    setStartTime(null);
    setElapsed(0);
    setRunning(false);
  }

  const end24h = startTime ? new Date(startTime.getTime() + LIMIT_24H) : null;
  const end48h = startTime ? new Date(startTime.getTime() + LIMIT_48H) : null;
  const remaining24h = startTime ? LIMIT_24H - elapsed : LIMIT_24H;
  const remaining48h = startTime ? LIMIT_48H - elapsed : LIMIT_48H;

  const progress24 = Math.min((elapsed / LIMIT_24H) * 100, 100);
  const progress48 = Math.min((elapsed / LIMIT_48H) * 100, 100);

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center">
          <p className="text-sm text-[var(--muted)]">Durée écoulée</p>
          <p className="mt-2 font-mono text-5xl font-bold tracking-wider text-[var(--foreground)]">
            {formatDuration(elapsed)}
          </p>
          {startTime && (
            <p className="mt-2 text-sm text-[var(--muted)]">
              Début : {formatDateTime(startTime)}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {!running ? (
            <Button onClick={handleStart} size="lg">
              <Play className="h-4 w-4" /> Démarrer
            </Button>
          ) : (
            <Button onClick={handleStop} variant="secondary" size="lg">
              <Pause className="h-4 w-4" /> Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw className="h-4 w-4" /> Réinitialiser
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className={elapsed >= LIMIT_24H ? "border-amber-500/50" : ""}>
          <CardTitle>Limite 24 heures</CardTitle>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className={`h-full rounded-full transition-all ${progress24 >= 100 ? "bg-amber-500" : "bg-[var(--accent)]"}`}
              style={{ width: `${progress24}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Restant : <span className="font-mono font-medium text-[var(--foreground)]">{formatDuration(Math.max(0, remaining24h))}</span>
          </p>
          {end24h && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              Échéance : {formatDateTime(end24h)}
            </p>
          )}
        </Card>

        <Card className={elapsed >= LIMIT_48H ? "border-red-500/50" : ""}>
          <CardTitle>Limite 48 heures</CardTitle>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className={`h-full rounded-full transition-all ${progress48 >= 100 ? "bg-red-500" : "bg-[var(--accent)]"}`}
              style={{ width: `${progress48}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Restant : <span className="font-mono font-medium text-[var(--foreground)]">{formatDuration(Math.max(0, remaining48h))}</span>
          </p>
          {end48h && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              Échéance : {formatDateTime(end48h)}
            </p>
          )}
        </Card>
      </div>

      {elapsed >= LIMIT_24H && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-medium text-amber-600">Dépassement des 24 heures</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                La prolongation de la garde à vue nécessite l&apos;autorisation du procureur de la République (art. 63 CPP).
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
