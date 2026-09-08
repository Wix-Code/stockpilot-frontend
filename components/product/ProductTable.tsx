"use client";


import { useMemo, useState } from "react";
import { Product } from "./ProductTypes";
import { getProductColumns } from "./ProductColumns";
import DataTable from "../reuseable/TableProps";
import { TablePagination } from "../reuseable/TablePagination";
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";


interface ProductTableProps {
  products: Product[];

  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onArchive: (product: Product) => void;
}

export function ProductTable({
  products,
  onView,
  onEdit,
  onArchive,
}: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getProductColumns({
        onView,
        onEdit,
        onArchive,
      }),
    [onView, onEdit, onArchive],
  );

  const table = useReactTable({
    data: products,
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
        emptyMessage="Add your first product or change the current filters."
      />

      <TablePagination table={table} />
    </div>
  );
}
