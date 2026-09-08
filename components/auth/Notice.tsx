import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";

type NoticeType = "error" | "success" | "info";

interface NoticeProps {
  children: ReactNode;
  type?: NoticeType;
}

const styles: Record<
  NoticeType,
  {
    wrapper: string;
    icon: React.ReactNode;
  }
> = {
  error: {
    wrapper: "border-red-200 bg-red-50 text-red-700",
    icon: <AlertCircle size={17} />,
  },
  success: {
    wrapper: "border-green/20 bg-green-tint text-green-deep",
    icon: <CheckCircle2 size={17} />,
  },
  info: {
    wrapper: "border-blue-200 bg-blue-50 text-blue-700",
    icon: <Info size={17} />,
  },
};

export function Notice({ children, type = "info" }: NoticeProps) {
  const config = styles[type];

  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-5 ${config.wrapper}`}
    >
      <span className="mt-0.5 shrink-0">{config.icon}</span>

      <div>{children}</div>
    </div>
  );
}
