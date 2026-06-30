"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDuration } from "@/lib/utils";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

interface Lap {
  id: number;
  time: number;
  total: number;
}

export function ChronometreTool() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(accumulatedRef.current + Date.now() - startRef.current);
    }, 10);
    return () => clearInterval(interval);
  }, [running]);

  function handleStart() {
    startRef.current = Date.now();
    setRunning(true);
  }

  function handlePause() {
    accumulatedRef.current += Date.now() - startRef.current;
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
    accumulatedRef.current = 0;
  }

  function handleLap() {
    setLaps((prev) => [
      { id: prev.length + 1, time: elapsed - (prev[prev.length - 1]?.total || 0), total: elapsed },
      ...prev,
    ]);
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center">
          <p className="font-mono text-6xl font-bold tracking-wider text-[var(--foreground)]">
            {formatDuration(elapsed)}
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {!running ? (
            <Button onClick={handleStart} size="lg">
              <Play className="h-4 w-4" /> {elapsed > 0 ? "Reprendre" : "Démarrer"}
            </Button>
          ) : (
            <Button onClick={handlePause} variant="secondary" size="lg">
              <Pause className="h-4 w-4" /> Pause
            </Button>
          )}
          {running && (
            <Button onClick={handleLap} variant="secondary" size="lg">
              <Flag className="h-4 w-4" /> Tour
            </Button>
          )}
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </Card>

      {laps.length > 0 && (
        <Card>
          <p className="mb-4 text-sm font-medium text-[var(--foreground)]">Tours enregistrés</p>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {laps.map((lap) => (
              <div key={lap.id} className="flex items-center justify-between rounded-lg bg-[var(--sidebar-hover)] px-4 py-2.5">
                <span className="text-sm text-[var(--muted)]">Tour {lap.id}</span>
                <div className="text-right">
                  <span className="font-mono text-sm font-medium text-[var(--foreground)]">{formatDuration(lap.time)}</span>
                  <span className="ml-3 text-xs text-[var(--muted)]">Total: {formatDuration(lap.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
