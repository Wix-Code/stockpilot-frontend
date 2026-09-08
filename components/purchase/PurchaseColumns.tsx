"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, PackageCheck } from "lucide-react";
import { Purchase } from "./PurchaseTypes";
import { formatCurrency } from "@/lib/Format";
import StatusBadge from "../reuseable/StatusProps";

interface PurchaseColumnsOptions {
  onView: (purchase: Purchase) => void;
  onReceive: (purchase: Purchase) => void;
}

export function getPurchaseColumns({
  onView,
  onReceive,
}: PurchaseColumnsOptions): ColumnDef<Purchase>[] {
  return [
    {
      accessorKey: "reference",
      header: "Reference",

      cell: ({ row }) => (
        <span className="font-mono text-xs font-semibold text-ink">
          {row.original.reference}
        </span>
      ),
    },

    {
      accessorKey: "supplierName",
      header: "Supplier",

      cell: ({ row }) => (
        <span className="font-semibold text-ink-soft">
          {row.original.supplierName}
        </span>
      ),
    },

    {
      id: "items",
      header: "Items",

      cell: ({ row }) => (
        <span className="tabular">
          {row.original.items.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      ),
    },

    {
      accessorKey: "total",
      header: "Total",

      cell: ({ row }) => (
        <span className="tabular font-bold text-ink">
          {formatCurrency(row.original.total)}
        </span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
    },

    {
      accessorKey: "createdBy",
      header: "Recorded by",
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const purchase = row.original;

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-end"
          >
            <div className="group/actions relative">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone hover:bg-green-tint hover:text-green"
              >
                <MoreHorizontal size={17} />
              </button>

              <div className="invisible absolute right-0 top-9 z-30 w-40 rounded-xl border border-[#E4E0D6] bg-white p-1 opacity-0 shadow-lg group-focus-within/actions:visible group-focus-within/actions:opacity-100">
                <button
                  type="button"
                  onClick={() => onView(purchase)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Eye size={14} />
                  View details
                </button>

                {purchase.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => onReceive(purchase)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-green hover:bg-green-tint"
                  >
                    <PackageCheck size={14} />
                    Receive stock
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
  ];
}
