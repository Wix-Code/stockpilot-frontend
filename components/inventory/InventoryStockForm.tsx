"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCcw,
} from "lucide-react";

import { useEffect, useState } from "react";
import { InventoryItem } from "./InventoryTypes";
import { SelectDropdown } from "../reuseable/SelectDropdown";

type MovementAction = "stock_in" | "stock_out" | "adjustment";

interface StockMovementFormProps {
  item?: InventoryItem | null;

  defaultAction?: MovementAction;

  items: InventoryItem[];

  onCancel: () => void;

  onSubmit: (values: {
    productId: string;
    action: MovementAction;
    quantity: number;
    reason: string;
  }) => void;
}

export function StockMovementForm({
  item,
  defaultAction = "stock_in",
  items,
  onCancel,
  onSubmit,
}: StockMovementFormProps) {
  const [productId, setProductId] = useState(item?.id || "");

  const [action, setAction] = useState<MovementAction>(defaultAction);

  const [quantity, setQuantity] = useState("");

  const [reason, setReason] = useState("");

  useEffect(() => {
    if (item) {
      setProductId(item.id);
    }

    setAction(defaultAction);
    setQuantity("");
    setReason("");
  }, [item, defaultAction]);

  const selectedItem = items.find((product) => product.id === productId);

  const quantityNumber = Number(quantity);

  const wouldGoNegative =
    selectedItem &&
    action === "stock_out" &&
    quantityNumber > selectedItem.stockQty;

  const valid =
    productId && quantityNumber > 0 && reason.trim() && !wouldGoNegative;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!valid) return;

    onSubmit({
      productId,
      action,
      quantity: quantityNumber,
      reason: reason.trim(),
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <SelectDropdown
        label="Product"
        value={productId}
        placeholder="Select product"
        options={items.map((product) => ({
          value: product.id,
          label: product.name,
          description: `${product.sku} · ${product.stockQty} ${product.unit} available`,
        }))}
        onChange={setProductId}
      />

      <div>
        <p className="mb-2 text-sm font-semibold text-ink">Movement type</p>

        <div className="grid grid-cols-3 gap-2">
          <ActionButton
            selected={action === "stock_in"}
            label="Stock in"
            icon={<ArrowDownToLine size={16} />}
            onClick={() => setAction("stock_in")}
          />

          <ActionButton
            selected={action === "stock_out"}
            label="Stock out"
            icon={<ArrowUpFromLine size={16} />}
            onClick={() => setAction("stock_out")}
          />

          <ActionButton
            selected={action === "adjustment"}
            label="Adjust"
            icon={<RefreshCcw size={16} />}
            onClick={() => setAction("adjustment")}
          />
        </div>
      </div>

      {selectedItem && (
        <div
          className="
            rounded-xl
            border border-[#E4E0D6]
            bg-[#FBFAF6]
            px-4 py-3
          "
        >
          <p className="text-[11px] text-stone">Current stock</p>

          <p className="mt-1 tabular text-xl font-bold text-ink">
            {selectedItem.stockQty}
            <span className="ml-1 text-xs font-medium text-stone">
              {selectedItem.unit}
            </span>
          </p>
        </div>
      )}

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">
          Quantity
        </span>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="0"
          className="
            h-12 w-full
            rounded-xl
            border border-[#DDD8CC]
            bg-white
            px-3.5
            text-sm font-semibold text-ink
            outline-none
            focus:border-green
            focus:ring-4
            focus:ring-green/10
          "
        />

        {wouldGoNegative && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#A84435]">
            <AlertTriangle size={14} />
            You cannot remove more than the available stock.
          </p>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">
          Reason
        </span>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder={
            action === "stock_in"
              ? "e.g. Manual receiving"
              : action === "stock_out"
                ? "e.g. Damaged item"
                : "Explain why this adjustment is required"
          }
          className="
            w-full resize-none
            rounded-xl
            border border-[#DDD8CC]
            bg-white
            px-3.5 py-3
            text-sm text-ink
            outline-none
            placeholder:text-stone
            focus:border-green
            focus:ring-4
            focus:ring-green/10
          "
        />
      </label>

      <div className="flex justify-end gap-3 border-t border-[#E4E0D6] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="
            h-11
            rounded-xl
            border border-[#DDD8CC]
            bg-white
            px-5
            text-sm font-semibold text-ink-soft
            hover:bg-[#F7F5F0]
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!valid}
          className="
            h-11
            rounded-xl
            bg-green
            px-5
            text-sm font-bold text-white
            hover:bg-green-deep
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Record movement
        </button>
      </div>
    </form>
  );
}

function ActionButton({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex h-11
        items-center justify-center gap-2
        rounded-xl border
        text-xs font-semibold
        transition-all
        ${
          selected
            ? "border-green bg-green-tint text-green-deep"
            : "border-[#DDD8CC] bg-white text-stone hover:bg-[#F7F5F0]"
        }
      `}
    >
      {icon}

      {label}
    </button>
  );
}
