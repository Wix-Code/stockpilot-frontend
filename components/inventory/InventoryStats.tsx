import { Boxes, PackageCheck, PackageX, TriangleAlert } from "lucide-react";
import { InventoryItem } from "./InventoryTypes";

interface InventoryStatsProps {
  items: InventoryItem[];
}

export function InventoryStats({ items }: InventoryStatsProps) {
  const totalUnits = items.reduce((sum, item) => sum + item.stockQty, 0);

  const healthy = items.filter(
    (item) => item.stockQty > item.reorderLevel,
  ).length;

  const lowStock = items.filter(
    (item) => item.stockQty > 0 && item.stockQty <= item.reorderLevel,
  ).length;

  const outOfStock = items.filter((item) => item.stockQty <= 0).length;

  const stats = [
    {
      label: "Total stock",
      value: totalUnits.toLocaleString(),
      description: "Units currently available",
      icon: Boxes,
      iconClass: "bg-green-tint text-green",
    },

    {
      label: "Healthy stock",
      value: healthy.toString(),
      description: "Products above reorder level",
      icon: PackageCheck,
      iconClass: "bg-green-tint text-green",
    },

    {
      label: "Low stock",
      value: lowStock.toString(),
      description: "Products needing attention",
      icon: TriangleAlert,
      iconClass: "bg-terracotta-tint text-terracotta",
    },

    {
      label: "Out of stock",
      value: outOfStock.toString(),
      description: "Products unavailable",
      icon: PackageX,
      iconClass: "bg-[#FBEEEB] text-[#A84435]",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border border-[#E4E0D6]
              bg-white
              p-5
              shadow-[0_2px_8px_rgba(18,38,30,0.025)]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-semibold text-stone">
                  {stat.label}
                </p>

                <p className="mt-2 tabular text-[25px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-stone">{stat.description}</p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
              >
                <Icon size={19} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
