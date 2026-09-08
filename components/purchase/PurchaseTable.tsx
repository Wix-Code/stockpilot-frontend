"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";

import DataTable from "@/components/reuseable/TableProps";
import { TablePagination } from "@/components/reuseable/TablePagination";
import { Purchase } from "./PurchaseTypes";
import { getPurchaseColumns } from "./PurchaseColumns";

interface PurchaseTableProps {
  purchases: Purchase[];

  onView: (purchase: Purchase) => void;

  onReceive: (purchase: Purchase) => void;
}

export function PurchaseTable({
  purchases,
  onView,
  onReceive,
}: PurchaseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getPurchaseColumns({
        onView,
        onReceive,
      }),
    [onView, onReceive],
  );

  const table = useReactTable({
    data: purchases,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4E0D6] bg-white">
      <DataTable
        table={table}
        className="rounded-none border-0 shadow-none"
        onRowClick={onView}
        emptyMessage="No purchases have been recorded yet."
      />

      <TablePagination table={table} />
    </div>
  );
}
