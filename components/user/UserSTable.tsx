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
import { BusinessUser } from "./UserTypes";
import { getUserColumns } from "./UserColumns";

interface UserTableProps {
  users: BusinessUser[];

  onView: (user: BusinessUser) => void;

  onEdit: (user: BusinessUser) => void;

  onSuspend: (user: BusinessUser) => void;
}

export function UserTable({
  users,
  onView,
  onEdit,
  onSuspend,
}: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getUserColumns({
        onView,
        onEdit,
        onSuspend,
      }),
    [onView, onEdit, onSuspend],
  );

  const table = useReactTable({
    data: users,
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
        emptyMessage="No users match the current filters."
      />

      <TablePagination table={table} />
    </div>
  );
}
