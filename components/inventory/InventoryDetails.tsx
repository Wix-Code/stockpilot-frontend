"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Package,
  RefreshCcw,
} from "lucide-react";

import { StockBadge } from "@/components/reuseable/StockBadge";
import { InventoryItem, InventoryMovement } from "./InventoryTypes";
import { formatCurrency } from "@/lib/Format";

interface InventoryDetailsProps {
  item: InventoryItem;

  onStockIn: () => void;
  onStockOut: () => void;
  onAdjust: () => void;
}

export function InventoryDetails({
  item,
  onStockIn,
  onStockOut,
  onAdjust,
}: InventoryDetailsProps) {
  const stockValue = item.stockQty * item.costPrice;

  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-20 w-20 shrink-0
            items-center justify-center
            overflow-hidden
            rounded-2xl
            border border-[#E4E0D6]
            bg-[#F7F5F0]
          "
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package size={28} className="text-green" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-[-0.025em] text-ink">
            {item.name}
          </h2>

          <p className="mt-1 font-mono text-xs text-stone">{item.sku}</p>

          <div className="mt-3">
            <StockBadge
              quantity={item.stockQty}
              reorderLevel={item.reorderLevel}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard
          label="Current stock"
          value={`${item.stockQty} ${item.unit}`}
        />

        <InfoCard
          label="Reorder level"
          value={`${item.reorderLevel} ${item.unit}`}
        />

        <InfoCard label="Stock value" value={formatCurrency(stockValue)} />

        <InfoCard label="Unit cost" value={formatCurrency(item.costPrice)} />
      </div>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">Stock actions</h3>

        <div className="grid grid-cols-3 gap-2">
          <ActionButton
            label="Stock in"
            icon={<ArrowDownToLine size={16} />}
            onClick={onStockIn}
          />

          <ActionButton
            label="Stock out"
            icon={<ArrowUpFromLine size={16} />}
            onClick={onStockOut}
          />

          <ActionButton
            label="Adjust"
            icon={<RefreshCcw size={16} />}
            onClick={onAdjust}
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink">Movement history</h3>

          <span className="text-xs text-stone">
            {item.movements.length} movements
          </span>
        </div>

        <MovementHistory movements={item.movements} />
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-2xl
        border border-[#E4E0D6]
        bg-[#FBFAF6]
        p-4
      "
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone">
        {label}
      </p>

      <p className="mt-2 tabular text-base font-bold text-ink">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex h-11
        items-center justify-center gap-2
        rounded-xl
        border border-[#DDD8CC]
        bg-white
        text-xs font-semibold text-ink-soft
        transition-colors
        hover:border-green/30
        hover:bg-green-tint
        hover:text-green-deep
      "
    >
      {icon}

      {label}
    </button>
  );
}

function MovementHistory({ movements }: { movements: InventoryMovement[] }) {
  if (!movements.length) {
    return (
      <div
        className="
          rounded-2xl
          border border-dashed border-[#DDD8CC]
          px-5 py-8
          text-center
        "
      >
        <History size={22} className="mx-auto text-stone" />

        <p className="mt-2 text-xs font-semibold text-ink">
          No stock movements yet
        </p>

        <p className="mt-1 text-[11px] text-stone">
          New inventory activity will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        divide-y divide-[#EEEAE1]
        rounded-2xl
        border border-[#E4E0D6]
      "
    >
      {[...movements].reverse().map((movement) => (
        <div key={movement.id} className="flex items-center gap-3 px-4 py-3.5">
          <div
            className={`
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl

                ${
                  movement.quantity > 0
                    ? "bg-green-tint text-green"
                    : "bg-[#FBEEEB] text-[#A84435]"
                }
              `}
          >
            {movement.quantity > 0 ? (
              <ArrowDownToLine size={15} />
            ) : (
              <ArrowUpFromLine size={15} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold capitalize text-ink">
              {movement.type.replaceAll("_", " ")}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-stone">
              {movement.reason || movement.reference || movement.actor}
            </p>
          </div>

          <div className="text-right">
            <p
              className={`tabular text-xs font-bold ${
                movement.quantity > 0 ? "text-green" : "text-[#A84435]"
              }`}
            >
              {movement.quantity > 0 ? "+" : ""}
              {movement.quantity}
            </p>

            <p className="mt-0.5 text-[10px] text-stone">
              {movement.newQty} after
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
