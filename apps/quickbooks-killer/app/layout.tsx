import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickBooks Killer",
  description: "Simple invoicing and expense tracking for freelancers",
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
