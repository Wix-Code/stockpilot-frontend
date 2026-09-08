import { Building2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import StatusBadge from "../reuseable/StatusProps";
import { formatCurrency } from "@/lib/Format";
import { Supplier } from "./SuppliersTypes";

interface SupplierDetailsProps {
  supplier: Supplier;
  onEdit: () => void;
}

export function SupplierDetails({ supplier, onEdit }: SupplierDetailsProps) {
  return (
    <div className="space-y-7">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-tint text-green">
          <Building2 size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-ink">{supplier.name}</h2>

          <div className="mt-2">
            <StatusBadge
              status={supplier.status === "active" ? "Active" : "Inactive"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard label="Purchases" value={supplier.purchaseCount.toString()} />

        <InfoCard
          label="Purchase value"
          value={formatCurrency(supplier.totalPurchases)}
        />
      </div>

      <section>
        <h3 className="mb-3 text-sm font-bold text-ink">Contact information</h3>

        <div className="divide-y divide-[#EEEAE1] rounded-2xl border border-[#E4E0D6]">
          <DetailRow
            icon={<UserRound size={15} />}
            label="Contact person"
            value={supplier.contactPerson || "—"}
          />

          <DetailRow
            icon={<Phone size={15} />}
            label="Phone"
            value={supplier.phone || "—"}
          />

          <DetailRow
            icon={<Mail size={15} />}
            label="Email"
            value={supplier.email || "—"}
          />

          <DetailRow
            icon={<MapPin size={15} />}
            label="Address"
            value={supplier.address || "—"}
          />
        </div>
      </section>

      {supplier.notes && (
        <section>
          <h3 className="mb-3 text-sm font-bold text-ink">Notes</h3>

          <div className="rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-4 text-sm leading-6 text-ink-soft">
            {supplier.notes}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="h-11 w-full rounded-xl bg-green text-sm font-bold text-white hover:bg-green-deep"
      >
        Edit supplier
      </button>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E4E0D6] bg-[#FBFAF6] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone">
        {label}
      </p>

      <p className="mt-2 text-base font-bold text-ink">{value}</p>
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

      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-stone">{label}</p>

        <p className="mt-0.5 truncate text-xs font-semibold text-ink">
          {value}
        </p>
      </div>
    </div>
  );
}
