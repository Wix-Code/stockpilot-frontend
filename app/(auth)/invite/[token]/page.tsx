"use client";
import { BadgeCheck, Mail, UserRound } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { PasswordField } from "@/components/auth/PasswordField";
import { PasswordRules } from "@/components/auth/PasswordRules";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { Notice } from "@/components/auth/Notice";
import { authApi } from "@/lib/auth";

export default function InvitePage(){
  const {token}=useParams<{token:string}>(); const router=useRouter();
  const [form,setForm]=useState({name:"",email:"",password:""}); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  const valid=form.name&&form.email&&form.password.length>=8&&/[A-Za-z]/.test(form.password)&&/\d/.test(form.password);
  async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");try{await authApi.acceptInvite(token,{name:form.name,email:form.email,password:form.password});router.push("/login");}catch(e){setError(e instanceof Error?e.message:"Unable to accept invitation.");}finally{setLoading(false)}}
  return <AuthShell eyebrow="Staff invitation" title="Join your StockPilot workspace" description="Complete your staff profile and create a password to accept the invitation.">
    <form onSubmit={submit} className="space-y-4.5">{error&&<Notice type="error">{error}</Notice>}<Notice type="success"><span className="inline-flex items-center gap-1.5 font-semibold"><BadgeCheck size={15}/>Secure staff invitation</span></Notice><FormField label="Full name" icon={<UserRound size={18}/>} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><FormField label="Work email" type="email" icon={<Mail size={18}/>} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><PasswordField label="Create password" autoComplete="new-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><PasswordRules password={form.password}/><SubmitButton loading={loading} disabled={!valid}>Accept invitation</SubmitButton></form>
  </AuthShell>
}
