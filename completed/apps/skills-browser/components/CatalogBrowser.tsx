"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CapabilityEntry } from "@/lib/types";

const levelNames = ["", "Apprentice", "Builder", "Arsenal", "Strategist", "Architect"];

export default function CatalogBrowser({ entries }: { entries: CapabilityEntry[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [maturity, setMaturity] = useState("all");
  const [risk, setRisk] = useState("all");
  const [category, setCategory] = useState("all");
  const [harness, setHarness] = useState("all");
  const [sort, setSort] = useState("name");
  const categories = useMemo(() => [...new Set(entries.map((entry) => entry.category))].sort(), [entries]);
  const harnesses = useMemo(() => [...new Set(entries.flatMap((entry) => entry.supportedHarnesses))].sort(), [entries]);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const result = entries.filter((entry) => {
      const searchable = `${entry.name} ${entry.description} ${entry.content}`.toLowerCase();
      return (!search || search.length < 2 || searchable.includes(search)) &&
        (kind === "all" || entry.kind === kind) &&
        (maturity === "all" || entry.maturity === maturity) &&
        (risk === "all" || entry.risk === risk) &&
        (category === "all" || entry.category === category) &&
        (harness === "all" || entry.supportedHarnesses.includes(harness));
    });
    return result.sort((a, b) => sort === "level" ? b.level - a.level || a.name.localeCompare(b.name) : sort === "risk" ? b.risk.localeCompare(a.risk) : a.name.localeCompare(b.name));
  }, [entries, query, kind, maturity, risk, category, harness, sort]);
  const clear = () => { setQuery(""); setKind("all"); setMaturity("all"); setRisk("all"); setCategory("all"); setHarness("all"); setSort("name"); };

  return (
    <section className="catalog-shell">
      <aside className="filters" aria-label="Catalog filters">
        <div className="filter-heading"><h2>Filter the record</h2><button onClick={clear}>Clear all</button></div>
        <label>Search<input aria-label="Search capabilities" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, purpose, or instruction" /></label>
        <label>Kind<select aria-label="Filter by kind" value={kind} onChange={(event) => setKind(event.target.value)}><option value="all">All kinds</option><option value="skill">Skills</option><option value="agent">Agents</option></select></label>
        <label>Category<select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Harness<select aria-label="Filter by harness" value={harness} onChange={(event) => setHarness(event.target.value)}><option value="all">All harnesses</option>{harnesses.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Trust state<select aria-label="Filter by maturity" value={maturity} onChange={(event) => setMaturity(event.target.value)}><option value="all">All review states</option><option value="candidate">Candidate</option><option value="evaluated">Evaluated</option><option value="approved">Approved</option><option value="restricted">Restricted</option><option value="retired">Retired</option></select></label>
        <label>Risk<select aria-label="Filter by risk" value={risk} onChange={(event) => setRisk(event.target.value)}><option value="all">All risk levels</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
        <div className="filter-note"><strong>No one-click install.</strong><span>Discovery preserves uncertainty until an authorized evaluation changes the record.</span></div>
      </aside>
      <div className="catalog-results">
        <div className="results-bar"><div><span className="eyebrow">CURRENT SNAPSHOT</span><h2>Showing {filtered.length} of {entries.length}</h2></div><label>Sort<select aria-label="Sort capabilities" value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Name</option><option value="level">Level</option><option value="risk">Risk</option></select></label></div>
        {filtered.length ? <div className="card-grid">{filtered.map((entry) => (
          <Link className="capability-card" href={`/capabilities/${entry.id}`} key={entry.id}>
            <div className="card-top"><span className={`kind ${entry.kind}`}>{entry.kind}</span><span className={`risk ${entry.risk}`}>{entry.risk} risk</span></div>
            <h3>{entry.name}</h3><p>{entry.description}</p>
            <div className="level" aria-label={`Level ${entry.level}, ${levelNames[entry.level]}`}><span>{Array.from({ length: 5 }, (_, index) => <i className={index < entry.level ? "filled" : ""} key={index} />)}</span>{levelNames[entry.level]}</div>
            <div className="card-meta"><span>{entry.function}</span><span>{entry.type === "capability" ? "CAP" : "PREF"}</span><span>{entry.maturity}</span></div>
          </Link>
        ))}</div> : <div className="empty"><h3>No capabilities match</h3><p>Try broadening the search or clearing one of the trust, risk, or harness filters.</p><button onClick={clear}>Clear filters</button></div>}
      </div>
    </section>
  );
}
