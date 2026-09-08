import { Boxes } from "lucide-react";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${light ? "bg-white/12 text-white ring-1 ring-white/20" : "bg-stockpilot-800 text-white"}`}>
        <Boxes size={22} strokeWidth={2.2} />
      </div>
      <div>
        <div className={`text-[17px] font-bold tracking-[0.08em] ${light ? "text-white" : "text-stockpilot-800"}`}>STOCKPILOT</div>
        <div className={`mt-0.5 text-[10px] font-medium tracking-wide ${light ? "text-white/65" : "text-slate-500"}`}>INVENTORY MANAGEMENT</div>
      </div>
    </div>
  );
}
