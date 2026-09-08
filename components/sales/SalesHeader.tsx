import { Plus } from "lucide-react";

interface SalesHeaderProps {
  onNewSale: () => void;
}

export function SalesHeader({ onNewSale }: SalesHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Sales
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Record sales, monitor payments and review transaction history.
        </p>
      </div>

      <button
        type="button"
        onClick={onNewSale}
        className="
          inline-flex h-11 items-center justify-center gap-2
          rounded-xl bg-green px-4
          text-sm font-bold text-white
          shadow-[0_5px_14px_rgba(47,104,68,0.18)]
          transition-colors hover:bg-green-deep
        "
      >
        <Plus size={17} />
        New sale
      </button>
    </div>
  );
}
