import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({
  children,
  loading = false,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="
        flex h-[52px] w-full items-center justify-center gap-2
        rounded-[16px] bg-green
        px-5 text-sm font-bold text-white
        shadow-[0_5px_14px_rgba(47,104,68,0.18)]
        transition-all duration-200
        hover:bg-green-deep
        hover:shadow-[0_7px_20px_rgba(47,104,68,0.22)]
        active:translate-y-px
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading && <LoaderCircle size={18} className="animate-spin" />}

      {loading ? "Signing in..." : children}
    </button>
  );
}
