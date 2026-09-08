"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

import DataTable from "@/components/reuseable/TableProps";
import { TablePagination } from "@/components/reuseable/TablePagination";

interface ReportTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  emptyMessage?: string;
}

export function ReportTable<TData>({
  data,
  columns,
  emptyMessage = "No records available for this report.",
}: ReportTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
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
        pageSize: 10,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4E0D6] bg-white">
      <DataTable
        table={table}
        className="rounded-none border-0 shadow-none"
        emptyMessage={emptyMessage}
      />

      <TablePagination table={table} />
    </div>
  );
}
