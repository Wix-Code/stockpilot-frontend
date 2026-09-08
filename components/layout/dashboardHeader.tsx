"use client";

import { Bell, CalendarDays, ChevronDown, Plus, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="mb-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-stone">
            Sunday, 7 September
          </p>

          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.035em] text-ink sm:text-[32px]">
            Good morning, Daniel
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative hidden md:block">
            <Search
              size={17}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone"
            />

            <input
              placeholder="Search..."
              className="
                h-11 w-[220px] rounded-xl
                border border-[#DDD8CC]
                bg-white pl-10 pr-4
                text-sm text-ink
                outline-none
                transition-all
                placeholder:text-stone
                focus:border-green
                focus:ring-4
                focus:ring-green/10
              "
            />
          </div>

          <button
            type="button"
            className="
              flex h-11 items-center gap-2
              rounded-xl border border-[#DDD8CC]
              bg-white px-3.5
              text-sm font-semibold text-ink-soft
              transition-colors
              hover:border-[#C7C0B1]
              hover:bg-[#FBFAF6]
            "
          >
            <CalendarDays size={17} strokeWidth={1.8} className="text-stone" />
            Today
            <ChevronDown size={15} className="text-stone" />
          </button>

          <button
            type="button"
            className="
              relative flex h-11 w-11
              items-center justify-center
              rounded-xl border border-[#DDD8CC]
              bg-white text-ink-soft
              transition-colors
              hover:bg-[#FBFAF6]
            "
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-terracotta ring-2 ring-white" />
          </button>

          <button
            type="button"
            className="
              flex h-11 items-center gap-2
              rounded-xl bg-green px-4
              text-sm font-bold text-white
              shadow-[0_5px_14px_rgba(47,104,68,0.18)]
              transition-all
              hover:bg-green-deep
            "
          >
            <Plus size={17} strokeWidth={2} />
            New sale
          </button>
        </div>
      </div>
    </header>
  );
}
