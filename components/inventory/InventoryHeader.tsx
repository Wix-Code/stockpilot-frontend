import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface InventoryHeaderProps {
  onStockIn: () => void;
  onStockOut: () => void;
}

export function InventoryHeader({
  onStockIn,
  onStockOut,
}: InventoryHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Inventory
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Monitor stock levels and record inventory movements.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onStockOut}
          className="
            inline-flex h-11 items-center justify-center gap-2
            rounded-xl border border-[#DDD8CC]
            bg-white px-4
            text-sm font-semibold text-ink-soft
            transition-colors
            hover:bg-[#F7F5F0]
          "
        >
          <ArrowUpFromLine size={17} />
          Stock out
        </button>

        <button
          type="button"
          onClick={onStockIn}
          className="
            inline-flex h-11 items-center justify-center gap-2
            rounded-xl bg-green px-4
            text-sm font-bold text-white
            shadow-[0_5px_14px_rgba(47,104,68,0.18)]
            transition-colors
            hover:bg-green-deep
          "
        >
          <ArrowDownToLine size={17} />
          Stock in
        </button>
      </div>
    </div>
  );
}
