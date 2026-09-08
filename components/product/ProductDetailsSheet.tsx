"use client";

import { Archive, History, Package, Pencil, RotateCcw } from "lucide-react";
import { Product, StockMovement } from "./ProductTypes";
import { StockBadge } from "../reuseable/StockBadge";
import { formatCurrency } from "@/lib/Format";

interface ProductDetailsProps {
  product: Product;
  onEdit: () => void;
  onArchive: () => void;
}

export function ProductDetails({
  product,
  onEdit,
  onArchive,
}: ProductDetailsProps) {
  const margin = product.sellingPrice - product.costPrice;

  const marginPercentage =
    product.sellingPrice > 0 ? (margin / product.sellingPrice) * 100 : 0;

  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E4E0D6] bg-[#F7F5F0]">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package size={28} className="text-green" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold tracking-[-0.025em] text-ink">
            {product.name}
          </h2>

          <p className="mt-1 font-mono text-xs text-stone">{product.sku}</p>

          <div className="mt-3">
            <StockBadge
              quantity={product.stockQty}
              reorderLevel={product.reorderLevel}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DetailCard
          label="Selling price"
          value={formatCurrency(product.sellingPrice)}
        />

        <DetailCard
          label="Cost price"
          value={formatCurrency(product.costPrice)}
        />

        <DetailCard
          label="Current stock"
          value={`${product.stockQty} ${product.unit}`}
        />

        <DetailCard
          label="Reorder level"
          value={`${product.reorderLevel} ${product.unit}`}
        />
      </div>

      <section>
        <SectionTitle>Product information</SectionTitle>

        <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          <DetailRow label="Category" value={product.category} />

          <DetailRow label="Brand" value={product.brand || "—"} />

          <DetailRow label="Unit" value={product.unit} />

          <DetailRow
            label="Margin"
            value={`${formatCurrency(margin)} (${marginPercentage.toFixed(
              1,
            )}%)`}
          />

          <DetailRow
            label="Status"
            value={product.status === "active" ? "Active" : "Archived"}
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Recent stock movements</SectionTitle>

          <button
            type="button"
            className="text-xs font-semibold text-green hover:text-green-deep"
          >
            View history
          </button>
        </div>

        <MovementList movements={product.movements || []} />
      </section>

      <div className="grid grid-cols-2 gap-3 border-t border-[#E4E0D6] pt-5">
        <button
          type="button"
          onClick={onEdit}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD8CC] bg-white text-sm font-semibold text-ink-soft transition-colors hover:bg-[#F7F5F0]"
        >
          <Pencil size={16} />
          Edit product
        </button>

        <button
          type="button"
          onClick={onArchive}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-green text-sm font-bold text-white transition-colors hover:bg-green-deep"
        >
          <Archive size={16} />
          Archive
        </button>
      </div>
    </div>
  );
}

export function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone">
        {label}
      </p>

      <p className="mt-2 tabular text-base font-bold text-ink">{value}</p>
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 px-4 py-3.5">
      <span className="text-xs text-stone">{label}</span>

      <span className="text-right text-xs font-semibold text-ink-soft">
        {value}
      </span>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-ink">{children}</h3>;
}

export function MovementList({ movements }: { movements: StockMovement[] }) {
  if (!movements.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#DDD8CC] p-6 text-center">
        <History size={21} className="mx-auto text-stone" />

        <p className="mt-2 text-xs font-semibold text-ink">
          No stock movements yet
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
      {movements.slice(0, 5).map((movement) => (
        <div key={movement.id} className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-tint text-green">
            <RotateCcw size={15} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold capitalize text-ink">
              {movement.type.replace("_", " ")}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-stone">
              {movement.reference || movement.reason || movement.actor}
            </p>
          </div>

          <span
            className={`tabular text-xs font-bold ${
              movement.quantity > 0 ? "text-green" : "text-[#A84435]"
            }`}
          >
            {movement.quantity > 0 ? "+" : ""}
            {movement.quantity}
          </span>
        </div>
      ))}
    </div>
  );
}
