"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, RotateCcw } from "lucide-react";
import { Sale } from "./SalesType";
import { formatCurrency } from "@/lib/Format";
import StatusBadge from "../reuseable/StatusProps";

interface SaleColumnOptions {
  onView: (sale: Sale) => void;
  onCancel: (sale: Sale) => void;
}

export function getSalesColumns({
  onView,
  onCancel,
}: SaleColumnOptions): ColumnDef<Sale>[] {
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
      accessorKey: "customerName",
      header: "Customer",

      cell: ({ row }) => (
        <span className="font-semibold text-ink-soft">
          {row.original.customerName || "Walk-in Customer"}
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
      accessorKey: "paymentStatus",
      header: "Payment",

      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },

    {
      accessorKey: "createdBy",
      header: "Recorded by",
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const sale = row.original;

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
                  onClick={() => onView(sale)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Eye size={14} />
                  View details
                </button>

                {sale.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={() => onCancel(sale)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#A84435] hover:bg-[#FBEEEB]"
                  >
                    <RotateCcw size={14} />
                    Cancel sale
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
