import {
  Archive,
  Check,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock3,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

export type Status =
  | "published"
  | "active"
  | "Active"
  | "draft"
  | "flagged"
  | "archived"
  | "pending"
  | "Pending"
  | "approved"
  | "Approved"
  | "rejected"
  | "Rejected"
  | "completed"
  | "closed"
  | "refunded"
  | "paid"
  | "in_transit"
  | "processing"
  | "delivered"
  | "failed"
  | "success"
  | "cancelled"
  | "under_review"
  | "resolved"
  | "open"
  | "enabled"
  | "suspended"
  | "verified"
  | "inactive"
  | "Inactive"
  | "disputed";

type NormalizedStatus =
  | "published"
  | "active"
  | "draft"
  | "flagged"
  | "archived"
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "closed"
  | "refunded"
  | "paid"
  | "in_transit"
  | "processing"
  | "delivered"
  | "failed"
  | "success"
  | "cancelled"
  | "under_review"
  | "resolved"
  | "open"
  | "enabled"
  | "suspended"
  | "verified"
  | "inactive"
  | "disputed";

interface StatusConfig {
  label: string;
  className: string;
  dotClassName: string;
}

const STATUS_CONFIG: Record<NormalizedStatus, StatusConfig> = {
  active: {
    label: "Active",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  published: {
    label: "Published",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  approved: {
    label: "Approved",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  success: {
    label: "Success",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  paid: {
    label: "Paid",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  delivered: {
    label: "Delivered",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  resolved: {
    label: "Resolved",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  enabled: {
    label: "Enabled",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  verified: {
    label: "Verified",
    className: "border-green/20 bg-green-tint text-green-deep",
    dotClassName: "bg-green",
  },

  pending: {
    label: "Pending",
    className: "border-[#E5C89D] bg-[#FBF4E8] text-[#9A5B20]",
    dotClassName: "bg-[#C47A31]",
  },

  under_review: {
    label: "Under review",
    className: "border-[#E5C89D] bg-[#FBF4E8] text-[#9A5B20]",
    dotClassName: "bg-[#C47A31]",
  },

  processing: {
    label: "Processing",
    className: "border-[#C9D9CF] bg-[#EEF4EF] text-[#356047]",
    dotClassName: "bg-[#567C64]",
  },

  in_transit: {
    label: "In transit",
    className: "border-[#C7D8D8] bg-[#EDF5F4] text-[#426D6A]",
    dotClassName: "bg-[#5B8B87]",
  },

  draft: {
    label: "Draft",
    className: "border-[#DFDAD0] bg-[#F7F5F0] text-stone",
    dotClassName: "bg-stone",
  },

  archived: {
    label: "Archived",
    className: "border-[#DFDAD0] bg-[#F7F5F0] text-stone",
    dotClassName: "bg-stone",
  },

  inactive: {
    label: "Inactive",
    className: "border-[#DFDAD0] bg-[#F7F5F0] text-stone",
    dotClassName: "bg-stone",
  },

  closed: {
    label: "Closed",
    className: "border-[#DFDAD0] bg-[#F7F5F0] text-stone",
    dotClassName: "bg-stone",
  },

  completed: {
    label: "Completed",
    className: "border-[#D6DDD8] bg-[#F0F4F1] text-ink-soft",
    dotClassName: "bg-ink-soft",
  },

  rejected: {
    label: "Rejected",
    className: "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]",
    dotClassName: "bg-[#B95040]",
  },

  failed: {
    label: "Failed",
    className: "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]",
    dotClassName: "bg-[#B95040]",
  },

  cancelled: {
    label: "Cancelled",
    className: "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]",
    dotClassName: "bg-[#B95040]",
  },

  flagged: {
    label: "Flagged",
    className: "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]",
    dotClassName: "bg-[#B95040]",
  },

  disputed: {
    label: "Disputed",
    className: "border-[#EDCBC4] bg-[#FBEEEB] text-[#A84435]",
    dotClassName: "bg-[#B95040]",
  },

  suspended: {
    label: "Suspended",
    className: "border-[#E5C89D] bg-[#FBF4E8] text-[#9A5B20]",
    dotClassName: "bg-[#C47A31]",
  },

  refunded: {
    label: "Refunded",
    className: "border-[#D8CFDF] bg-[#F5F1F7] text-[#725C7C]",
    dotClassName: "bg-[#856B90]",
  },

  open: {
    label: "Open",
    className: "border-[#CBD9D0] bg-[#EFF5F1] text-[#42644F]",
    dotClassName: "bg-[#567C64]",
  },
};

interface StatusBadgeProps {
  status: Status | null | undefined;
  className?: string;
  showDot?: boolean;
}

export default function StatusBadge({
  status,
  className = "",
  showDot = true,
}: StatusBadgeProps) {
  if (!status) {
    return (
      <span
        className={`
          inline-flex items-center
          rounded-full
          border border-[#DFDAD0]
          bg-[#F7F5F0]
          px-2.5 py-1
          text-[11px]
          font-semibold
          text-stone
          ${className}
        `}
      >
        —
      </span>
    );
  }

  const normalized = status.toLowerCase() as NormalizedStatus;

  const config = STATUS_CONFIG[normalized];

  if (!config) {
    return (
      <span
        className={`
          inline-flex items-center
          rounded-full
          border border-[#DFDAD0]
          bg-[#F7F5F0]
          px-2.5 py-1
          text-[11px]
          font-semibold
          text-stone
          ${className}
        `}
      >
        {status}
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[11px]
        font-semibold
        leading-none
        ${config.className}
        ${className}
      `}
    >
      {showDot && (
        <span
          className={`
            h-1.5
            w-1.5
            rounded-full
            ${config.dotClassName}
          `}
        />
      )}

      {config.label}
    </span>
  );
}
