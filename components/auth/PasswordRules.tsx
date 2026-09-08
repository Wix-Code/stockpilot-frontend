import { Check } from "lucide-react";

interface PasswordRulesProps {
  password: string;
}

export function PasswordRules({ password }: PasswordRulesProps) {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Contains a letter",
      valid: /[A-Za-z]/.test(password),
    },
    {
      label: "Contains a number",
      valid: /\d/.test(password),
    },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {rules.map((rule) => (
        <div
          key={rule.label}
          className={[
            "flex items-center gap-2 text-[11px] font-medium transition-colors",
            rule.valid ? "text-green" : "text-stone",
          ].join(" ")}
        >
          <span
            className={[
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
              rule.valid
                ? "border-green bg-green text-white"
                : "border-stone-light bg-white",
            ].join(" ")}
          >
            {rule.valid && <Check size={10} strokeWidth={3} />}
          </span>

          {rule.label}
        </div>
      ))}
    </div>
  );
}
