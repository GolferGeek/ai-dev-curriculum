"use client";
import { useState } from "react";

export default function CopySourceButton({ content, attribution }: { content: string; attribution: string }) {
  const [copied, setCopied] = useState(false);
  return <button className="primary-action" onClick={async () => { await navigator.clipboard.writeText(`${content}\n\nSource: ${attribution}`); setCopied(true); }}>{copied ? "Copied with attribution" : "Copy exact source"}</button>;
}
