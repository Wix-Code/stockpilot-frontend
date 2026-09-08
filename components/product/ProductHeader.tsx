import { Plus } from "lucide-react";

interface ProductHeaderProps {
  onAddProduct: () => void;
}

export function ProductHeader({ onAddProduct }: ProductHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Products
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Manage your product catalogue, pricing and stock information.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddProduct}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green px-4 text-sm font-bold text-white shadow-[0_5px_14px_rgba(47,104,68,0.18)] transition-all hover:bg-green-deep"
      >
        <Plus size={17} strokeWidth={2} />
        Add product
      </button>
    </div>
  );
}
