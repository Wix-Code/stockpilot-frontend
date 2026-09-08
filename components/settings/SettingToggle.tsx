"use client";

interface SettingToggleProps {
  title: string;
  description: string;

  checked: boolean;

  onChange: (checked: boolean) => void;
}

export function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: SettingToggleProps) {
  return (
    <div
      className="
        flex items-center justify-between
        gap-6
        rounded-xl
        border border-[#E4E0D6]
        p-4
      "
    >
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>

        <p className="mt-1 text-xs leading-5 text-stone">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6 w-11
          shrink-0
          rounded-full
          transition-colors

          ${checked ? "bg-green" : "bg-[#D8D2C2]"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4 w-4
            rounded-full
            bg-white
            shadow-sm
            transition-transform

            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
