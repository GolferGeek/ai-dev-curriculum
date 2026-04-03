export type CheckStatus = "ok" | "warn" | "fail";

export type Check = {
  id: string;
  name: string;
  kind: "http" | "mock";
  url?: string;
  status: CheckStatus;
  detail: string;
  lastRun: number | null;
};

export type LogEntry = {
  id: string;
  at: number;
  severity: string;
  message: string;
};

export type OpsState = {
  checks: Check[];
  log: LogEntry[];
};

export function defaultOps(): OpsState {
  return {
    checks: [
      {
        id: "c1",
        name: "httpbin GET",
        kind: "http",
        url: "https://httpbin.org/status/200",
        status: "ok",
        detail: "—",
        lastRun: null,
      },
      {
        id: "c2",
        name: "httpbin delay",
        kind: "http",
        url: "https://httpbin.org/delay/0",
        status: "ok",
        detail: "—",
        lastRun: null,
      },
      {
        id: "c3",
        name: "Simulated queue",
        kind: "mock",
        status: "warn",
        detail: "Backlog 12 (simulated)",
        lastRun: null,
      },
      {
        id: "c4",
        name: "Simulated payment API",
        kind: "mock",
        status: "fail",
        detail: "HTTP 503: upstream timeout — retry policy engaged",
        lastRun: null,
      },
    ],
    log: [
      {
        id: "l0",
        at: Date.now() - 3600000,
        severity: "info",
        message: "Seed: dashboard loaded",
      },
    ],
  };
}
