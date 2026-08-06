import CatalogBrowser from "@/components/CatalogBrowser";
import { catalog } from "@/lib/catalog";
export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">REVISION-SPECIFIC CAPABILITY DISCOVERY</p>
          <h1>Know what an AI capability does before you trust it.</h1>
          <p className="hero-copy">Browse the organization&apos;s reusable skills and specialized agents with their source, exact revision, requested authority, warnings, and review state intact.</p>
        </div>
        <div className="hero-proof" aria-label="Catalog summary">
          <strong>{catalog.totalCapabilities}</strong>
          <span>canonical capabilities</span>
          <small>{catalog.sources.length} dated snapshots · revision {catalog.sourceRevision.slice(0, 8)}</small>
        </div>
      </section>
      <CatalogBrowser entries={catalog.capabilities} />
    </main>
  );
}
