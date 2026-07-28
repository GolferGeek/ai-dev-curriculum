import { useEffect, useState } from "react";
import { loadOps, saveOps } from "./storage";
import type { Check, OpsState } from "./types";
import { defaultOps } from "./types";

async function runCheck(c: Check): Promise<{ status: Check["status"]; detail: string }> {
  if (c.kind === "mock") {
    return { status: c.status, detail: c.detail };
  }
  if (!c.url) return { status: "fail", detail: "No URL" };
  const t0 = performance.now();
  try {
    const res = await fetch(c.url, { method: "GET" });
    const ms = Math.round(performance.now() - t0);
    if (res.ok) return { status: "ok", detail: `HTTP ${res.status} · ${ms}ms` };
    const txt = await res.text();
    return {
      status: res.status >= 500 ? "fail" : "warn",
      detail: `HTTP ${res.status}: ${txt.slice(0, 120)}`,
    };
  } catch (e) {
    return {
      status: "fail",
      detail: e instanceof Error ? e.message : String(e),
    };
  }
}

export function App() {
  const [state, setState] = useState<OpsState>(() => loadOps() ?? defaultOps());
  const [running, setRunning] = useState(false);
  const [logMsg, setLogMsg] = useState("");

  useEffect(() => {
    saveOps(state);
  }, [state]);

  const runAll = async () => {
    setRunning(true);
    const now = Date.now();
    const updates: Check[] = [];
    for (const c of state.checks) {
      const r = await runCheck(c);
      updates.push({
        ...c,
        status: r.status,
        detail: r.detail,
        lastRun: now,
      });
    }
    setState((s) => ({ ...s, checks: updates }));
    setRunning(false);
  };

  const addLog = () => {
    if (!logMsg.trim()) return;
    setState((s) => ({
      ...s,
      log: [
        {
          id: crypto.randomUUID(),
          at: Date.now(),
          severity: "manual",
          message: logMsg.trim(),
        },
        ...s.log,
      ],
    }));
    setLogMsg("");
  };

  return (
    <div className="ops">
      <header>
        <h1>Ops Pulse</h1>
        <button type="button" onClick={runAll} disabled={running} data-testid="run-checks">
          {running ? "Running…" : "Run checks"}
        </button>
      </header>
      <section className="checks" aria-label="Checks">
        {state.checks.map((c) => (
          <div key={c.id} className={`tile ${c.status}`} data-testid={`check-${c.id}`}>
            <div className="t-name">{c.name}</div>
            <div className="t-st">{c.status.toUpperCase()}</div>
            <div className="t-time">
              Last run:{" "}
              {c.lastRun ? new Date(c.lastRun).toLocaleString() : "—"}
            </div>
            <div className="t-detail">{c.detail}</div>
          </div>
        ))}
      </section>
      <section className="log-section">
        <h2>Incident log</h2>
        <div className="add-log">
          <input
            value={logMsg}
            onChange={(e) => setLogMsg(e.target.value)}
            placeholder="Add manual entry…"
            data-testid="log-input"
          />
          <button type="button" onClick={addLog} data-testid="log-add">
            Add entry
          </button>
        </div>
        <ul data-testid="log-list">
          {state.log.map((e) => (
            <li key={e.id}>
              {new Date(e.at).toLocaleString()} [{e.severity}] {e.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
