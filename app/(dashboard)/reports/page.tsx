"use client";

import { inventoryItems } from "@/components/inventory/MockData";
import { purchases } from "@/components/purchase/MockData";
import { inventoryReportColumns } from "@/components/report/InventoryReportColumns";
import { purchaseReportColumns } from "@/components/report/PurchaseReportColumns";
import { ReportFilters } from "@/components/report/ReportFilters";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportTable } from "@/components/report/ReportsTable";
import { ReportStats } from "@/components/report/ReportStats";
import { ReportType } from "@/components/report/ReportTypes";
import { salesReportColumns } from "@/components/report/SalesReportColumns";
import { sales } from "@/components/sales/MockData";
import { useState } from "react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>("inventory");

  const [period, setPeriod] = useState("30_days");

  function exportReport() {
    console.log("Export", reportType, period);
  }

  return (
    <>
      <ReportHeader onExport={exportReport} />

      <ReportFilters
        reportType={reportType}
        onReportTypeChange={setReportType}
        period={period}
        onPeriodChange={setPeriod}
      />

      <ReportStats
        inventory={inventoryItems}
        sales={sales}
        purchases={purchases}
      />

      {reportType === "inventory" && (
        <ReportTable
          data={inventoryItems}
          columns={inventoryReportColumns}
          emptyMessage="No inventory records available."
        />
      )}

      {reportType === "sales" && (
        <ReportTable
          data={sales}
          columns={salesReportColumns}
          emptyMessage="No sales records available."
        />
      )}

      {reportType === "purchases" && (
        <ReportTable
          data={purchases}
          columns={purchaseReportColumns}
          emptyMessage="No purchase records available."
        />
      )}

      {reportType === "low_stock" && (
        <ReportTable
          data={inventoryItems.filter(
            (item) => item.stockQty <= item.reorderLevel,
          )}
          columns={inventoryReportColumns}
          emptyMessage="No products currently require restocking."
        />
      )}

      {reportType === "movements" && (
        <div className="rounded-2xl border border-[#E4E0D6] bg-white px-6 py-16 text-center">
          <p className="text-sm font-semibold text-ink">
            Stock movement report
          </p>

          <p className="mt-2 text-sm text-stone">
            This will use the central inventory movement dataset once all stock
            transactions are connected.
          </p>
        </div>
      )}
    </>
  );
}
