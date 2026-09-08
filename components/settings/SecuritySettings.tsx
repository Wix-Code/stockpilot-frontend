"use client";

import { KeyRound, LogOut, ShieldCheck } from "lucide-react";

export function SecuritySettings() {
  return (
    <div className="space-y-4">
      <SecurityRow
        icon={<KeyRound size={18} />}
        title="Password"
        description="Change the password used to access your StockPilot account."
        actionLabel="Change password"
        onClick={() => {
          console.log("change password");
        }}
      />

      <SecurityRow
        icon={<ShieldCheck size={18} />}
        title="Active sessions"
        description="Review sessions currently signed into your account."
        actionLabel="View sessions"
        onClick={() => {
          console.log("sessions");
        }}
      />

      <SecurityRow
        icon={<LogOut size={18} />}
        title="Sign out all devices"
        description="End all other active sessions for this account."
        actionLabel="Sign out"
        danger
        onClick={() => {
          console.log("sign out sessions");
        }}
      />
    </div>
  );
}

function SecurityRow({
  icon,
  title,
  description,
  actionLabel,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#E4E0D6] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <div
          className={`
            flex h-10 w-10
            shrink-0
            items-center justify-center
            rounded-xl

            ${
              danger
                ? "bg-[#FBEEEB] text-[#A84435]"
                : "bg-green-tint text-green"
            }
          `}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>

          <p className="mt-1 max-w-lg text-xs leading-5 text-stone">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`
          h-10
          shrink-0
          rounded-xl
          border px-4
          text-xs font-semibold

          ${
            danger
              ? "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]"
              : "border-[#DDD8CC] bg-white text-ink-soft hover:bg-[#F7F5F0]"
          }
        `}
      >
        {actionLabel}
      </button>
    </div>
  );
}
