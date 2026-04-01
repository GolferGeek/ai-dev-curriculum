import { useEffect, useMemo, useState } from "react";
import { loadCrm, saveCrm } from "./storage";
import type { CrmState, Deal, Stage } from "./types";
import { STAGES, defaultCrm } from "./types";

export function App() {
  const [state, setState] = useState<CrmState>(() => loadCrm() ?? defaultCrm());

  useEffect(() => {
    saveCrm(state);
  }, [state]);

  const filtered = useMemo(() => {
    const q = state.filter.trim().toLowerCase();
    if (!q) return state.deals;
    return state.deals.filter((d) => d.title.toLowerCase().includes(q));
  }, [state.deals, state.filter]);

  const byStage = (stage: Stage) => filtered.filter((d) => d.stage === stage);

  const selected = state.deals.find((d) => d.id === state.selectedId) ?? null;

  const move = (id: string, stage: Stage) => {
    setState((s) => ({
      ...s,
      deals: s.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
    }));
  };

  const addNote = (id: string, text: string) => {
    const note = { at: Date.now(), text };
    setState((s) => ({
      ...s,
      deals: s.deals.map((d) =>
        d.id === id ? { ...d, notes: [note, ...d.notes] } : d
      ),
    }));
  };

  return (
    <div className="crm">
      <header>
        <h1>Pipeline CRM</h1>
        <input
          type="search"
          placeholder="Filter by title…"
          value={state.filter}
          onChange={(e) => setState((s) => ({ ...s, filter: e.target.value }))}
          data-testid="crm-filter"
          aria-label="Filter deals"
        />
      </header>
      <div className="board">
        {STAGES.map((stage) => (
          <section key={stage} className="col" aria-labelledby={`st-${stage}`}>
            <h2 id={`st-${stage}`}>{stage}</h2>
            <ul>
              {byStage(stage).map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    className="card"
                    onClick={() => setState((s) => ({ ...s, selectedId: d.id }))}
                    data-testid={`deal-${d.id}`}
                  >
                    {d.title}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {selected && (
        <div className="drawer" role="dialog" aria-label="Deal detail">
          <div className="drawer-inner">
            <h3>{selected.title}</h3>
            <label>
              Stage
              <select
                value={selected.stage}
                onChange={(e) => move(selected.id, e.target.value as Stage)}
                data-testid="stage-select"
              >
                {STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </label>
            <p>
              Owner: {selected.owner ?? "—"} · Amount:{" "}
              {selected.amount != null ? `$${selected.amount}` : "—"}
            </p>
            <Notes deal={selected} onAdd={(t) => addNote(selected.id, t)} />
            <button type="button" onClick={() => setState((s) => ({ ...s, selectedId: null }))}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Notes({ deal, onAdd }: { deal: Deal; onAdd: (t: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="notes">
      <h4>Activity</h4>
      <ul data-testid="notes-list">
        {deal.notes.map((n, i) => (
          <li key={i}>
            {new Date(n.at).toLocaleString()} — {n.text}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onAdd(text.trim());
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add note"
          data-testid="note-input"
        />
        <button type="submit" data-testid="note-add">
          Add note
        </button>
      </form>
    </div>
  );
}
