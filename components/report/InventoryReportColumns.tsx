import type { ColumnDef } from "@tanstack/react-table";

import { StockBadge } from "@/components/reuseable/StockBadge";
import { InventoryItem } from "../inventory/InventoryTypes";
import { formatCurrency } from "@/lib/Format";

export const inventoryReportColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },

  {
    accessorKey: "sku",
    header: "SKU",
  },

  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "stockQty",
    header: "Quantity",
  },

  {
    id: "stock_status",
    header: "Status",

    cell: ({ row }) => (
      <StockBadge
        quantity={row.original.stockQty}
        reorderLevel={row.original.reorderLevel}
      />
    ),
  },

  {
    id: "stock_value",
    header: "Stock value",

    cell: ({ row }) =>
      formatCurrency(row.original.stockQty * row.original.costPrice),
  },
];
