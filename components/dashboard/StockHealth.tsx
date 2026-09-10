"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  healthy: number;
  low: number;
  out: number;
}

export function StockHealth({ healthy, low, out }: Props) {
  const data = [
    {
      name: "Healthy",
      value: healthy,
      color: "#2F6844",
    },
    {
      name: "Low stock",
      value: low,
      color: "#C8622A",
    },
    {
      name: "Out",
      value: out,
      color: "#B5473C",
    },
  ];

  const total = healthy + low + out;

  const percentage = Math.round((healthy / total) * 100);

  return (
    <div
      className="
rounded-2xl
border border-[#E4E0D6]
bg-white
p-5
"
    >
      <p
        className="
text-xs
font-semibold
text-stone
"
      >
        Stock health
      </p>

      <div
        className="
relative
h-[220px]
"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          className="
absolute
inset-0
flex
flex-col
items-center
justify-center
"
        >
          <p
            className="
text-3xl
font-bold
text-ink
"
          >
            {percentage}%
          </p>

          <p
            className="
text-xs
text-stone
"
          >
            Healthy
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="
flex
justify-between
"
          >
            <div
              className="
flex
items-center
gap-2
"
            >
              <span
                className="
h-2
w-2
rounded-full
"
                style={{
                  background: item.color,
                }}
              />

              <span
                className="
text-sm
text-stone
"
              >
                {item.name}
              </span>
            </div>

            <span
              className="
font-bold
text-ink
"
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
