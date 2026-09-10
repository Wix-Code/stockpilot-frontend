"use client";

import { useState } from "react";

import { DashboardHeader } from "@/components/layout/dashboardHeader";

import { SalesOverview } from "@/components/dashboard/SalesOverview";

import { StockHealth } from "@/components/dashboard/StockHealth";

import {
  PeriodDropdown,
  DashboardPeriod,
} from "@/components/dashboard/PeriodDropdown";

import { LowStock } from "@/components/dashboard/LowStock";

import { TopProducts } from "@/components/dashboard/TopProducts";

import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { RecentPurchases } from "@/components/dashboard/RecntPurchases";

export default function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>("7");

  return (
    <>
      <DashboardHeader />

      <div
        className="
          mb-5
          flex
          justify-end
        "
      >
        <PeriodDropdown value={period} onChange={setPeriod} />
      </div>

      <section
        className="
          grid
          gap-5
          xl:grid-cols-[2fr_1fr]
        "
      >
        <SalesOverview period={period} />

        <StockHealth healthy={180} low={35} out={12} />
      </section>

      <section
        className="
          mt-5
          grid
          gap-5
          lg:grid-cols-2
        "
      >
        <TopProducts />

        <LowStock />
        <RecentActivity />
        <RecentPurchases />
      </section>

      {/* <section className="mt-5">
        <RecentActivity />
      </section> */}
    </>
  );
}
