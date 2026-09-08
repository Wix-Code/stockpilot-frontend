"use client";

import Link from "next/link";
import { CheckCircle2, MailCheck } from "lucide-react";

import { useSearchParams } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";

import { Notice } from "@/components/auth/Notice";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "your email address";

  return (
    <AuthShell
      eyebrow="Verify your account"
      title="Check your inbox"
      description="We've sent a verification link to complete your StockPilot account setup."
    >
      <div className="space-y-6">
        {/* Icon */}

        <div
          className="
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-green-tint
            text-green
          "
        >
          <MailCheck size={30} strokeWidth={1.8} />
        </div>

        {/* Message */}

        <Notice type="success">
          Verification email sent to{" "}
          <strong className="font-semibold text-ink">{email}</strong>
          .
          <br />
          The verification link will expire after a short period for security.
        </Notice>

        {/* Helper box */}

        <div
          className="
            rounded-xl
            border border-[#E4E0D6]
            bg-[#FBFAF6]
            px-4 py-4
          "
        >
          <div className="flex gap-3">
            <div
              className="
                mt-0.5
                flex h-7 w-7
                shrink-0
                items-center justify-center
                rounded-lg
                bg-green-tint
                text-green
              "
            >
              <CheckCircle2 size={16} strokeWidth={2} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">Next steps</p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-stone
                "
              >
                Open the email and click the verification link. Once your
                account is verified, you can continue setting up your StockPilot
                business workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Resend placeholder */}

        <p
          className="
            text-center
            text-sm
            leading-6
            text-stone
          "
        >
          Didn't receive the email? Check your spam folder or request a new
          verification link.
        </p>

        {/* Back button */}

        <Link
          href="/login"
          className="
            flex h-12 w-full
            items-center justify-center
            rounded-xl
            bg-green
            text-sm font-bold
            text-white
            transition-colors
            hover:bg-green-deep
          "
        >
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
