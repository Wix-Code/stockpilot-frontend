"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MailCheck } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { authApi } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await authApi.forgotPassword({
        email: email.trim(),
      });

      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthShell
        eyebrow="Account recovery"
        title="Check your email"
        description="We've sent password reset instructions if an account is associated with this email address."
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center rounded-2xl border border-green/15 bg-green-tint/50 px-5 py-7 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green shadow-sm">
              <MailCheck size={23} strokeWidth={1.8} />
            </div>

            <p className="text-sm font-semibold text-ink">Reset link sent</p>

            <p className="mt-1.5 max-w-xs text-xs leading-5 text-stone">
              If an account exists for{" "}
              <span className="font-semibold text-ink-soft">{email}</span>,
              you&apos;ll receive a secure password reset link shortly.
            </p>
          </div>

          <Link
            href="/login"
            className="
              flex h-12 w-full items-center
              justify-center gap-2 rounded-xl
              border border-[#DDD8CC]
              bg-white text-sm font-semibold text-ink-soft
              transition-all
              hover:border-[#C7C0B1]
              hover:bg-[#FBFAF6]
              hover:text-ink
            "
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Forgot your password?"
      description="Enter the email address you use for StockPilot and we'll send you a secure reset link."
    >
      <form onSubmit={submit} className="space-y-5">
        <FormField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} strokeWidth={1.8} />}
          required
        />

        <SubmitButton loading={loading} disabled={!email.trim()}>
          Send reset link
        </SubmitButton>

        <Link
          href="/login"
          className="
            flex items-center justify-center
            gap-2 text-sm font-semibold
            text-green transition-colors
            hover:text-green-deep
          "
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Back to sign in
        </Link>
      </form>
    </AuthShell>
  );
}
