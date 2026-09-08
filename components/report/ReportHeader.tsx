import { Download } from "lucide-react";

interface ReportHeaderProps {
  onExport?: () => void;
}

export function ReportHeader({ onExport }: ReportHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Reports
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Review inventory, sales, purchases and stock activity.
        </p>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD8CC] bg-white px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-[#F7F5F0]"
      >
        <Download size={17} />
        Export
      </button>
    </div>
  );
}
