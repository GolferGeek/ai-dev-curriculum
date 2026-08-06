import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgramShell } from "@/src/components/ProgramShell";
import { loadActiveProgramSnapshot } from "@/src/lib/active-program";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI Program", template: "%s · AI Program" },
  description: "A repository-backed AI Governance and GRC operating interface.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const snapshot = await loadActiveProgramSnapshot();
  return (
    <html lang="en">
      <body><ProgramShell snapshot={snapshot}>{children}</ProgramShell></body>
    </html>
  );
}
