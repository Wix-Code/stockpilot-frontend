"use client";

import { Check, ChevronDown } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface SelectDropdownProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export function SelectDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  icon,
  disabled = false,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function selectOption(option: SelectOption) {
    onChange(option.value);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-ink">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={[
          "group flex h-[52px] w-full items-center",
          "rounded-[16px] border bg-white px-3.5",
          "text-left transition-all duration-200",
          "border-[#DDD8CC]",
          "hover:border-[#C7C0B1]",
          open ? "border-green ring-4 ring-green/10" : "",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
      >
        {icon && (
          <span
            className={[
              "mr-3 shrink-0 transition-colors",
              open ? "text-green" : "text-stone group-hover:text-ink-soft",
            ].join(" ")}
          >
            {icon}
          </span>
        )}

        <div className="min-w-0 flex-1">
          {selected ? (
            <div className="flex items-center gap-2.5">
              {selected.icon && (
                <span className="shrink-0">{selected.icon}</span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {selected.label}
                </p>

                {selected.description && (
                  <p className="mt-0.5 truncate text-[11px] text-stone">
                    {selected.description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm text-[#A49D8E]">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          size={18}
          strokeWidth={1.8}
          className={[
            "ml-3 shrink-0 text-stone transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 top-[calc(100%+8px)]
            z-50 overflow-hidden rounded-2xl
            border border-[#E2DDD2]
            bg-white
            p-1.5
            shadow-[0_18px_45px_rgba(18,38,30,0.12)]
          "
        >
          <div className="max-h-72 overflow-y-auto">
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectOption(option)}
                  className={[
                    "flex w-full items-center gap-3",
                    "rounded-xl px-3 py-2.5",
                    "text-left transition-colors",
                    active ? "bg-green-tint" : "hover:bg-[#F8F6F1]",
                  ].join(" ")}
                >
                  {option.icon && (
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        active
                          ? "bg-white text-green"
                          : "bg-[#F5F2EA] text-stone",
                      ].join(" ")}
                    >
                      {option.icon}
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        "truncate text-sm font-semibold",
                        active ? "text-green-deep" : "text-ink",
                      ].join(" ")}
                    >
                      {option.label}
                    </p>

                    {option.description && (
                      <p className="mt-0.5 truncate text-[11px] text-stone">
                        {option.description}
                      </p>
                    )}
                  </div>

                  {active && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-white">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
