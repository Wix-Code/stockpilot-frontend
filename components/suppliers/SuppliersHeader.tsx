import { Plus } from "lucide-react";

interface SupplierHeaderProps {
  onAddSupplier: () => void;
}

export function SupplierHeader({ onAddSupplier }: SupplierHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Suppliers
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Manage suppliers and review your purchasing relationships.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddSupplier}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green px-4 text-sm font-bold text-white shadow-[0_5px_14px_rgba(47,104,68,0.18)] transition-colors hover:bg-green-deep"
      >
        <Plus size={17} />
        Add supplier
      </button>
    </div>
  );
}
