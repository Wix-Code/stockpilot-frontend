"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

export type DashboardPeriod = "7" | "14" | "30" | "month" | "90";

interface Props {
  value: DashboardPeriod;
  onChange: (value: DashboardPeriod) => void;
}

const options = [
  {
    value: "7",
    label: "Last 7 days",
  },
  {
    value: "14",
    label: "Last 14 days",
  },
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "month",
    label: "This month",
  },
  {
    value: "90",
    label: "Last 90 days",
  },
];

export function PeriodDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((item) => item.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          h-10
          items-center
          gap-2
          rounded-xl
          border
          border-[#DDD8CC]
          bg-white
          px-3
          text-xs
          font-semibold
          text-ink-soft
          hover:bg-[#FBFAF6]
        "
      >
        <CalendarDays size={15} className="text-stone" />

        {selected?.label}

        <ChevronDown
          size={14}
          className={`
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            z-50
            w-44
            rounded-xl
            border
            border-[#E4E0D6]
            bg-white
            p-1
            shadow-xl
          "
        >
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value as DashboardPeriod);

                setOpen(false);
              }}
              className={`
                w-full
                rounded-lg
                px-3
                py-2.5
                text-left
                text-xs
                font-semibold

                ${
                  item.value === value
                    ? "bg-green-tint text-green-deep"
                    : "text-ink-soft hover:bg-[#F7F5F0]"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
