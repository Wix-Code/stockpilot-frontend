"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Archive,
  Eye,
} from "lucide-react";
import { Product } from "./ProductTypes";
import { formatCurrency } from "@/lib/Format";
import { StockBadge } from "../reuseable/StockBadge";

interface ProductColumnOptions {
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onArchive: (product: Product) => void;
}

export function getProductColumns({
  onView,
  onEdit,
  onArchive,
}: ProductColumnOptions): ColumnDef<Product>[] {
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
        const product = row.original;

        return (
          <div className="flex min-w-[220px] items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E4E0D6] bg-[#F7F5F0]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-green">
                  {product.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <p className="font-semibold text-ink">{product.name}</p>

              <p className="mt-0.5 text-[11px] text-stone">
                {product.brand || "No brand"}
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
      accessorKey: "sellingPrice",
      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1.5"
        >
          Selling price
          <ArrowUpDown size={13} />
        </button>
      ),

      cell: ({ row }) => (
        <span className="tabular font-semibold text-ink">
          {formatCurrency(row.original.sellingPrice)}
        </span>
      ),
    },

    {
      accessorKey: "stockQty",
      header: "Stock",

      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="tabular min-w-[32px] font-semibold text-ink">
            {row.original.stockQty}
          </span>

          <StockBadge
            quantity={row.original.stockQty}
            reorderLevel={row.original.reorderLevel}
          />
        </div>
      ),
    },

    {
      accessorKey: "unit",
      header: "Unit",
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const product = row.original;

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-end"
          >
            <div className="group/actions relative">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-green-tint hover:text-green"
              >
                <MoreHorizontal size={17} />
              </button>

              <div className="invisible absolute right-0 top-9 z-20 w-40 rounded-xl border border-[#E4E0D6] bg-white p-1 opacity-0 shadow-lg transition group-focus-within/actions:visible group-focus-within/actions:opacity-100">
                <button
                  type="button"
                  onClick={() => onView(product)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Eye size={14} />
                  View details
                </button>

                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Pencil size={14} />
                  Edit product
                </button>

                <button
                  type="button"
                  onClick={() => onArchive(product)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#A84435] hover:bg-[#FBEEEB]"
                >
                  <Archive size={14} />
                  Archive
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
}
