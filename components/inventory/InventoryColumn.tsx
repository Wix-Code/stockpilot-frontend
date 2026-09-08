"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, Eye, RefreshCcw } from "lucide-react";
import { StockBadge } from "@/components/reuseable/StockBadge";
import { InventoryItem } from "./InventoryTypes";
import { formatCurrency } from "@/lib/Format";

interface InventoryColumnOptions {
  onView: (item: InventoryItem) => void;

  onAdjust: (item: InventoryItem) => void;
}

export function getInventoryColumns({
  onView,
  onAdjust,
}: InventoryColumnOptions): ColumnDef<InventoryItem>[] {
  return [
    {
      accessorKey: "name",

      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1.5"
        >
          Product
          <ArrowUpDown size={13} />
        </button>
      ),

      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex min-w-[220px] items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-xl
                border border-[#E4E0D6]
                bg-[#F7F5F0]
              "
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-green">
                  {item.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <p className="font-semibold text-ink">{item.name}</p>

              <p className="mt-0.5 text-[11px] text-stone">
                {item.brand || "No brand"}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "sku",
      header: "SKU",

      cell: ({ row }) => (
        <span className="font-mono text-xs text-ink-soft">
          {row.original.sku}
        </span>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
    },

    {
      accessorKey: "stockQty",

      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1.5"
        >
          Quantity
          <ArrowUpDown size={13} />
        </button>
      ),

      cell: ({ row }) => (
        <span className="tabular font-bold text-ink">
          {row.original.stockQty.toLocaleString()}
        </span>
      ),
    },

    {
      id: "stock_status",

      header: "Stock status",

      cell: ({ row }) => (
        <StockBadge
          quantity={row.original.stockQty}
          reorderLevel={row.original.reorderLevel}
        />
      ),
    },

    {
      accessorKey: "reorderLevel",
      header: "Reorder level",

      cell: ({ row }) => (
        <span className="tabular">{row.original.reorderLevel}</span>
      ),
    },

    {
      accessorKey: "costPrice",
      header: "Stock value",

      cell: ({ row }) => {
        const value = row.original.costPrice * row.original.stockQty;

        return (
          <span className="tabular font-semibold text-ink">
            {formatCurrency(value)}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const item = row.original;

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-end"
          >
            <div className="group/actions relative">
              <button
                type="button"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  text-stone
                  hover:bg-green-tint
                  hover:text-green
                "
              >
                <MoreHorizontal size={17} />
              </button>

              <div
                className="
                  invisible
                  absolute right-0 top-9 z-30
                  w-44
                  rounded-xl
                  border border-[#E4E0D6]
                  bg-white
                  p-1
                  opacity-0
                  shadow-lg
                  transition
                  group-focus-within/actions:visible
                  group-focus-within/actions:opacity-100
                "
              >
                <button
                  type="button"
                  onClick={() => onView(item)}
                  className="
                    flex w-full items-center gap-2
                    rounded-lg px-3 py-2
                    text-xs font-semibold text-ink-soft
                    hover:bg-[#F7F5F0]
                  "
                >
                  <Eye size={14} />
                  View inventory
                </button>

                <button
                  type="button"
                  onClick={() => onAdjust(item)}
                  className="
                    flex w-full items-center gap-2
                    rounded-lg px-3 py-2
                    text-xs font-semibold text-ink-soft
                    hover:bg-[#F7F5F0]
                  "
                >
                  <RefreshCcw size={14} />
                  Adjust stock
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
}
