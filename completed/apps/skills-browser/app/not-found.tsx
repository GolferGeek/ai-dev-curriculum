import Link from "next/link";
export default function NotFound() { return <main className="standard-page"><h1>Capability not found</h1><p>The requested revision is not present in this catalog snapshot.</p><Link href="/">Return to the catalog</Link></main>; }
