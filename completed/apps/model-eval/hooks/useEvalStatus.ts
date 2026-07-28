"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { RunStatus } from "@/lib/types";

export interface EvalStatusData {
  status: RunStatus;
  completedGenerations: number;
  totalGenerations: number;
  currentModel: string | null;
  currentPrompt: string | null;
  currentRun: number | null;
}

interface EvalStatusHook {
  status: EvalStatusData;
  isLoading: boolean;
  error: string | null;
}

const DEFAULT_STATUS: EvalStatusData = {
  status: "idle",
  completedGenerations: 0,
  totalGenerations: 0,
  currentModel: null,
  currentPrompt: null,
  currentRun: null,
};

export function useEvalStatus(pollIntervalMs = 2000): EvalStatusHook {
  const [status, setStatus] = useState<EvalStatusData>(DEFAULT_STATUS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/eval/status");
      if (!res.ok) {
        if (res.status === 404) {
          setStatus(DEFAULT_STATUS);
          setError(null);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data: EvalStatusData = await res.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, pollIntervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchStatus, pollIntervalMs]);

  return { status, isLoading, error };
}
