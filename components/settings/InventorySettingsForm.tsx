"use client";

import { useState } from "react";
import { InventorySettings } from "./SettingsTypes";
import { SettingToggle } from "./SettingToggle";
import { SaveButton } from "../reuseable/SavedButton";

interface Props {
  initialValues: InventorySettings;
}

export function InventorySettingsForm({ initialValues }: Props) {
  const [settings, setSettings] = useState(initialValues);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log(settings);
      }}
      className="space-y-6"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">
          Default reorder level
        </span>

        <input
          type="number"
          min="0"
          value={settings.defaultReorderLevel}
          onChange={(e) =>
            setSettings({
              ...settings,

              defaultReorderLevel: Number(e.target.value),
            })
          }
          className="
            h-12 w-full
            max-w-[250px]
            rounded-xl
            border border-[#DDD8CC]
            px-3.5
            text-sm font-semibold
            text-ink
            outline-none
            focus:border-green
            focus:ring-4
            focus:ring-green/10
          "
        />

        <p className="mt-2 text-xs text-stone">
          Applied by default when creating new products.
        </p>
      </label>

      <div className="space-y-3">
        <SettingToggle
          title="Prevent negative stock"
          description="Block stock-out transactions when there is insufficient inventory."
          checked={settings.preventNegativeStock}
          onChange={(value) =>
            setSettings({
              ...settings,

              preventNegativeStock: value,
            })
          }
        />

        <SettingToggle
          title="Low stock warnings"
          description="Flag products that reach or fall below their reorder level."
          checked={settings.lowStockNotifications}
          onChange={(value) =>
            setSettings({
              ...settings,

              lowStockNotifications: value,
            })
          }
        />
      </div>

      <SaveButton />
    </form>
  );
}
