import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
  tone?: "default" | "warning" | "danger";
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  tone = "default",
}: StatCardProps) {
  const toneStyles = {
    default: {
      icon: "bg-green-tint text-green",
    },
    warning: {
      icon: "bg-terracotta-tint text-terracotta",
    },
    danger: {
      icon: "bg-[#F8E7E4] text-[#B5473C]",
    },
  };

  return (
    <article
      className="
        group rounded-2xl
        border border-[#E4E0D6]
        bg-white p-5
        shadow-[0_2px_8px_rgba(18,38,30,0.03)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_10px_30px_rgba(18,38,30,0.07)]
      "
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold text-stone">{title}</p>
        </div>

        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            toneStyles[tone].icon,
          ].join(" ")}
        >
          {icon}
        </div>
      </div>

      <div>
        <p className="tabular text-[27px] font-bold tracking-[-0.035em] text-ink">
          {value}
        </p>

        <div className="mt-2 flex min-h-5 items-center gap-2">
          {trend ? (
            <>
              <span
                className={[
                  "flex items-center gap-1 text-xs font-bold",
                  trend.direction === "up" ? "text-green" : "text-[#B5473C]",
                ].join(" ")}
              >
                {trend.direction === "up" ? (
                  <ArrowUpRight size={14} strokeWidth={2} />
                ) : (
                  <ArrowDownRight size={14} strokeWidth={2} />
                )}

                {trend.value}
              </span>

              <span className="text-xs text-stone">{trend.label}</span>
            </>
          ) : (
            <p className="text-xs text-stone">{description}</p>
          )}
        </div>

        {trend && <p className="mt-1 text-xs text-stone">{description}</p>}
      </div>
    </article>
  );
}
