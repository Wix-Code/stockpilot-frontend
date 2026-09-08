"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { SelectDropdown } from "../reuseable/SelectDropdown";

interface SupplierToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
}

export function SupplierToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: SupplierToolbarProps) {
  const hasFilters = search.trim() !== "" || status !== "all";

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#E4E0D6] bg-white p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search supplier, contact, phone or email..."
          className="h-11 w-full rounded-xl border border-[#DDD8CC] bg-white pl-10 pr-4 text-sm text-ink outline-none placeholder:text-stone focus:border-green focus:ring-4 focus:ring-green/10"
        />
      </div>

      <div className="lg:w-[210px]">
        <SelectDropdown
          value={status}
          onChange={onStatusChange}
          icon={<SlidersHorizontal size={17} />}
          options={[
            {
              value: "all",
              label: "All suppliers",
            },
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "Inactive",
            },
          ]}
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onStatusChange("all");
          }}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-stone hover:bg-[#F7F5F0] hover:text-ink"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
}
