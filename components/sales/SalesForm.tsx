"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { useMemo, useState } from "react";
import { FormField } from "@/components/auth/FormField";
import { InventoryItem } from "../inventory/InventoryTypes";
import { SaleItem } from "./SalesType";
import { SelectDropdown } from "../reuseable/SelectDropdown";
import { formatCurrency } from "@/lib/Format";

interface SaleFormProps {
  products: InventoryItem[];

  onCancel: () => void;

  onSubmit: (values: {
    customerName: string;
    items: SaleItem[];
    discount: number;
    paymentStatus: "paid" | "pending";
  }) => void;
}

export function SaleForm({ products, onCancel, onSubmit }: SaleFormProps) {
  const [customerName, setCustomerName] = useState("");

  const [productId, setProductId] = useState("");

  const [items, setItems] = useState<SaleItem[]>([]);

  const [discount, setDiscount] = useState("0");

  const [paymentStatus, setPaymentStatus] = useState<"paid" | "pending">(
    "paid",
  );

  function addProduct() {
    const product = products.find((item) => item.id === productId);

    if (!product || product.stockQty <= 0) return;

    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);

      if (existing) {
        if (existing.quantity + 1 > product.stockQty) {
          return current;
        }

        return current.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.unitPrice,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          id: crypto.randomUUID(),
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          quantity: 1,
          unitPrice: product.sellingPrice,
          subtotal: product.sellingPrice,
        },
      ];
    });

    setProductId("");
  }

  function updateQuantity(productId: string, change: number) {
    const product = products.find((item) => item.id === productId);

    setItems((current) =>
      current.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        const next = item.quantity + change;

        if (next < 1) return item;

        if (product && next > product.stockQty) {
          return item;
        }

        return {
          ...item,
          quantity: next,
          subtotal: next * item.unitPrice,
        };
      }),
    );
  }

  function removeItem(productId: string) {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.subtotal, 0),
    [items],
  );

  const discountNumber = Math.max(Number(discount) || 0, 0);

  const total = Math.max(subtotal - discountNumber, 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!items.length) return;

    onSubmit({
      customerName,
      items,
      discount: discountNumber,
      paymentStatus,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <section>
        <h3 className="mb-4 text-sm font-bold text-ink">Customer</h3>

        <FormField
          label="Customer name"
          placeholder="Optional — leave blank for walk-in customer"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </section>

      <section>
        <h3 className="mb-4 text-sm font-bold text-ink">Products</h3>

        <div className="flex gap-2">
          <div className="flex-1">
            <SelectDropdown
              value={productId}
              onChange={setProductId}
              placeholder="Search/select product"
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
                description: `${product.stockQty} ${product.unit} available · ${formatCurrency(
                  product.sellingPrice,
                )}`,
              }))}
            />
          </div>

          <button
            type="button"
            onClick={addProduct}
            disabled={!productId}
            className="h-12 rounded-xl bg-green px-4 text-sm font-bold text-white hover:bg-green-deep disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          {items.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-stone">
              Add at least one product to this sale.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 px-4 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {item.productName}
                  </p>

                  <p className="mt-1 text-xs text-stone">
                    {formatCurrency(item.unitPrice)}
                  </p>
                </div>

                <div className="flex items-center rounded-xl border border-[#DDD8CC]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, -1)}
                    className="flex h-9 w-9 items-center justify-center text-stone hover:bg-[#F7F5F0]"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="tabular w-8 text-center text-xs font-bold text-ink">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, 1)}
                    className="flex h-9 w-9 items-center justify-center text-stone hover:bg-[#F7F5F0]"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="tabular min-w-[100px] text-right text-sm font-bold text-ink">
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

      <section className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-semibold text-ink">
            Discount
          </span>

          <div className="flex h-12 items-center rounded-xl border border-[#DDD8CC] bg-white">
            <span className="border-r border-[#E4E0D6] px-3 text-sm font-bold text-green">
              ₦
            </span>

            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
            />
          </div>
        </label>

        <SelectDropdown
          label="Payment status"
          value={paymentStatus}
          onChange={(value) => setPaymentStatus(value as "paid" | "pending")}
          options={[
            {
              value: "paid",
              label: "Paid",
            },
            {
              value: "pending",
              label: "Pending",
            },
          ]}
        />
      </section>

      <div className="rounded-2xl bg-[#FBFAF6] p-5">
        <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />

        <SummaryRow
          label="Discount"
          value={`- ${formatCurrency(discountNumber)}`}
        />

        <div className="my-3 border-t border-[#E4E0D6]" />

        <SummaryRow label="Total" value={formatCurrency(total)} strong />
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
          disabled={!items.length}
          className="h-11 rounded-xl bg-green px-5 text-sm font-bold text-white hover:bg-green-deep disabled:opacity-50"
        >
          Complete sale
        </button>
      </div>
    </form>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-stone">{label}</span>

      <span
        className={
          strong
            ? "tabular text-lg font-bold text-ink"
            : "tabular text-sm font-semibold text-ink"
        }
      >
        {value}
      </span>
    </div>
  );
}
