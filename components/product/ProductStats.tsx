import { Boxes, PackageCheck, PackageX, TriangleAlert } from "lucide-react";
import { Product } from "./ProductTypes";

interface ProductStatsProps {
  products: Product[];
}

export function ProductStats({ products }: ProductStatsProps) {
  const active = products.filter((product) => product.status === "active");

  const lowStock = active.filter(
    (product) =>
      product.stockQty > 0 && product.stockQty <= product.reorderLevel,
  );

  const outOfStock = active.filter((product) => product.stockQty <= 0);

  const totalUnits = active.reduce(
    (total, product) => total + product.stockQty,
    0,
  );

  const stats = [
    {
      label: "Total products",
      value: active.length,
      subtext: `${totalUnits.toLocaleString()} total units`,
      icon: Boxes,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "In stock",
      value: active.length - lowStock.length - outOfStock.length,
      subtext: "Healthy stock level",
      icon: PackageCheck,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Low stock",
      value: lowStock.length,
      subtext: "Below reorder level",
      icon: TriangleAlert,
      iconClass: "bg-terracotta-tint text-terracotta",
    },
    {
      label: "Out of stock",
      value: outOfStock.length,
      subtext: "Requires attention",
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
            className="rounded-2xl border border-[#E4E0D6] bg-white p-5 shadow-[0_2px_8px_rgba(18,38,30,0.025)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold text-stone">
                  {stat.label}
                </p>

                <p className="mt-2 tabular text-[25px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-stone">{stat.subtext}</p>
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
