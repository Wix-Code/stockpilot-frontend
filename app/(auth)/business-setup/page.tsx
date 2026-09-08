"use client";

import { Building2, MapPin, Phone, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { Notice } from "@/components/auth/Notice";
import { authApi } from "@/lib/auth";
import { SelectDropdown } from "@/components/reuseable/SelectDropdown";

const currencies = [
  {
    value: "NGN",
    label: "Nigerian Naira",
    description: "NGN · ₦",
    icon: <span className="text-sm font-bold">₦</span>,
  },
  {
    value: "USD",
    label: "US Dollar",
    description: "USD · $",
    icon: <span className="text-sm font-bold">$</span>,
  },
  {
    value: "GBP",
    label: "British Pound",
    description: "GBP · £",
    icon: <span className="text-sm font-bold">£</span>,
  },
];

export default function BusinessSetupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    currency: "NGN",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) return;

    setLoading(true);
    setError("");

    try {
      await authApi.setupBusiness({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        currency: form.currency,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't create your business workspace.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Step 2 of 2"
      title="Set up your business"
      description="Create your private StockPilot workspace. You can invite your team after setup."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && <Notice type="error">{error}</Notice>}

        <Notice type="info">
          Your business will have its own private workspace. Inventory, sales
          and reports remain separate from every other business on StockPilot.
        </Notice>

        <FormField
          label="Business name"
          name="business-name"
          placeholder="e.g. Nova Mobile Hub"
          autoComplete="organization"
          icon={<Building2 size={18} strokeWidth={1.8} />}
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          required
        />

        <FormField
          label="Business phone"
          name="business-phone"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. +234 803 000 0000"
          icon={<Phone size={18} strokeWidth={1.8} />}
          value={form.phone}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />

        <FormField
          label="Business address"
          name="business-address"
          autoComplete="street-address"
          placeholder="e.g. Wuse 2, Abuja"
          icon={<MapPin size={18} strokeWidth={1.8} />}
          value={form.address}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />

        <SelectDropdown
          label="Currency"
          value={form.currency}
          options={currencies}
          onChange={(currency) =>
            setForm((prev) => ({
              ...prev,
              currency,
            }))
          }
          icon={<WalletCards size={18} strokeWidth={1.8} />}
        />

        <div className="pt-1">
          <SubmitButton loading={loading} disabled={!form.name.trim()}>
            Create business workspace
          </SubmitButton>
        </div>
      </form>
    </AuthShell>
  );
}
