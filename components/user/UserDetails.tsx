import { Clock3, Mail, ShieldCheck, UserRound } from "lucide-react";
import { BusinessUser, getRoleLabel } from "./UserTypes";
import StatusBadge from "../reuseable/StatusProps";

interface UserDetailsProps {
  user: BusinessUser;

  onEdit: () => void;

  onSuspend: () => void;
}

export function UserDetails({ user, onEdit, onSuspend }: UserDetailsProps) {
  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("");

  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-16 w-16
            items-center justify-center
            rounded-full
            bg-green-tint
            text-lg font-bold
            text-green-deep
          "
        >
          {initials}
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink">{user.name}</h2>

          <p className="mt-1 text-xs text-stone">{user.email}</p>

          <div className="mt-2">
            <StatusBadge
              status={
                user.status === "active"
                  ? "Active"
                  : user.status === "pending"
                    ? "Pending"
                    : "suspended"
              }
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
        <DetailRow
          icon={<ShieldCheck size={15} />}
          label="Role"
          value={getRoleLabel(user.role)}
        />

        <DetailRow icon={<Mail size={15} />} label="Email" value={user.email} />

        <DetailRow
          icon={<Clock3 size={15} />}
          label="Last active"
          value={
            user.lastActive
              ? new Intl.DateTimeFormat("en-NG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(user.lastActive))
              : "Never"
          }
        />
      </div>

      {user.role !== "owner" && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="
              h-11
              rounded-xl
              border border-[#DDD8CC]
              text-sm font-semibold
              text-ink-soft
              hover:bg-[#F7F5F0]
            "
          >
            Edit access
          </button>

          {user.status === "active" && (
            <button
              type="button"
              onClick={onSuspend}
              className="
                h-11
                rounded-xl
                border border-[#EDCBC4]
                bg-[#FBEEEB]
                text-sm font-semibold
                text-[#A84435]
              "
            >
              Suspend
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="text-stone">{icon}</span>

      <div className="flex-1">
        <p className="text-[11px] text-stone">{label}</p>

        <p className="mt-0.5 text-xs font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
