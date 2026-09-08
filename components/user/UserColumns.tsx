"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, Pencil, ShieldOff } from "lucide-react";
import { BusinessUser, getRoleLabel } from "./UserTypes";
import StatusBadge from "../reuseable/StatusProps";

interface UserColumnOptions {
  onView: (user: BusinessUser) => void;

  onEdit: (user: BusinessUser) => void;

  onSuspend: (user: BusinessUser) => void;
}

export function getUserColumns({
  onView,
  onEdit,
  onSuspend,
}: UserColumnOptions): ColumnDef<BusinessUser>[] {
  return [
    {
      accessorKey: "name",
      header: "User",

      cell: ({ row }) => {
        const user = row.original;

        const initials = user.name
          .split(" ")
          .map((word) => word.charAt(0))
          .slice(0, 2)
          .join("");

        return (
          <div className="flex min-w-[220px] items-center gap-3">
            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-full
                bg-green-tint
                text-xs font-bold
                text-green-deep
              "
            >
              {initials}
            </div>

            <div>
              <p className="font-semibold text-ink">{user.name}</p>

              <p className="mt-0.5 text-[11px] text-stone">{user.email}</p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "role",
      header: "Role",

      cell: ({ row }) => (
        <span className="font-semibold text-ink-soft">
          {getRoleLabel(row.original.role)}
        </span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <StatusBadge
            status={
              status === "active"
                ? "Active"
                : status === "pending"
                  ? "Pending"
                  : "suspended"
            }
          />
        );
      },
    },

    {
      accessorKey: "lastActive",
      header: "Last active",

      cell: ({ row }) => {
        const value = row.original.lastActive;

        if (!value) {
          return <span className="text-stone">Never</span>;
        }

        return (
          <span className="text-xs text-stone">
            {new Intl.DateTimeFormat("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(value))}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: "",

      cell: ({ row }) => {
        const user = row.original;

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-end"
          >
            <div className="group/actions relative">
              <button
                type="button"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  text-stone
                  hover:bg-green-tint
                  hover:text-green
                "
              >
                <MoreHorizontal size={17} />
              </button>

              <div
                className="
                  invisible
                  absolute right-0 top-9 z-30
                  w-40
                  rounded-xl
                  border border-[#E4E0D6]
                  bg-white
                  p-1
                  opacity-0
                  shadow-lg
                  group-focus-within/actions:visible
                  group-focus-within/actions:opacity-100
                "
              >
                <button
                  type="button"
                  onClick={() => onView(user)}
                  className="
                    flex w-full
                    items-center gap-2
                    rounded-lg
                    px-3 py-2
                    text-xs font-semibold
                    text-ink-soft
                    hover:bg-[#F7F5F0]
                  "
                >
                  <Eye size={14} />
                  View details
                </button>

                {user.role !== "owner" && (
                  <>
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="
                        flex w-full
                        items-center gap-2
                        rounded-lg
                        px-3 py-2
                        text-xs font-semibold
                        text-ink-soft
                        hover:bg-[#F7F5F0]
                      "
                    >
                      <Pencil size={14} />
                      Edit access
                    </button>

                    {user.status === "active" && (
                      <button
                        type="button"
                        onClick={() => onSuspend(user)}
                        className="
                          flex w-full
                          items-center gap-2
                          rounded-lg
                          px-3 py-2
                          text-xs font-semibold
                          text-[#A84435]
                          hover:bg-[#FBEEEB]
                        "
                      >
                        <ShieldOff size={14} />
                        Suspend
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
  ];
}
