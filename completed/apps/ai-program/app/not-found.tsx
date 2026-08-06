import Link from "next/link";

export default function NotFound() {
  return <div className="page"><div className="error-page"><span className="eyebrow">404 · Record not found</span><h1>This program record does not exist.</h1><p>The folder may have moved or the source citation may be stale.</p><Link className="primary-button" href="/">Return to overview</Link></div></div>;
}
