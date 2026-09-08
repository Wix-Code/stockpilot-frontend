"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { Supplier } from "./SuppliersTypes";
import { formatCurrency } from "@/lib/Format";
import StatusBadge from "../reuseable/StatusProps";

interface SupplierColumnOptions {
  onView: (supplier: Supplier) => void;
  onEdit: (supplier: Supplier) => void;
}

export function getSupplierColumns({
  onView,
  onEdit,
}: SupplierColumnOptions): ColumnDef<Supplier>[] {
  return [
    {
      accessorKey: "name",
      header: "Supplier",

      cell: ({ row }) => (
        <div className="min-w-[210px]">
          <p className="font-semibold text-ink">{row.original.name}</p>

          <p className="mt-0.5 text-[11px] text-stone">
            {row.original.contactPerson || "No contact person"}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "phone",
      header: "Phone",

      cell: ({ row }) => row.original.phone || "—",
    },

    {
      accessorKey: "email",
      header: "Email",

      cell: ({ row }) => (
        <span className="text-xs">{row.original.email || "—"}</span>
      ),
    },

    {
      accessorKey: "purchaseCount",
      header: "Purchases",

      cell: ({ row }) => (
        <span className="tabular font-semibold text-ink">
          {row.original.purchaseCount}
        </span>
      ),
    },

    {
      accessorKey: "totalPurchases",
      header: "Purchase value",

      cell: ({ row }) => (
        <span className="tabular font-bold text-ink">
          {formatCurrency(row.original.totalPurchases)}
        </span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => (
        <StatusBadge
          status={row.original.status === "active" ? "Active" : "Inactive"}
        />
      ),
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const supplier = row.original;

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
                  onClick={() => onView(supplier)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Eye size={14} />
                  View details
                </button>

                <button
                  type="button"
                  onClick={() => onEdit(supplier)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink-soft hover:bg-[#F7F5F0]"
                >
                  <Pencil size={14} />
                  Edit supplier
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
}
