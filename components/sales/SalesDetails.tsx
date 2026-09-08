import { formatCurrency } from "@/lib/utils";
import { Sale } from "./SalesType";
import StatusBadge from "../reuseable/StatusProps";

interface SaleDetailsProps {
  sale: Sale;
  onCancel: () => void;
}

export function SaleDetails({ sale, onCancel }: SaleDetailsProps) {
  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-ink">
              {sale.reference}
            </p>

            <p className="mt-1 text-xs text-stone">
              {sale.customerName || "Walk-in Customer"}
            </p>
          </div>

          <StatusBadge status={sale.status} />
        </div>

        <p className="mt-5 tabular text-2xl font-bold text-ink">
          {formatCurrency(sale.total)}
        </p>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">Items</h3>

        <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          {sale.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 px-4 py-3.5"
            >
              <div>
                <p className="text-xs font-semibold text-ink">
                  {item.productName}
                </p>

                <p className="mt-1 text-[11px] text-stone">
                  {item.quantity} × {formatCurrency(item.unitPrice)}
                </p>
              </div>

              <p className="tabular text-xs font-bold text-ink">
                {formatCurrency(item.subtotal)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SummaryRow label="Subtotal" value={formatCurrency(sale.subtotal)} />

        <SummaryRow label="Discount" value={formatCurrency(sale.discount)} />

        <SummaryRow
          label="Payment"
          value={sale.paymentStatus === "paid" ? "Paid" : "Pending"}
        />

        <SummaryRow label="Recorded by" value={sale.createdBy} />
      </section>

      {sale.status !== "cancelled" && (
        <button
          type="button"
          onClick={onCancel}
          className="h-11 w-full rounded-xl border border-[#EDCBC4] bg-[#FBEEEB] text-sm font-semibold text-[#A84435]"
        >
          Cancel sale
        </button>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-stone">{label}</span>

      <span className="text-xs font-semibold text-ink">{value}</span>
    </div>
  );
}
