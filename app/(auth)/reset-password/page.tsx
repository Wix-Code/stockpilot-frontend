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

export default function ResetPasswordPage(){
  const params=useSearchParams(); const token=params.get("token")||"";
  const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false); const [error,setError]=useState("");
  const valid=password.length>=8&&/[A-Za-z]/.test(password)&&/\d/.test(password)&&password===confirm;
  async function submit(e:React.FormEvent){e.preventDefault();if(!valid)return;setLoading(true);setError("");try{await authApi.resetPassword({token,password});setDone(true);}catch(e){setError(e instanceof Error?e.message:"Reset link is invalid or expired.");}finally{setLoading(false)}}
  return <AuthShell eyebrow="Account recovery" title={done?"Password updated":"Create a new password"} description={done?"Your password has been changed successfully.":"Choose a strong password you haven't used for this account before."}>
    {done?<div className="space-y-5"><div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={27}/></div><Link href="/login" className="flex h-[50px] items-center justify-center rounded-xl bg-stockpilot-800 text-sm font-bold text-white">Return to sign in</Link></div>
    :<form onSubmit={submit} className="space-y-4.5">{error&&<Notice type="error">{error}</Notice>}<PasswordField label="New password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)}/><PasswordRules password={password}/><PasswordField label="Confirm new password" autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} error={confirm&&confirm!==password?"Passwords do not match.":undefined}/><SubmitButton loading={loading} disabled={!valid}>Update password</SubmitButton></form>}
  </AuthShell>
}
