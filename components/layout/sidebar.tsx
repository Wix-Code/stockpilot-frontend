"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  Building2,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      {
        label: "Products",
        href: "/products",
        icon: Package,
      },
      {
        label: "Inventory",
        href: "/inventory",
        icon: Boxes,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        label: "Sales",
        href: "/sales",
        icon: ShoppingCart,
      },
      {
        label: "Purchases",
        href: "/purchases",
        icon: Truck,
      },
      {
        label: "Suppliers",
        href: "/suppliers",
        icon: Building2,
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Users",
        href: "/users",
        icon: Users,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-[#E4E0D6] bg-[#FBFAF6] lg:flex lg:flex-col">
      <div className="flex h-[78px] items-center border-b border-[#E4E0D6] px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green text-white shadow-sm">
            <Boxes size={21} strokeWidth={1.9} />
          </div>

          <div>
            <p className="text-[18px] font-bold tracking-[-0.03em] text-ink">
              StockPilot
            </p>
            <p className="text-[11px] font-medium text-stone">
              Inventory workspace
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-stone">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all",
                        active
                          ? "bg-green text-white shadow-sm"
                          : "text-ink-soft hover:bg-green-tint hover:text-green-deep",
                      ].join(" ")}
                    >
                      <Icon size={18} strokeWidth={1.8} />

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-[#E4E0D6] p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-green-tint"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-deep text-xs font-bold text-white">
            DA
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              Daniel Adeyemi
            </p>

            <p className="truncate text-[11px] text-stone">Business Owner</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
