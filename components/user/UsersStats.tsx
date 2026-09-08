import { Clock3, ShieldCheck, UserCheck, Users } from "lucide-react";
import { BusinessUser } from "./UserTypes";

interface UserStatsProps {
  users: BusinessUser[];
}

export function UserStats({ users }: UserStatsProps) {
  const active = users.filter((user) => user.status === "active").length;

  const pending = users.filter((user) => user.status === "pending").length;

  const managers = users.filter(
    (user) => user.role === "manager" || user.role === "owner",
  ).length;

  const stats = [
    {
      label: "Total users",
      value: users.length,
      description: "Workspace members",
      icon: Users,
      iconClass: "bg-green-tint text-green",
    },

    {
      label: "Active users",
      value: active,
      description: "Can access StockPilot",
      icon: UserCheck,
      iconClass: "bg-green-tint text-green",
    },

    {
      label: "Pending invites",
      value: pending,
      description: "Awaiting acceptance",
      icon: Clock3,
      iconClass: "bg-terracotta-tint text-terracotta",
    },

    {
      label: "Admin access",
      value: managers,
      description: "Owner and managers",
      icon: ShieldCheck,
      iconClass: "bg-green-tint text-green",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border border-[#E4E0D6]
              bg-white
              p-5
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone">{stat.label}</p>

                <p className="mt-2 text-[25px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-stone">{stat.description}</p>
              </div>

              <div
                className={`
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  ${stat.iconClass}
                `}
              >
                <Icon size={19} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
