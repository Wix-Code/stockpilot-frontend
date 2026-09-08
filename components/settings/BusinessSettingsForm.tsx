"use client";

import { Building2, Mail, MapPin, Phone } from "lucide-react";

import { useState } from "react";

import { FormField } from "@/components/auth/FormField";
import { BusinessSettings } from "./SettingsTypes";
import { SelectDropdown } from "../reuseable/SelectDropdown";
import { SaveButton } from "../reuseable/SavedButton";

interface Props {
  initialValues: BusinessSettings;
}

export function BusinessSettingsForm({ initialValues }: Props) {
  const [form, setForm] = useState(initialValues);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Save business settings", form);
  }

  return (
    <form onSubmit={save} className="space-y-5">
      <FormField
        label="Business name"
        icon={<Building2 size={18} />}
        value={form.businessName}
        onChange={(e) =>
          setForm({
            ...form,
            businessName: e.target.value,
          })
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Phone number"
          type="tel"
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
          label="Email address"
          type="email"
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
        label="Business address"
        icon={<MapPin size={18} />}
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
      />

      <SelectDropdown
        label="Currency"
        value={form.currency}
        onChange={(value) =>
          setForm({
            ...form,
            currency: value,
          })
        }
        options={[
          {
            value: "NGN",
            label: "Nigerian Naira (₦)",
          },

          {
            value: "USD",
            label: "US Dollar ($)",
          },

          {
            value: "GBP",
            label: "British Pound (£)",
          },
        ]}
      />

      <SaveButton />
    </form>
  );
}
