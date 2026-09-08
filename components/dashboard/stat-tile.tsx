import { cn } from "@/lib/utils";

export function StatTile({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "warn" | "good";
}) {
  return (
    <div className="rounded-lg border border-stone-light/70 bg-white px-5 py-4">
      <p className="text-sm text-stone">{label}</p>
      <p
        className={cn(
          "tabular mt-1 text-2xl font-semibold text-ink",
          tone === "warn" && "text-terracotta",
          tone === "good" && "text-green"
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
    </div>
  );
}
