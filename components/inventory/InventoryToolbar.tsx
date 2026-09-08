"use client";

import { Search, SlidersHorizontal, X } from "lucide-react"
import { SelectDropdown } from "../reuseable/SelectDropdown";

interface InventoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  stock: string;
  onStockChange: (value: string) => void;

  categories: string[];
}

export function InventoryToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  stock,
  onStockChange,
  categories,
}: InventoryToolbarProps) {
  const hasFilters = search || category !== "all" || stock !== "all";

  function clearFilters() {
    onSearchChange("");
    onCategoryChange("all");
    onStockChange("all");
  }

  return (
    <div
      className="
        mb-4
        flex flex-col gap-3
        rounded-2xl
        border border-[#E4E0D6]
        bg-white
        p-4
        lg:flex-row
        lg:items-center
      "
    >
      <div className="relative flex-1">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name or SKU..."
          className="
            h-11 w-full
            rounded-xl
            border border-[#DDD8CC]
            bg-white
            pl-10 pr-4
            text-sm text-ink
            outline-none
            placeholder:text-stone
            focus:border-green
            focus:ring-4
            focus:ring-green/10
          "
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:min-w-[430px]">
        <SelectDropdown
          value={category}
          onChange={onCategoryChange}
          options={[
            {
              value: "all",
              label: "All categories",
            },

            ...categories.map((item) => ({
              value: item,
              label: item,
            })),
          ]}
          icon={<SlidersHorizontal size={17} />}
        />

        <SelectDropdown
          value={stock}
          onChange={onStockChange}
          options={[
            {
              value: "all",
              label: "All stock levels",
            },

            {
              value: "healthy",
              label: "Healthy stock",
            },

            {
              value: "low",
              label: "Low stock",
            },

            {
              value: "out",
              label: "Out of stock",
            },
          ]}
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="
            flex h-10 items-center justify-center gap-1.5
            rounded-lg px-3
            text-xs font-semibold text-stone
            hover:bg-[#F7F5F0]
            hover:text-ink
          "
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
}
