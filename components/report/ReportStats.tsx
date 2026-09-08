import { Banknote, Boxes, PackageSearch, ShoppingCart } from "lucide-react";
import { InventoryItem } from "../inventory/InventoryTypes";
import { Sale } from "../sales/SalesType";
import { Purchase } from "../purchase/PurchaseTypes";
import { formatCurrency } from "@/lib/Format";

interface ReportStatsProps {
  inventory: InventoryItem[];
  sales: Sale[];
  purchases: Purchase[];
}

export function ReportStats({ inventory, sales, purchases }: ReportStatsProps) {
  const inventoryValue = inventory.reduce(
    (sum, item) => sum + item.stockQty * item.costPrice,
    0,
  );

  const salesValue = sales
    .filter((sale) => sale.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);

  const purchaseValue = purchases.reduce(
    (sum, purchase) => sum + purchase.total,
    0,
  );

  const totalUnits = inventory.reduce((sum, item) => sum + item.stockQty, 0);

  const stats = [
    {
      label: "Inventory value",
      value: formatCurrency(inventoryValue),
      icon: Boxes,
    },
    {
      label: "Sales value",
      value: formatCurrency(salesValue),
      icon: Banknote,
    },
    {
      label: "Purchase value",
      value: formatCurrency(purchaseValue),
      icon: ShoppingCart,
    },
    {
      label: "Units in stock",
      value: totalUnits.toLocaleString(),
      icon: PackageSearch,
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#E4E0D6] bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone">{stat.label}</p>

                <p className="mt-2 tabular text-[23px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-tint text-green">
                <Icon size={19} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
