"use client";

import type { ReactNode } from "react";
import {
  flexRender,
  type Row,
  type RowData,
  type Table as TableType,
} from "@tanstack/react-table";

interface DataTableProps<TData extends RowData> {
  table: TableType<TData>;

  emptyMessage?: ReactNode;

  onRowClick?: (row: TData) => void;

  className?: string;
  tableClassName?: string;
  rowClassName?: string;

  getRowClassName?: (row: Row<TData>) => string;

  loading?: boolean;
}

export default function DataTable<TData extends RowData>({
  table,
  emptyMessage = "No records found.",
  onRowClick,
  className = "",
  tableClassName = "",
  rowClassName = "",
  getRowClassName,
  loading = false,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;

  const isClickable = typeof onRowClick === "function";

  const columnCount = table.getAllLeafColumns().length;

  return (
    <div
      className={`
        w-full overflow-hidden
        rounded-2xl
        border border-[#E4E0D6]
        bg-white
        shadow-[0_2px_10px_rgba(18,38,30,0.025)]
        ${className}
      `}
    >
      <div className="overflow-x-auto">
        <table
          className={`
            w-full
            min-w-[980px]
            border-collapse
            bg-white
            ${tableClassName}
          `}
        >
          {/* ================= HEADER ================= */}

          <thead className="bg-[#FBFAF6]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#E4E0D6]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                    className="
                          whitespace-nowrap
                          px-5 py-3.5
                          text-left
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.08em]
                          text-stone
                        "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* ================= BODY ================= */}

          <tbody>
            {loading && (
              <tr>
                <td colSpan={columnCount} className="px-6 py-14 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-green/20 border-t-green" />

                    <p className="text-sm text-stone">Loading records...</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={columnCount} className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-sm">
                    <p className="text-sm font-semibold text-ink">
                      Nothing here yet
                    </p>

                    <div className="mt-1 text-[13px] leading-5 text-stone">
                      {emptyMessage}
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();

                      onRowClick?.(row.original);
                    }
                  }}
                  className={`
                    group
                    border-b border-[#EEEAE1]
                    bg-white
                    transition-colors
                    last:border-b-0

                    ${
                      isClickable
                        ? "cursor-pointer hover:bg-[#FBFAF6] focus:bg-[#FBFAF6] focus:outline-none"
                        : ""
                    }

                    ${rowClassName}

                    ${getRowClassName?.(row) ?? ""}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="
                          whitespace-nowrap
                          px-5 py-[15px]
                          align-middle
                          text-[13px]
                          font-medium
                          text-ink-soft
                        "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
