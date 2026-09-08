import { formatCurrency } from "@/lib/utils";
import StatusBadge from "../reuseable/StatusProps";
import { Purchase } from "./PurchaseTypes";

interface PurchaseDetailsProps {
  purchase: Purchase;
  onReceive: () => void;
}

export function PurchaseDetails({ purchase, onReceive }: PurchaseDetailsProps) {
  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-ink">
              {purchase.reference}
            </p>

            <p className="mt-1 text-xs text-stone">{purchase.supplierName}</p>
          </div>

          <StatusBadge status={purchase.status as any} />
        </div>

        <p className="mt-5 tabular text-2xl font-bold text-ink">
          {formatCurrency(purchase.total)}
        </p>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">Purchase items</h3>

        <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          {purchase.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 px-4 py-3.5"
            >
              <div>
                <p className="text-xs font-semibold text-ink">
                  {item.productName}
                </p>

                <p className="mt-1 text-[11px] text-stone">
                  {item.quantity} × {formatCurrency(item.unitCost)}
                </p>
              </div>

              <p className="tabular text-xs font-bold text-ink">
                {formatCurrency(item.subtotal)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {purchase.status === "pending" && (
        <button
          type="button"
          onClick={onReceive}
          className="h-11 w-full rounded-xl bg-green text-sm font-bold text-white hover:bg-green-deep"
        >
          Receive purchase into stock
        </button>
      )}
    </div>
  );
}
