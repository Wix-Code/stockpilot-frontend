"use client";

import { ImagePlus, Package, Tag } from "lucide-react";

import { useEffect, useState } from "react";

import { FormField } from "@/components/auth/FormField";
import { SelectDropdown } from "../reuseable/SelectDropdown";
import { Product } from "./ProductTypes";

interface ProductFormValues {
  name: string;
  sku: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: string;
  sellingPrice: string;
  stockQty: string;
  reorderLevel: string;
  image: string;
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (values: ProductFormValues) => void;

  onCancel: () => void;

  loading?: boolean;
}

const categories = [
  "Mobile Phones",
  "Accessories",
  "Audio",
  "Computers",
  "Tablets",
  "Others",
];

const units = [
  {
    value: "Piece",
    label: "Piece",
  },
  {
    value: "Pack",
    label: "Pack",
  },
  {
    value: "Box",
    label: "Box",
  },
  {
    value: "Carton",
    label: "Carton",
  },
  {
    value: "Kilogram",
    label: "Kilogram",
  },
];

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>({
    name: "",
    sku: "",
    category: "",
    brand: "",
    unit: "Piece",
    costPrice: "",
    sellingPrice: "",
    stockQty: "",
    reorderLevel: "5",
    image: "",
  });

  useEffect(() => {
    if (!product) {
      setForm({
        name: "",
        sku: "",
        category: "",
        brand: "",
        unit: "Piece",
        costPrice: "",
        sellingPrice: "",
        stockQty: "",
        reorderLevel: "5",
        image: "",
      });

      return;
    }

    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      brand: product.brand || "",
      unit: product.unit,
      costPrice: String(product.costPrice),
      sellingPrice: String(product.sellingPrice),
      stockQty: String(product.stockQty),
      reorderLevel: String(product.reorderLevel),
      image: product.image || "",
    });
  }, [product]);

  const valid =
    form.name.trim() &&
    form.sku.trim() &&
    form.category &&
    form.unit &&
    Number(form.costPrice) >= 0 &&
    Number(form.sellingPrice) >= 0;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!valid) return;

    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <FormSection
        title="Product information"
        description="Basic information used to identify this product."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              label="Product name"
              placeholder="e.g. iPhone 15 Pro"
              icon={<Package size={18} />}
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          <FormField
            label="SKU"
            placeholder="IPH15-PRO-256"
            icon={<Tag size={18} />}
            value={form.sku}
            onChange={(e) =>
              setForm({
                ...form,
                sku: e.target.value.toUpperCase(),
              })
            }
            required
          />

          <FormField
            label="Brand"
            placeholder="e.g. Apple"
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
          />

          <SelectDropdown
            label="Category"
            value={form.category}
            placeholder="Select category"
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={(category) =>
              setForm({
                ...form,
                category,
              })
            }
          />

          <SelectDropdown
            label="Unit"
            value={form.unit}
            options={units}
            onChange={(unit) =>
              setForm({
                ...form,
                unit,
              })
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Pricing"
        description="Set the cost and selling prices for this product."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Cost price"
            value={form.costPrice}
            onChange={(value) =>
              setForm({
                ...form,
                costPrice: value,
              })
            }
          />

          <MoneyInput
            label="Selling price"
            value={form.sellingPrice}
            onChange={(value) =>
              setForm({
                ...form,
                sellingPrice: value,
              })
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Inventory"
        description={
          product
            ? "Update the reorder threshold. Stock quantity should normally be changed through inventory movements."
            : "Enter the opening quantity and when StockPilot should flag the product for restocking."
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label={product ? "Current stock" : "Opening stock"}
            value={form.stockQty}
            disabled={Boolean(product)}
            onChange={(value) =>
              setForm({
                ...form,
                stockQty: value,
              })
            }
          />

          <NumberField
            label="Reorder level"
            value={form.reorderLevel}
            onChange={(value) =>
              setForm({
                ...form,
                reorderLevel: value,
              })
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Product image"
        description="Optional image to make the product easier to recognize."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E4E0D6] bg-[#F7F5F0]">
            {form.image ? (
              <img
                src={form.image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus size={24} className="text-stone" />
            )}
          </div>

          <div className="flex-1">
            <FormField
              label="Image URL"
              placeholder="https://..."
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
            />

            <p className="mt-2 text-[11px] leading-5 text-stone">
              We'll replace this with direct file upload when object storage is
              connected.
            </p>
          </div>
        </div>
      </FormSection>

      <div className="flex items-center justify-end gap-3 border-t border-[#E4E0D6] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 rounded-xl border border-[#DDD8CC] bg-white px-5 text-sm font-semibold text-ink-soft transition-colors hover:bg-[#F7F5F0]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!valid || loading}
          className="h-11 rounded-xl bg-green px-5 text-sm font-bold text-white transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : product ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-sm font-bold text-ink">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-stone">{description}</p>
      </div>

      {children}
    </section>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>

      <span className="flex h-12 items-center overflow-hidden rounded-xl border border-[#DDD8CC] bg-white transition-all focus-within:border-green focus-within:ring-4 focus-within:ring-green/10">
        <span className="flex h-full items-center border-r border-[#E4E0D6] bg-[#FBFAF6] px-3 text-sm font-bold text-green">
          ₦
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="h-full flex-1 bg-transparent px-3 text-sm font-semibold text-ink outline-none"
        />
      </span>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>

      <input
        type="number"
        min="0"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-[#DDD8CC] bg-white px-3.5 text-sm font-semibold text-ink outline-none transition-all focus:border-green focus:ring-4 focus:ring-green/10 disabled:cursor-not-allowed disabled:bg-[#F7F5F0] disabled:text-stone"
      />
    </label>
  );
}
