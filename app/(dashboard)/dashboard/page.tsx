import { Banknote, PackageCheck, PackageX, TriangleAlert } from "lucide-react";

import { DashboardHeader } from "@/components/layout/dashboardHeader";
import { StatCard } from "@/components/reuseable/StatsCard";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Today's sales"
            value="₦245,000"
            description="Compared with yesterday"
            icon={<Banknote size={20} strokeWidth={1.8} />}
            trend={{
              value: "12.4%",
              direction: "up",
              label: "vs yesterday",
            }}
          />

          <StatCard
            title="Inventory value"
            value="₦3.82M"
            description="1,842 units currently in stock"
            icon={<PackageCheck size={20} strokeWidth={1.8} />}
          />

          <StatCard
            title="Low stock"
            value="12"
            description="Products below reorder level"
            icon={<TriangleAlert size={20} strokeWidth={1.8} />}
            tone="warning"
          />

          <StatCard
            title="Out of stock"
            value="4"
            description="Products requiring attention"
            icon={<PackageX size={20} strokeWidth={1.8} />}
            tone="danger"
          />
        </div>
      </section>
    </>
  );
}
