import type { ReactNode } from "react";

interface SettingsPanelProps {
  title: string;

  description: string;

  children: ReactNode;
}

export function SettingsPanel({
  title,
  description,
  children,
}: SettingsPanelProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border border-[#E4E0D6]
        bg-white
      "
    >
      <div className="border-b border-[#E4E0D6] px-6 py-5">
        <h2 className="text-base font-bold text-ink">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-stone">{description}</p>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}
