"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signoutAction } from "@/lib/actions";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Invoices", href: "/invoices", icon: "📄" },
  { label: "Expenses", href: "/expenses", icon: "💸" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">QB Killer</h1>
        <p className="text-slate-400 text-sm mt-1">Invoice & Expense Tracker</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <form action={signoutAction}>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-left"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
