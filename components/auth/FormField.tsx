import type { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export function FormField({
  label,
  icon,
  error,
  id,
  name,
  className,
  ...props
}: FormFieldProps) {
  const inputId = id || name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
        {label}
      </label>

      <div
        className={[
          "group flex h-[52px] items-center rounded-[16px] border bg-white px-3.5 transition-all",
          error
            ? "border-red-400"
            : "border-[#DDD8CC] hover:border-[#C7C0B1] focus-within:border-green focus-within:ring-4 focus-within:ring-green/10",
        ].join(" ")}
      >
        {icon && (
          <span className="mr-3 text-stone transition-colors group-focus-within:text-green">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          className={[
            "h-full w-full border-0 bg-transparent text-[14px] font-medium text-ink outline-none",
            "placeholder:font-normal placeholder:text-[#A49D8E]",
            className ?? "",
          ].join(" ")}
          {...props}
        />
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
