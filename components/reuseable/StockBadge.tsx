interface StockBadgeProps {
  quantity: number;
  reorderLevel: number;
}

export function StockBadge({ quantity, reorderLevel }: StockBadgeProps) {
  if (quantity <= 0) {
    return (
      <span
        className="
          inline-flex items-center gap-1.5
          rounded-full
          border border-[#EDCBC4]
          bg-[#FBEEEB]
          px-2.5 py-1
          text-[11px]
          font-semibold
          text-[#A84435]
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#B95040]" />
        Out of stock
      </span>
    );
  }

  if (quantity <= reorderLevel) {
    return (
      <span
        className="
          inline-flex items-center gap-1.5
          rounded-full
          border border-[#E5C89D]
          bg-[#FBF4E8]
          px-2.5 py-1
          text-[11px]
          font-semibold
          text-[#9A5B20]
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#C47A31]" />
        Low stock
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex items-center gap-1.5
        rounded-full
        border border-green/20
        bg-green-tint
        px-2.5 py-1
        text-[11px]
        font-semibold
        text-green-deep
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-green" />
      In stock
    </span>
  );
}
