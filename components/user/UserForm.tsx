"use client";

import { Mail, UserRound } from "lucide-react";

import { useEffect, useState } from "react";

import { FormField } from "@/components/auth/FormField";
import { BusinessUser, UserRole } from "./UserTypes";
import { SelectDropdown } from "../reuseable/SelectDropdown";

interface UserFormProps {
  user?: BusinessUser | null;

  onSubmit: (values: { name: string; email: string; role: UserRole }) => void;

  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState<UserRole>("cashier");

  useEffect(() => {
    if (!user) {
      setName("");
      setEmail("");
      setRole("cashier");

      return;
    }

    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const valid = name.trim() && email.trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!valid) return;

        onSubmit({
          name: name.trim(),
          email: email.trim(),
          role,
        });
      }}
      className="space-y-5"
    >
      <FormField
        label="Full name"
        icon={<UserRound size={18} />}
        placeholder="e.g. Sarah Yusuf"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormField
        label="Email address"
        type="email"
        icon={<Mail size={18} />}
        placeholder="staff@example.com"
        value={email}
        disabled={Boolean(user)}
        onChange={(e) => setEmail(e.target.value)}
      />

      <SelectDropdown
        label="Role"
        value={role}
        onChange={(value) => setRole(value as UserRole)}
        options={[
          {
            value: "manager",
            label: "Manager",
            description: "Broad operational access.",
          },

          {
            value: "cashier",
            label: "Cashier / Sales",
            description: "Sales-focused access.",
          },

          {
            value: "inventory",
            label: "Inventory Staff",
            description: "Products and stock management.",
          },
        ]}
      />

      <div className="rounded-xl border border-[#E4E0D6] bg-[#FBFAF6] p-4">
        <p className="text-xs font-semibold text-ink">Access is role-based</p>

        <p className="mt-1 text-[11px] leading-5 text-stone">
          Staff will only be able to access actions permitted by their assigned
          role.
        </p>
      </div>

      <div className="flex justify-end gap-3 border-t border-[#E4E0D6] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="
            h-11
            rounded-xl
            border border-[#DDD8CC]
            px-5
            text-sm font-semibold
            text-ink-soft
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
            bg-green px-5
            text-sm font-bold
            text-white
            hover:bg-green-deep
            disabled:opacity-50
          "
        >
          {user ? "Save changes" : "Send invite"}
        </button>
      </div>
    </form>
  );
}
