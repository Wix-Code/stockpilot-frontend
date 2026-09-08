"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { PasswordRules } from "@/components/auth/PasswordRules";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { Notice } from "@/components/auth/Notice";

import { authApi } from "@/lib/auth";

export default function ResetPasswordForm() {
  const params = useSearchParams();

  const token = params.get("token") || "";

  const [password, setPassword] = useState("");

  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const [done, setDone] = useState(false);

  const [error, setError] = useState("");

  const valid =
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    password === confirm;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!valid) return;

    setLoading(true);
    setError("");

    try {
      await authApi.resetPassword({
        token,
        password,
      });

      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Reset link is invalid or expired.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={done ? "Password updated" : "Create a new password"}
      description={
        done
          ? "Your password has been changed successfully."
          : "Choose a strong password you haven't used before."
      }
    >
      {done ? (
        <div className="space-y-6">
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-full
              bg-green-tint
              text-green
            "
          >
            <CheckCircle2 size={28} strokeWidth={1.8} />
          </div>

          <div
            className="
              rounded-xl
              border border-green/20
              bg-green-tint
              px-4 py-3
            "
          >
            <p className="text-sm leading-6 text-green-deep">
              Your password has been updated successfully.
            </p>
          </div>

          <Link
            href="/login"
            className="
              flex h-12 w-full
              items-center justify-center
              rounded-xl
              bg-green
              text-sm font-bold
              text-white
              hover:bg-green-deep
            "
          >
            Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          {error && <Notice type="error">{error}</Notice>}

          <PasswordField
            label="New password"
            autoComplete="new-password"
            placeholder="Create a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordRules password={password} />

          <PasswordField
            label="Confirm new password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={
              confirm && confirm !== password
                ? "Passwords do not match."
                : undefined
            }
          />

          <SubmitButton loading={loading} disabled={!valid}>
            Update password
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
