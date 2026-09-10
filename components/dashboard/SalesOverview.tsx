"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";

import type { DashboardPeriod } from "./PeriodDropdown";

interface Props {
  period: DashboardPeriod;
}

const datasets = {
  "7": [
    { day: "Mon", sales: 120000 },
    { day: "Tue", sales: 180000 },
    { day: "Wed", sales: 145000 },
    { day: "Thu", sales: 260000 },
    { day: "Fri", sales: 320000 },
    { day: "Sat", sales: 280000 },
    { day: "Sun", sales: 245000 },
  ],

  "14": [
    { day: "1", sales: 100000 },
    { day: "2", sales: 150000 },
    { day: "3", sales: 180000 },
    { day: "4", sales: 120000 },
    { day: "5", sales: 250000 },
    { day: "6", sales: 300000 },
    { day: "7", sales: 220000 },
    { day: "8", sales: 350000 },
    { day: "9", sales: 280000 },
    { day: "10", sales: 400000 },
    { day: "11", sales: 330000 },
    { day: "12", sales: 290000 },
    { day: "13", sales: 380000 },
    { day: "14", sales: 450000 },
  ],

  "30": [
    { day: "1", sales: 220000 },
    { day: "5", sales: 320000 },
    { day: "10", sales: 280000 },
    { day: "15", sales: 420000 },
    { day: "20", sales: 380000 },
    { day: "25", sales: 520000 },
    { day: "30", sales: 600000 },
  ],

  month: [
    { day: "Week 1", sales: 900000 },
    { day: "Week 2", sales: 1200000 },
    { day: "Week 3", sales: 1400000 },
    { day: "Week 4", sales: 1700000 },
  ],

  "90": [
    { day: "Jan", sales: 3500000 },
    { day: "Feb", sales: 4200000 },
    { day: "Mar", sales: 5000000 },
  ],
};

export function SalesOverview({ period }: Props) {
  const data = datasets[period];

  return (
    <div
      className="
rounded-2xl
border border-[#E4E0D6]
bg-white
p-5
"
    >
      <div
        className="
mb-6
flex
items-start
justify-between
"
      >
        <div>
          <p
            className="
text-xs
font-semibold
text-stone
"
          >
            Sales overview
          </p>

          <h3
            className="
mt-1
text-xl
font-bold
text-ink
"
          >
            ₦1.55M
          </h3>

          <div
            className="
mt-2
flex
items-center
gap-1
text-xs
font-semibold
text-green
"
          >
            <TrendingUp size={14} />
            12.4% increase
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2F6844" stopOpacity={0.25} />

                <stop offset="1" stopColor="#2F6844" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#8A8371",
              }}
            />

            <YAxis hide />

            <Tooltip
              formatter={(value) => [
                `₦${Number(value ?? 0).toLocaleString()}`,
                "Sales",
              ]}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2F6844"
              strokeWidth={3}
              fill="url(#salesFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
