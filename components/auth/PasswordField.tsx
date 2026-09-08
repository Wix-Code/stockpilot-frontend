"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

interface PasswordFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}

export function PasswordField({
  value,
  onChange,
  label = "Password",
  name = "password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  error,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
      </label>

      <div
        className={[
          "group flex h-[52px] items-center rounded-[16px] border bg-white px-3.5 transition-all",
          error
            ? "border-red-400"
            : "border-[#DDD8CC] hover:border-[#C7C0B1] focus-within:border-green focus-within:ring-4 focus-within:ring-green/10",
        ].join(" ")}
      >
        <LockKeyhole
          size={18}
          strokeWidth={1.8}
          className="mr-3 shrink-0 text-stone transition-colors group-focus-within:text-green"
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-[#A49D8E]"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-stone transition-colors hover:bg-green-tint hover:text-green"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} strokeWidth={1.8} />
          ) : (
            <Eye size={18} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
