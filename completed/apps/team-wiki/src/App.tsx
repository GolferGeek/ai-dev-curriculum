import { useEffect, useMemo, useState } from "react";
import { loadWiki, saveWiki } from "./storage";
import type { Page, WikiState } from "./types";
import { defaultWiki } from "./types";

function Preview({ body }: { body: string }) {
  return (
    <div className="preview" data-testid="md-preview">
      {body.split("\n").map((line, i) => (
        <p key={i}>{line || "\u00a0"}</p>
      ))}
    </div>
  );
}

export function App() {
  const [state, setState] = useState<WikiState>(() => loadWiki() ?? defaultWiki());
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [search, setSearch] = useState("");

  useEffect(() => {
    saveWiki(state);
  }, [state]);

  const selected = state.pages.find((p) => p.id === state.selectedPageId) ?? null;

  const filteredPages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return state.pages;
    return state.pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }, [state.pages, search]);

  const updatePage = (id: string, patch: Partial<Page>) => {
    setState((s) => ({
      ...s,
      pages: s.pages.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p
      ),
    }));
  };

  const addPage = (spaceId: string) => {
    const id = crypto.randomUUID();
    setState((s) => ({
      ...s,
      pages: [
        ...s.pages,
        {
          id,
          spaceId,
          title: "New page",
          body: "# Title\nContent",
          updatedAt: Date.now(),
        },
      ],
      selectedPageId: id,
    }));
    setMode("edit");
  };

  const deletePage = (id: string) => {
    setState((s) => {
      const pages = s.pages.filter((p) => p.id !== id);
      return {
        ...s,
        pages,
        selectedPageId: pages[0]?.id ?? null,
      };
    });
  };

  return (
    <div className="wiki-layout">
      <header className="wiki-head">
        <h1>Team Wiki</h1>
        <input
          type="search"
          placeholder="Search pages…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search pages"
          data-testid="wiki-search"
        />
      </header>
      <div className="wiki-body">
        <aside className="tree" aria-label="Spaces and pages">
          {state.spaces.map((sp) => (
            <div key={sp.id} className="space">
              <div className="space-name">{sp.name}</div>
              <button type="button" onClick={() => addPage(sp.id)}>
                + Page
              </button>
              <ul>
                {filteredPages
                  .filter((p) => p.spaceId === sp.id)
                  .map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        className={state.selectedPageId === p.id ? "sel" : ""}
                        onClick={() => {
                          setState((s) => ({ ...s, selectedPageId: p.id }));
                          setMode("view");
                        }}
                      >
                        {p.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </aside>
        <main className="content">
          {selected ? (
            <>
              <div className="toolbar">
                <h2>{selected.title}</h2>
                <span className="meta">
                  Updated {new Date(selected.updatedAt).toLocaleString()}
                </span>
                <div className="modes">
                  <button
                    type="button"
                    className={mode === "view" ? "on" : ""}
                    onClick={() => setMode("view")}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className={mode === "edit" ? "on" : ""}
                    onClick={() => setMode("edit")}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => deletePage(selected.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <label className="sr-only" htmlFor="title-in">
                Title
              </label>
              <input
                id="title-in"
                className="title-input"
                value={selected.title}
                onChange={(e) => updatePage(selected.id, { title: e.target.value })}
                data-testid="page-title"
              />
              {mode === "view" ? (
                <Preview body={selected.body} />
              ) : (
                <textarea
                  className="editor"
                  rows={16}
                  value={selected.body}
                  onChange={(e) => updatePage(selected.id, { body: e.target.value })}
                  data-testid="page-body"
                />
              )}
            </>
          ) : (
            <p className="muted">Select or create a page.</p>
          )}
        </main>
      </div>
    </div>
  );
}
