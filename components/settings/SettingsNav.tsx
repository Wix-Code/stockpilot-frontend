"use client";

import { Bell, Building2, Package, ShieldCheck } from "lucide-react";

export type SettingsSection =
  | "business"
  | "inventory"
  | "notifications"
  | "security";

interface SettingsNavProps {
  active: SettingsSection;

  onChange: (value: SettingsSection) => void;
}

const items = [
  {
    id: "business",
    label: "Business profile",
    icon: Building2,
  },

  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },

  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
] satisfies {
  id: SettingsSection;
  label: string;
  icon: typeof Building2;
}[];

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const selected = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`
                flex w-full
                items-center gap-3
                rounded-xl
                px-3.5 py-3
                text-left
                text-sm font-semibold
                transition-colors

                ${
                  selected
                    ? "bg-green-tint text-green-deep"
                    : "text-ink-soft hover:bg-[#F7F5F0]"
                }
              `}
          >
            <Icon size={17} />

            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
