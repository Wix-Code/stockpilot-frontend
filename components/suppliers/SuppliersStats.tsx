import {
  Building2,
  PackageCheck,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import { Supplier } from "./SuppliersTypes";
import { formatCurrency } from "@/lib/Format";

interface SupplierStatsProps {
  suppliers: Supplier[];
}

export function SupplierStats({ suppliers }: SupplierStatsProps) {
  const active = suppliers.filter((supplier) => supplier.status === "active");

  const totalPurchaseValue = suppliers.reduce(
    (sum, supplier) => sum + supplier.totalPurchases,
    0,
  );

  const totalOrders = suppliers.reduce(
    (sum, supplier) => sum + supplier.purchaseCount,
    0,
  );

  const topSupplier = [...suppliers].sort(
    (a, b) => b.totalPurchases - a.totalPurchases,
  )[0];

  const stats = [
    {
      label: "Active suppliers",
      value: active.length.toString(),
      description: `${suppliers.length} suppliers total`,
      icon: Building2,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Purchase value",
      value: formatCurrency(totalPurchaseValue),
      description: "All recorded purchases",
      icon: WalletCards,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Purchase orders",
      value: totalOrders.toString(),
      description: "Across all suppliers",
      icon: ReceiptText,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Top supplier",
      value: topSupplier?.name || "—",
      description: topSupplier
        ? formatCurrency(topSupplier.totalPurchases)
        : "No purchases yet",
      icon: PackageCheck,
      iconClass: "bg-terracotta-tint text-terracotta",
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
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone">{stat.label}</p>

                <p className="mt-2 truncate text-[22px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-stone">{stat.description}</p>
              </div>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconClass}`}
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
