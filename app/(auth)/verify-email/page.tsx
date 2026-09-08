"use client";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Notice } from "@/components/auth/Notice";

export default function VerifyEmailPage(){
  const email=useSearchParams().get("email")||"your email address";
  return <AuthShell eyebrow="Verify your account" title="Check your inbox" description="We've sent a verification link to complete your StockPilot account setup.">
    <div className="space-y-5"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-mint text-stockpilot-800"><MailCheck size={30}/></div><Notice>Verification email sent to <strong>{email}</strong>. The link should expire after a short period for security.</Notice><p className="text-[13px] leading-6 text-slate-500">Didn't receive it? Check your spam folder or use your backend resend-verification endpoint here.</p><Link href="/login" className="flex h-[50px] items-center justify-center rounded-xl bg-stockpilot-800 text-sm font-bold text-white">Back to sign in</Link></div>
  </AuthShell>
}
