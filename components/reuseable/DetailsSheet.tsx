"use client";

import type { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: ReactNode;
  description?: ReactNode;

  children: ReactNode;

  headerActions?: ReactNode;

  width?: "md" | "lg" | "xl" | number;
}

export function DetailsSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  headerActions,
  width = "lg",
}: DetailsSheetProps) {
  const widthClasses = {
    md: "sm:max-w-[480px]",
    lg: "sm:max-w-[580px]",
    xl: "sm:max-w-[680px]",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`
          w-full
          overflow-y-auto
          border-l border-[#E4E0D6]
          bg-white
          p-0
          ${typeof width === "string" ? widthClasses[width] : `sm:max-w-[${width}px]`}
        `}
      >
        <div className="border-b border-[#E4E0D6] px-6 py-5">
          <SheetHeader className="text-left">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <SheetTitle className="text-xl font-bold tracking-[-0.025em] text-ink">
                  {title}
                </SheetTitle>

                {description && (
                  <SheetDescription className="mt-1.5 text-[13px] leading-5 text-stone">
                    {description}
                  </SheetDescription>
                )}
              </div>

              {headerActions && (
                <div className="mr-7 shrink-0">{headerActions}</div>
              )}
            </div>
          </SheetHeader>
        </div>

        <div className="px-6 py-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
