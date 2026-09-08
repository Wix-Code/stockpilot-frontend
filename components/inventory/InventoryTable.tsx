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
import { InventoryItem } from "./InventoryTypes";
import { getInventoryColumns } from "./InventoryColumn";

interface InventoryTableProps {
  items: InventoryItem[];

  onView: (item: InventoryItem) => void;

  onAdjust: (item: InventoryItem) => void;
}

export function InventoryTable({
  items,
  onView,
  onAdjust,
}: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getInventoryColumns({
        onView,
        onAdjust,
      }),
    [onView, onAdjust],
  );

  const table = useReactTable({
    data: items,

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
        emptyMessage="No inventory items match the current filters."
      />

      <TablePagination table={table} />
    </div>
  );
}
