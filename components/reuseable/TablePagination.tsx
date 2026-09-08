"use client";

import type { Table } from "@tanstack/react-table";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;

  const pageCount = table.getPageCount();

  const start = pageIndex * table.getState().pagination.pageSize + 1;

  const end = Math.min(
    start + table.getState().pagination.pageSize - 1,
    table.getFilteredRowModel().rows.length,
  );

  const total = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col gap-3 border-t border-[#E4E0D6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-stone">
        Showing{" "}
        <span className="font-semibold text-ink">{total ? start : 0}</span> to{" "}
        <span className="font-semibold text-ink">{end}</span> of{" "}
        <span className="font-semibold text-ink">{total}</span> products
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8CC] bg-white text-stone transition-colors hover:bg-[#F7F5F0] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex h-9 min-w-[90px] items-center justify-center rounded-lg bg-[#F7F5F0] px-3 text-xs font-semibold text-ink-soft">
          Page {pageIndex + 1} of {Math.max(pageCount, 1)}
        </div>

        <button
          type="button"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8CC] bg-white text-stone transition-colors hover:bg-[#F7F5F0] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
