"use client";

import { useState } from "react";
import { NotificationSettings } from "./SettingsTypes";
import { SettingToggle } from "./SettingToggle";
import { SaveButton } from "../reuseable/SavedButton";

interface Props {
  initialValues: NotificationSettings;
}

export function NotificationSettingsForm({ initialValues }: Props) {
  const [settings, setSettings] = useState(initialValues);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log(settings);
      }}
      className="space-y-3"
    >
      <SettingToggle
        title="Low stock"
        description="Notify when a product reaches its reorder level."
        checked={settings.lowStock}
        onChange={(value) =>
          setSettings({
            ...settings,
            lowStock: value,
          })
        }
      />

      <SettingToggle
        title="Out of stock"
        description="Notify when product quantity reaches zero."
        checked={settings.outOfStock}
        onChange={(value) =>
          setSettings({
            ...settings,
            outOfStock: value,
          })
        }
      />

      <SettingToggle
        title="Purchase receiving"
        description="Notify when purchase orders are received into inventory."
        checked={settings.purchases}
        onChange={(value) =>
          setSettings({
            ...settings,
            purchases: value,
          })
        }
      />

      <SettingToggle
        title="Email notifications"
        description="Send selected notifications to the business email address."
        checked={settings.emailNotifications}
        onChange={(value) =>
          setSettings({
            ...settings,
            emailNotifications: value,
          })
        }
      />

      <div className="pt-3">
        <SaveButton />
      </div>
    </form>
  );
}
