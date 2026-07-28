import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agent Protocol Dashboard',
  description: 'Visualize A2A, AP2, x402, and AG-UI protocols in action',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
