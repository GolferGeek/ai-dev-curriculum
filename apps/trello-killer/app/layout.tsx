import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trello Killer",
  description: "Kanban board for project management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
