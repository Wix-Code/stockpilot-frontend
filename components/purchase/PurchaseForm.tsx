"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { useMemo, useState } from "react";
import { InventoryItem } from "../inventory/InventoryTypes";
import { PurchaseItem } from "./PurchaseTypes";
import { SelectDropdown } from "../reuseable/SelectDropdown";
import { formatCurrency } from "@/lib/Format";

interface Supplier {
  id: string;
  name: string;
}

interface PurchaseFormProps {
  products: InventoryItem[];

  suppliers: Supplier[];

  onCancel: () => void;

  onSubmit: (values: {
    supplierId: string;
    items: PurchaseItem[];
    receiveNow: boolean;
  }) => void;
}

export function PurchaseForm({
  products,
  suppliers,
  onCancel,
  onSubmit,
}: PurchaseFormProps) {
  const [supplierId, setSupplierId] = useState("");

  const [productId, setProductId] = useState("");

  const [items, setItems] = useState<PurchaseItem[]>([]);

  const [receiveNow, setReceiveNow] = useState(true);

  function addProduct() {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    if (items.some((item) => item.productId === product.id)) {
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),

        productId: product.id,
        productName: product.name,
        sku: product.sku,

        quantity: 1,
        unitCost: product.costPrice,

        subtotal: product.costPrice,
      },
    ]);

    setProductId("");
  }

  function updateItem(
    productId: string,
    field: "quantity" | "unitCost",
    value: number,
  ) {
    setItems((current) =>
      current.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        const updated = {
          ...item,
          [field]: value,
        };

        updated.subtotal = updated.quantity * updated.unitCost;

        return updated;
      }),
    );
  }

  function removeItem(productId: string) {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.subtotal, 0),
    [items],
  );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!supplierId || !items.length) {
      return;
    }

    onSubmit({
      supplierId,
      items,
      receiveNow,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <SelectDropdown
        label="Supplier"
        value={supplierId}
        placeholder="Select supplier"
        onChange={setSupplierId}
        options={suppliers.map((supplier) => ({
          value: supplier.id,
          label: supplier.name,
        }))}
      />

      <section>
        <h3 className="mb-4 text-sm font-bold text-ink">Products</h3>

        <div className="flex gap-2">
          <div className="flex-1">
            <SelectDropdown
              value={productId}
              placeholder="Select product"
              onChange={setProductId}
              options={products.map((product) => ({
                value: product.id,

                label: product.name,

                description: product.sku,
              }))}
            />
          </div>

          <button
            type="button"
            onClick={addProduct}
            disabled={!productId}
            className="h-12 rounded-xl bg-green px-4 text-sm font-bold text-white disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          {!items.length ? (
            <div className="px-5 py-8 text-center text-sm text-stone">
              Add products to this purchase.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_90px_150px_120px_36px] sm:items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {item.productName}
                  </p>

                  <p className="mt-1 font-mono text-[11px] text-stone">
                    {item.sku}
                  </p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      item.productId,
                      "quantity",
                      Math.max(Number(e.target.value), 1),
                    )
                  }
                  className="h-10 rounded-xl border border-[#DDD8CC] px-3 text-sm outline-none focus:border-green"
                />

                <div className="flex h-10 items-center rounded-xl border border-[#DDD8CC]">
                  <span className="px-2 text-xs font-bold text-green">₦</span>

                  <input
                    type="number"
                    min="0"
                    value={item.unitCost}
                    onChange={(e) =>
                      updateItem(
                        item.productId,
                        "unitCost",
                        Number(e.target.value),
                      )
                    }
                    className="h-full min-w-0 flex-1 bg-transparent pr-2 text-xs outline-none"
                  />
                </div>

                <span className="tabular text-right text-xs font-bold text-ink">
                  {formatCurrency(item.subtotal)}
                </span>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-stone hover:bg-[#FBEEEB] hover:text-[#A84435]"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-4">
        <input
          type="checkbox"
          checked={receiveNow}
          onChange={(e) => setReceiveNow(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-green"
        />

        <div>
          <p className="text-sm font-semibold text-ink">
            Receive stock immediately
          </p>

          <p className="mt-1 text-xs leading-5 text-stone">
            When enabled, quantities will be added to inventory as soon as the
            purchase is saved.
          </p>
        </div>
      </label>

      <div className="rounded-2xl bg-[#FBFAF6] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone">Purchase total</span>

          <span className="tabular text-xl font-bold text-ink">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-[#E4E0D6] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 rounded-xl border border-[#DDD8CC] px-5 text-sm font-semibold text-ink-soft"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!supplierId || !items.length}
          className="h-11 rounded-xl bg-green px-5 text-sm font-bold text-white hover:bg-green-deep disabled:opacity-50"
        >
          Save purchase
        </button>
      </div>
    </form>
  );
}
