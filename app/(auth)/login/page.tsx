"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { Notice } from "@/components/auth/Notice";
import { authApi } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await authApi.login(form);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't sign you in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="StockPilot"
      title="Welcome back"
      description="Sign in to manage your stock, sales, purchases and day-to-day business operations."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && <Notice type="error">{error}</Notice>}

        <FormField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          icon={<Mail size={18} strokeWidth={1.8} />}
          required
        />

        <PasswordField
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  remember: e.target.checked,
                }))
              }
              className="h-4 w-4 cursor-pointer rounded border-stone-light accent-green"
            />

            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-green transition-colors hover:text-green-deep"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton loading={loading}>Sign in</SubmitButton>

        <div className="pt-1 text-center">
          <p className="text-sm text-stone">
            Don&apos;t have a StockPilot account?{" "}
            <Link
              href="/register"
              className="font-semibold text-green transition-colors hover:text-green-deep"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
