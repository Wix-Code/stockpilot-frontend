import type { ColumnDef } from "@tanstack/react-table";
import { Sale } from "../sales/SalesType";
import { formatCurrency } from "@/lib/Format";
import StatusBadge from "../reuseable/StatusProps";

export const salesReportColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
  },

  {
    accessorKey: "customerName",
    header: "Customer",
  },

  {
    accessorKey: "total",
    header: "Total",

    cell: ({ row }) => formatCurrency(row.original.total),
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment",

    cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
  },

  {
    accessorKey: "createdBy",
    header: "Recorded by",
  },
];
