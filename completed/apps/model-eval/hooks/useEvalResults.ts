"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { EvalRun } from "@/lib/types";

interface EvalResultsHook {
  results: EvalRun | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEvalResults(pollIntervalMs = 3000): EvalResultsHook {
  const [results, setResults] = useState<EvalRun | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch("/api/eval/results");
      if (!res.ok) {
        if (res.status === 404) {
          setResults(null);
          setError(null);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data: EvalRun = await res.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch results");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
    intervalRef.current = setInterval(fetchResults, pollIntervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchResults, pollIntervalMs]);

  return { results, isLoading, error, refetch: fetchResults };
}
