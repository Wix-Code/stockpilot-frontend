"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { SelectDropdown } from "../reuseable/SelectDropdown";

interface UserToolbarProps {
  search: string;

  onSearchChange: (value: string) => void;

  role: string;

  onRoleChange: (value: string) => void;

  status: string;

  onStatusChange: (value: string) => void;
}

export function UserToolbar({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
}: UserToolbarProps) {
  const hasFilters = search || role !== "all" || status !== "all";

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
          className="
            absolute left-3.5 top-1/2
            -translate-y-1/2
            text-stone
          "
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search name or email..."
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

      <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:min-w-[440px]">
        <SelectDropdown
          value={role}
          onChange={onRoleChange}
          icon={<SlidersHorizontal size={17} />}
          options={[
            {
              value: "all",
              label: "All roles",
            },

            {
              value: "owner",
              label: "Owner",
            },

            {
              value: "manager",
              label: "Manager",
            },

            {
              value: "cashier",
              label: "Cashier / Sales",
            },

            {
              value: "inventory",
              label: "Inventory Staff",
            },
          ]}
        />

        <SelectDropdown
          value={status}
          onChange={onStatusChange}
          options={[
            {
              value: "all",
              label: "All statuses",
            },

            {
              value: "active",
              label: "Active",
            },

            {
              value: "pending",
              label: "Pending",
            },

            {
              value: "suspended",
              label: "Suspended",
            },
          ]}
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onRoleChange("all");
            onStatusChange("all");
          }}
          className="
            flex h-10
            items-center justify-center gap-1.5
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
