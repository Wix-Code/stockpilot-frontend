import Link from "next/link";
import { Boxes } from "lucide-react";
import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[550px] flex-col">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green text-white shadow-sm">
              <Boxes size={21} strokeWidth={1.9} />
            </span>

            <span className="text-xl font-bold tracking-[-0.03em]">
              StockPilot
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center">
          <div className="w-full">
            <div className="rounded-[24px] border border-[#E4DFD3] bg-white px-6 py-7 shadow-[0_20px_60px_rgba(18,38,30,0.06)] sm:px-8 sm:py-9">
              <div className="mb-7">
                {eyebrow && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-green">
                    {eyebrow}
                  </p>
                )}

                <h1 className="text-[30px] font-bold leading-tight tracking-[-0.035em] text-ink">
                  {title}
                </h1>

                {description && (
                  <p className="mt-3 max-w-sm text-[14px] leading-6 text-stone">
                    {description}
                  </p>
                )}
              </div>

              {children}
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-stone">
              By continuing, you agree to StockPilot&apos;s{" "}
              <Link
                href="/terms"
                className="font-medium text-ink-soft hover:text-ink"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-ink-soft hover:text-ink"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
