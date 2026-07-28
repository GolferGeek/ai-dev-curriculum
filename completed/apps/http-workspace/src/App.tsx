import { useCallback, useEffect, useMemo, useState } from "react";
import { loadState, saveState } from "./storage";
import type { AppState, HistoryEntry, RequestDef } from "./types";
import { defaultState } from "./types";

function applyVars(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

type Tab = "collections" | "request" | "environments" | "history";

export function App() {
  const [tab, setTab] = useState<Tab>("request");
  const [state, setState] = useState<AppState>(() => loadState() ?? defaultState());
  const [response, setResponse] = useState<{
    status: number;
    ms: number;
    body: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const env = useMemo(
    () => state.environments.find((e) => e.id === state.activeEnvId),
    [state.environments, state.activeEnvId]
  );
  const vars = env?.vars ?? {};

  const activeReq = useMemo(() => {
    const c = state.collections.find((x) => x.id === state.activeCollectionId);
    return c?.requests.find((r) => r.id === state.activeRequestId);
  }, [state.collections, state.activeCollectionId, state.activeRequestId]);

  const resolvedUrl = activeReq ? applyVars(activeReq.url, vars) : "";

  const updateRequest = useCallback((patch: Partial<RequestDef>) => {
    if (!activeReq) return;
    setState((s) => ({
      ...s,
      collections: s.collections.map((c) =>
        c.id !== s.activeCollectionId
          ? c
          : {
              ...c,
              requests: c.requests.map((r) =>
                r.id === activeReq.id ? { ...r, ...patch } : r
              ),
            }
      ),
    }));
  }, [activeReq]);

  const send = useCallback(async () => {
    if (!activeReq) return;
    const url = applyVars(activeReq.url, vars);
    const t0 = performance.now();
    try {
      const headers: Record<string, string> = {};
      if (activeReq.headersText?.trim()) {
        Object.assign(headers, JSON.parse(activeReq.headersText) as Record<string, string>);
      }
      const init: RequestInit = { method: activeReq.method, headers };
      if (activeReq.body && ["POST", "PUT", "PATCH"].includes(activeReq.method)) {
        init.body = activeReq.body;
      }
      const res = await fetch(url, init);
      const text = await res.text();
      const ms = Math.round(performance.now() - t0);
      const snippet = text.slice(0, 4000);
      setResponse({ status: res.status, ms, body: snippet });
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        at: Date.now(),
        method: activeReq.method,
        url,
        status: res.status,
        ms,
        snippet,
      };
      setState((s) => ({
        ...s,
        history: [entry, ...s.history].slice(0, 50),
      }));
    } catch (e) {
      const ms = Math.round(performance.now() - t0);
      const msg = e instanceof Error ? e.message : String(e);
      setResponse({ status: 0, ms, body: "", error: msg });
      setState((s) => ({
        ...s,
        history: [
          {
            id: crypto.randomUUID(),
            at: Date.now(),
            method: activeReq.method,
            url,
            status: 0,
            ms,
            snippet: "",
            error: msg,
          },
          ...s.history,
        ].slice(0, 50),
      }));
    }
  }, [activeReq, vars]);

  const openHistoryEntry = useCallback((h: HistoryEntry) => {
    setTab("request");
    setResponse({
      status: h.status,
      ms: h.ms,
      body: h.snippet,
      error: h.error,
    });
  }, []);

  return (
    <div className="shell">
      <header className="top">
        <h1>HTTP Workspace</h1>
        <p className="sub">Collections, environments, send, history — local-first (localStorage).</p>
        <nav className="tabs" aria-label="Main">
          {(
            [
              ["collections", "Collections"],
              ["request", "Request"],
              ["environments", "Environments"],
              ["history", "History"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={tab === k ? "active" : ""}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {tab === "collections" && (
        <CollectionsPane
          state={state}
          setState={setState}
        />
      )}
      {tab === "request" && (
        <section className="panel" aria-labelledby="req-h">
          <h2 id="req-h">Request</h2>
          <div className="row">
            <label>
              Collection
              <select
                value={state.activeCollectionId}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    activeCollectionId: e.target.value,
                    activeRequestId:
                      s.collections.find((c) => c.id === e.target.value)?.requests[0]?.id ?? "",
                  }))
                }
              >
                {state.collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Request
              <select
                value={state.activeRequestId}
                onChange={(e) => setState((s) => ({ ...s, activeRequestId: e.target.value }))}
              >
                {(state.collections.find((c) => c.id === state.activeCollectionId)?.requests ?? []).map(
                  (r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  )
                )}
              </select>
            </label>
            <label>
              Environment
              <select
                value={state.activeEnvId}
                onChange={(e) => setState((s) => ({ ...s, activeEnvId: e.target.value }))}
              >
                {state.environments.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {activeReq && (
            <>
              <div className="row">
                <label>
                  Method
                  <select
                    value={activeReq.method}
                    onChange={(e) => updateRequest({ method: e.target.value })}
                  >
                    {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                URL (use {"{{baseUrl}}"} etc.)
                <input
                  value={activeReq.url}
                  onChange={(e) => updateRequest({ url: e.target.value })}
                />
              </label>
              <p className="resolved">
                Resolved: <code data-testid="resolved-url">{resolvedUrl || "(empty)"}</code>
              </p>
              <label className="block">
                Headers (JSON)
                <textarea
                  rows={3}
                  value={activeReq.headersText ?? ""}
                  onChange={(e) => updateRequest({ headersText: e.target.value })}
                />
              </label>
              <label className="block">
                Body
                <textarea
                  rows={4}
                  value={activeReq.body ?? ""}
                  onChange={(e) => updateRequest({ body: e.target.value })}
                />
              </label>
              <button type="button" className="primary" onClick={send} data-testid="send-btn">
                Send
              </button>
            </>
          )}
          <div className="response" role="region" aria-label="Response">
            <h3>Response</h3>
            {response ? (
              <>
                <p data-testid="resp-status">
                  Status: {response.status} · {response.ms}ms
                </p>
                {response.error && <p className="err">{response.error}</p>}
                <pre data-testid="resp-body">{response.body || "(empty)"}</pre>
              </>
            ) : (
              <p className="muted">Run a request to see status and body.</p>
            )}
          </div>
        </section>
      )}

      {tab === "environments" && (
        <EnvironmentsPane state={state} setState={setState} />
      )}
      {tab === "history" && (
        <section className="panel" aria-labelledby="hist-h">
          <h2 id="hist-h">History</h2>
          {state.history.length === 0 ? (
            <p className="muted">No runs yet.</p>
          ) : (
            <ul className="hist-list">
              {state.history.map((h) => (
                <li key={h.id}>
                  <button type="button" className="linkish" onClick={() => openHistoryEntry(h)}>
                    {new Date(h.at).toLocaleString()}
                  </button>{" "}
                  · {h.method} · {h.status} · {h.ms}ms · <code>{h.url.slice(0, 80)}</code>
                  {h.error && <span className="err"> {h.error}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

function CollectionsPane({
  state,
  setState,
}: {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}) {
  const addColl = () => {
    const id = crypto.randomUUID();
    setState((s) => ({
      ...s,
      collections: [...s.collections, { id, name: "New collection", requests: [] }],
      activeCollectionId: id,
    }));
  };
  const addReq = (collId: string) => {
    const id = crypto.randomUUID();
    setState((s) => ({
      ...s,
      collections: s.collections.map((c) =>
        c.id !== collId
          ? c
          : {
              ...c,
              requests: [
                ...c.requests,
                {
                  id,
                  name: "New request",
                  method: "GET",
                  url: "{{baseUrl}}/get",
                },
              ],
            }
      ),
      activeRequestId: id,
    }));
  };

  return (
    <section className="panel" aria-labelledby="col-h">
      <h2 id="col-h">Collections</h2>
      <button type="button" onClick={addColl}>
        New collection
      </button>
      {state.collections.map((c) => (
        <div key={c.id} className="card">
          <input
            value={c.name}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                collections: s.collections.map((x) =>
                  x.id === c.id ? { ...x, name: e.target.value } : x
                ),
              }))
            }
          />
          <button type="button" onClick={() => addReq(c.id)}>
            Add request
          </button>
          <ul>
            {c.requests.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      activeCollectionId: c.id,
                      activeRequestId: r.id,
                    }))
                  }
                >
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function EnvironmentsPane({
  state,
  setState,
}: {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}) {
  const addEnv = () => {
    const id = crypto.randomUUID();
    setState((s) => ({
      ...s,
      environments: [
        ...s.environments,
        { id, name: "New env", vars: { baseUrl: "https://httpbin.org" } },
      ],
      activeEnvId: id,
    }));
  };

  return (
    <section className="panel" aria-labelledby="env-h">
      <h2 id="env-h">Environments</h2>
      <button type="button" onClick={addEnv}>
        New environment
      </button>
      {state.environments.map((e) => (
        <div key={e.id} className="card">
          <input
            value={e.name}
            onChange={(ev) =>
              setState((s) => ({
                ...s,
                environments: s.environments.map((x) =>
                  x.id === e.id ? { ...x, name: ev.target.value } : x
                ),
              }))
            }
          />
          <label>
            baseUrl
            <input
              value={e.vars.baseUrl ?? ""}
              onChange={(ev) =>
                setState((s) => ({
                  ...s,
                  environments: s.environments.map((x) =>
                    x.id === e.id
                      ? { ...x, vars: { ...x.vars, baseUrl: ev.target.value } }
                      : x
                  ),
                }))
              }
            />
          </label>
        </div>
      ))}
    </section>
  );
}
