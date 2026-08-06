import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Capability Registry",
  description: "A provenance-aware browser for reusable AI skills and specialized agents"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Capability Registry home">
            <span className="brand-mark">C</span>
            <span><strong>Capability Registry</strong><small>Skills · agents · evidence</small></span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Catalog</Link>
            <Link href="/sources">Sources & runs</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/evaluations">Evaluations</Link>
          </nav>
        </header>
        {children}
        <footer>
          <strong>Discovery is not approval.</strong> Review exact content, authority, revision, and evidence before adoption.
        </footer>
      </body>
    </html>
  );
}
