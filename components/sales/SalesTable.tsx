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

import { getSalesColumns } from "@/components/sales/SalesColumns";
import { Sale } from "./SalesType";

interface SalesTableProps {
  sales: Sale[];
  onView: (sale: Sale) => void;
  onCancel: (sale: Sale) => void;
}

export function SalesTable({ sales, onView, onCancel }: SalesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getSalesColumns({
        onView,
        onCancel,
      }),
    [onView, onCancel],
  );

  const table = useReactTable({
    data: sales,
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
        emptyMessage="No sales have been recorded yet."
      />

      <TablePagination table={table} />
    </div>
  );
}
