import { Plus } from "lucide-react";

interface PurchaseHeaderProps {
  onNewPurchase: () => void;
}

export function PurchaseHeader({ onNewPurchase }: PurchaseHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Purchases
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Record supplier purchases and receive stock into inventory.
        </p>
      </div>

      <button
        type="button"
        onClick={onNewPurchase}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-green px-4 text-sm font-bold text-white hover:bg-green-deep"
      >
        <Plus size={17} />
        New purchase
      </button>
    </div>
  );
}
