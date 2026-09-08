"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  title: ReactNode;

  description?: ReactNode;

  children: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "lg",
}: FormDialogProps) {
  const sizeClasses = {
    sm: "sm:max-w-[420px]",
    md: "sm:max-w-[520px]",
    lg: "sm:max-w-[680px]",
    xl: "sm:max-w-[820px]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border-[#E4E0D6]
          bg-white
          p-0
          shadow-[0_24px_70px_rgba(18,38,30,0.14)]
          ${sizeClasses[size]}
        `}
      >
        <DialogHeader className="border-b border-[#E4E0D6] px-6 py-5 text-left">
          <DialogTitle className="text-xl font-bold tracking-[-0.025em] text-ink">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="mt-1 text-[13px] leading-5 text-stone">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="px-6 py-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
