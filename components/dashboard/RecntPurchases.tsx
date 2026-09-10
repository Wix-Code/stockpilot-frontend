"use client";

import { formatCurrency } from "@/lib/utils";
import { ArrowRight, PackageCheck, Clock3, ShoppingBag } from "lucide-react";

type PurchaseStatusType = "received" | "pending";

interface RecentPurchase {
  id: string;
  supplier: string;
  items: number;
  amount: number;
  status: PurchaseStatusType;
  date: string;
}

const purchases: RecentPurchase[] = [
  {
    id: "PO-0018",
    supplier: "Tech Distribution Nigeria",
    items: 10,
    amount: 10800000,
    status: "received",
    date: "Today",
  },

  {
    id: "PO-0017",
    supplier: "MobileHub Wholesale",
    items: 6,
    amount: 2400000,
    status: "pending",
    date: "Yesterday",
  },

  {
    id: "PO-0016",
    supplier: "Prime Accessories Ltd",
    items: 25,
    amount: 850000,
    status: "received",
    date: "3 days ago",
  },

  {
    id: "PO-0015",
    supplier: "Tech Distribution Nigeria",
    items: 4,
    amount: 620000,
    status: "received",
    date: "5 days ago",
  },
];

export function RecentPurchases() {
  return (
    <div
      className="
        rounded-2xl
        border border-[#E4E0D6]
        bg-white
        p-5
      "
    >
      {/* Header */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-bold
              text-ink
            "
          >
            Recent purchases
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-stone
            "
          >
            Latest supplier transactions
          </p>
        </div>

        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-semibold
            text-green
            hover:text-green-deep
          "
        >
          View all
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Purchase List */}

      <div
        className="
          divide-y
          divide-[#EEEAE1]
        "
      >
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="
              flex
              items-center
              gap-4
              py-4
            "
          >
            {/* Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-green-tint
                text-green
              "
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
            </div>

            {/* Details */}

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-ink
                  "
                >
                  {purchase.supplier}
                </p>

                <span
                  className="
                    text-[11px]
                    text-stone
                  "
                >
                  {purchase.date}
                </span>
              </div>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    font-mono
                    text-[11px]
                    text-stone
                  "
                >
                  {purchase.id}
                </span>

                <span
                  className="
                    text-xs
                    text-stone
                  "
                >
                  {purchase.items} items
                </span>
              </div>
            </div>

            {/* Amount */}

            <div
              className="
                text-right
              "
            >
              <p
                className="
                  text-sm
                  font-bold
                  text-ink
                "
              >
                {formatCurrency(purchase.amount)}
              </p>

              <PurchaseStatus status={purchase.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PurchaseStatus({ status }: { status: "received" | "pending" }) {
  if (status === "received") {
    return (
      <span
        className="
          mt-1
          inline-flex
          items-center
          gap-1
          text-[11px]
          font-semibold
          text-green
        "
      >
        <PackageCheck size={12} />
        Received
      </span>
    );
  }

  return (
    <span
      className="
        mt-1
        inline-flex
        items-center
        gap-1
        text-[11px]
        font-semibold
        text-terracotta
      "
    >
      <Clock3 size={12} />
      Pending
    </span>
  );
}
