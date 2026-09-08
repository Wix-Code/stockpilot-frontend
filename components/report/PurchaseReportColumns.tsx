import type { ColumnDef } from "@tanstack/react-table";
import { Purchase } from "../purchase/PurchaseTypes";
import { formatCurrency } from "@/lib/Format";
import StatusBadge from "../reuseable/StatusProps";

export const purchaseReportColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
  },

  {
    accessorKey: "supplierName",
    header: "Supplier",
  },

  {
    accessorKey: "total",
    header: "Total",

    cell: ({ row }) => formatCurrency(row.original.total),
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
  },

  {
    accessorKey: "createdBy",
    header: "Recorded by",
  },
];
