import { UserPlus } from "lucide-react";

interface UsersHeaderProps {
  onInvite: () => void;
}

export function UsersHeader({ onInvite }: UsersHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Users
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Manage staff accounts, roles and access to your workspace.
        </p>
      </div>

      <button
        type="button"
        onClick={onInvite}
        className="
          inline-flex h-11
          items-center justify-center gap-2
          rounded-xl
          bg-green px-4
          text-sm font-bold text-white
          shadow-[0_5px_14px_rgba(47,104,68,0.18)]
          transition-colors
          hover:bg-green-deep
        "
      >
        <UserPlus size={17} />
        Invite user
      </button>
    </div>
  );
}
