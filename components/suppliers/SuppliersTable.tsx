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

import { getSupplierColumns } from "@/components/suppliers/SuppliersColumns";
import { Supplier } from "./SuppliersTypes";

interface SupplierTableProps {
  suppliers: Supplier[];

  onView: (supplier: Supplier) => void;

  onEdit: (supplier: Supplier) => void;
}

export function SupplierTable({
  suppliers,
  onView,
  onEdit,
}: SupplierTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getSupplierColumns({
        onView,
        onEdit,
      }),
    [onView, onEdit],
  );

  const table = useReactTable({
    data: suppliers,
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
        emptyMessage="No suppliers match the current filters."
      />

      <TablePagination table={table} />
    </div>
  );
}
