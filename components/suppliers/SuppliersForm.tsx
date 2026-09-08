"use client";

import { Building2, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { useEffect, useState } from "react";

import { FormField } from "@/components/auth/FormField";
import { Supplier } from "./SuppliersTypes";

interface SupplierFormValues {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

interface SupplierFormProps {
  supplier?: Supplier | null;

  onSubmit: (values: SupplierFormValues) => void;

  onCancel: () => void;
}

export function SupplierForm({
  supplier,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const [form, setForm] = useState<SupplierFormValues>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (!supplier) {
      setForm({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });

      return;
    }

    setForm({
      name: supplier.name,
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      notes: supplier.notes || "",
    });
  }, [supplier]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormField
        label="Business name"
        placeholder="e.g. Tech Distribution Nigeria"
        icon={<Building2 size={18} />}
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        required
      />

      <FormField
        label="Contact person"
        placeholder="e.g. Chinedu Okafor"
        icon={<UserRound size={18} />}
        value={form.contactPerson}
        onChange={(e) =>
          setForm({
            ...form,
            contactPerson: e.target.value,
          })
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Phone"
          type="tel"
          placeholder="+234 803 000 0000"
          icon={<Phone size={18} />}
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <FormField
          label="Email"
          type="email"
          placeholder="supplier@example.com"
          icon={<Mail size={18} />}
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
      </div>

      <FormField
        label="Address"
        placeholder="Business address"
        icon={<MapPin size={18} />}
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
      />

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">Notes</span>

        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          placeholder="Optional supplier notes..."
          className="w-full resize-none rounded-xl border border-[#DDD8CC] bg-white px-3.5 py-3 text-sm text-ink outline-none placeholder:text-stone focus:border-green focus:ring-4 focus:ring-green/10"
        />
      </label>

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
          disabled={!form.name.trim()}
          className="h-11 rounded-xl bg-green px-5 text-sm font-bold text-white hover:bg-green-deep disabled:opacity-50"
        >
          {supplier ? "Save changes" : "Add supplier"}
        </button>
      </div>
    </form>
  );
}
