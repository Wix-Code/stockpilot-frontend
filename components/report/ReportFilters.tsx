"use client";

import { CalendarDays, FileBarChart } from "lucide-react";
import { SelectDropdown } from "../reuseable/SelectDropdown";
import { ReportType } from "./ReportTypes";

interface ReportFiltersProps {
  reportType: ReportType;

  onReportTypeChange: (value: ReportType) => void;

  period: string;

  onPeriodChange: (value: string) => void;
}

export function ReportFilters({
  reportType,
  onReportTypeChange,
  period,
  onPeriodChange,
}: ReportFiltersProps) {
  return (
    <div className="mb-6 grid gap-3 rounded-2xl border border-[#E4E0D6] bg-white p-4 sm:grid-cols-2 lg:max-w-[620px]">
      <SelectDropdown
        label="Report"
        value={reportType}
        onChange={(value) => onReportTypeChange(value as ReportType)}
        icon={<FileBarChart size={17} />}
        options={[
          {
            value: "inventory",
            label: "Inventory report",
          },
          {
            value: "sales",
            label: "Sales report",
          },
          {
            value: "purchases",
            label: "Purchase report",
          },
          {
            value: "movements",
            label: "Stock movement report",
          },
          {
            value: "low_stock",
            label: "Low stock report",
          },
        ]}
      />

      <SelectDropdown
        label="Period"
        value={period}
        onChange={onPeriodChange}
        icon={<CalendarDays size={17} />}
        options={[
          {
            value: "today",
            label: "Today",
          },
          {
            value: "7_days",
            label: "Last 7 days",
          },
          {
            value: "30_days",
            label: "Last 30 days",
          },
          {
            value: "month",
            label: "This month",
          },
        ]}
      />
    </div>
  );
}
