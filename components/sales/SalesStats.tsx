import { Banknote, CircleCheckBig, ReceiptText, RotateCcw } from "lucide-react";
import { Sale } from "./SalesType";
import { formatCurrency } from "@/lib/Format";

interface SalesStatsProps {
  sales: Sale[];
}

export function SalesStats({ sales }: SalesStatsProps) {
  const totalSales = sales
    .filter((sale) => sale.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);

  const paid = sales.filter((sale) => sale.paymentStatus === "paid").length;

  const pending = sales.filter(
    (sale) => sale.paymentStatus === "pending",
  ).length;

  const cancelled = sales.filter((sale) => sale.status === "cancelled").length;

  const stats = [
    {
      label: "Total sales",
      value: formatCurrency(totalSales),
      description: "Selected period",
      icon: Banknote,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Transactions",
      value: sales.length.toString(),
      description: "Recorded sales",
      icon: ReceiptText,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Paid",
      value: paid.toString(),
      description: `${pending} awaiting payment`,
      icon: CircleCheckBig,
      iconClass: "bg-green-tint text-green",
    },
    {
      label: "Cancelled",
      value: cancelled.toString(),
      description: "Voided transactions",
      icon: RotateCcw,
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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone">{stat.label}</p>

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
