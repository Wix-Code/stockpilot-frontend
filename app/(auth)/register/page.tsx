"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, UserRound } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { PasswordField } from "@/components/auth/PasswordField";
import { PasswordRules } from "@/components/auth/PasswordRules";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { Notice } from "@/components/auth/Notice";
import { authApi } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordIsValid =
    form.password.length >= 8 &&
    /[A-Za-z]/.test(form.password) &&
    /\d/.test(form.password);

  const passwordsMatch =
    form.confirm.length > 0 && form.password === form.confirm;

  const valid =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    passwordIsValid &&
    passwordsMatch &&
    form.terms;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!valid) return;

    setLoading(true);

    try {
      await authApi.register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      router.push(
        `/verify-email?email=${encodeURIComponent(form.email.trim())}`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start with StockPilot"
      description="Create your business owner account. You can set up your business and invite your team after verification."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && <Notice type="error">{error}</Notice>}

        <FormField
          label="Full name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Daniel Adeyemi"
          icon={<UserRound size={18} strokeWidth={1.8} />}
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
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          icon={<Mail size={18} strokeWidth={1.8} />}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          required
        />

        <PasswordField
          label="Create password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a secure password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <PasswordRules password={form.password} />

        <PasswordField
          label="Confirm password"
          name="confirm-password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          value={form.confirm}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              confirm: e.target.value,
            }))
          }
          error={
            form.confirm && form.confirm !== form.password
              ? "Passwords do not match."
              : undefined
          }
        />

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                terms: e.target.checked,
              }))
            }
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-light accent-green"
          />

          <span className="text-xs leading-5 text-stone">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-green transition-colors hover:text-green-deep"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-green transition-colors hover:text-green-deep"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <SubmitButton loading={loading} disabled={!valid}>
          Create account
        </SubmitButton>

        <div className="pt-1 text-center">
          <p className="text-sm text-stone">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green transition-colors hover:text-green-deep"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
