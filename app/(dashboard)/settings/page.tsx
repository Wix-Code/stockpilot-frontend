"use client";

import { BusinessSettingsForm } from "@/components/settings/BusinessSettingsForm";
import { InventorySettingsForm } from "@/components/settings/InventorySettingsForm";
import { NotificationSettingsForm } from "@/components/settings/NotificationSettingsForm";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { SettingsNav, SettingsSection } from "@/components/settings/SettingsNav";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { useState } from "react";

export default function SettingsPage() {
  const [section, setSection] = useState<SettingsSection>("business");

  return (
    <>
      <div className="mb-7">
        <h1 className="text-[28px] font-bold tracking-[-0.035em] text-ink">
          Settings
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-stone">
          Manage your business configuration and StockPilot preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside>
          <div className="rounded-2xl border border-[#E4E0D6] bg-white p-2">
            <SettingsNav active={section} onChange={setSection} />
          </div>
        </aside>

        <div className="min-w-0">
          {section === "business" && (
            <SettingsPanel
              title="Business profile"
              description="Manage the information used across your StockPilot workspace."
            >
              <BusinessSettingsForm
                initialValues={{
                  businessName: "Adeyemi Electronics",

                  phone: "+234 803 455 8900",

                  email: "hello@adeyemielectronics.ng",

                  address: "Wuse 2, Abuja",

                  currency: "NGN",
                }}
              />
            </SettingsPanel>
          )}

          {section === "inventory" && (
            <SettingsPanel
              title="Inventory settings"
              description="Configure default inventory behaviour and stock controls."
            >
              <InventorySettingsForm
                initialValues={{
                  defaultReorderLevel: 5,

                  preventNegativeStock: true,

                  lowStockNotifications: true,
                }}
              />
            </SettingsPanel>
          )}

          {section === "notifications" && (
            <SettingsPanel
              title="Notifications"
              description="Choose which operational events StockPilot should notify you about."
            >
              <NotificationSettingsForm
                initialValues={{
                  lowStock: true,

                  outOfStock: true,

                  purchases: true,

                  emailNotifications: false,
                }}
              />
            </SettingsPanel>
          )}

          {section === "security" && (
            <SettingsPanel
              title="Security"
              description="Manage password and account sessions."
            >
              <SecuritySettings />
            </SettingsPanel>
          )}
        </div>
      </div>
    </>
  );
}
