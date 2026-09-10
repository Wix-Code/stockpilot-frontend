import { AlertTriangle } from "lucide-react";

const items = [
  {
    name: "AirPods Pro",
    qty: 2,
  },
  {
    name: "Tecno Camon 30",
    qty: 3,
  },
  {
    name: "Samsung A55",
    qty: 0,
  },
];

export function LowStock() {
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
flex
items-center
gap-2
mb-5
"
      >
        <AlertTriangle size={18} className="text-terracotta" />

        <h3
          className="
text-sm
font-bold
text-ink
"
        >
          Low stock alerts
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="
flex
justify-between
items-center
"
          >
            <div>
              <p
                className="
text-sm
font-semibold
text-ink
"
              >
                {item.name}
              </p>

              <p
                className="
text-xs
text-stone
"
              >
                Needs restocking
              </p>
            </div>

            <span
              className="
rounded-full
bg-terracotta-tint
px-3
py-1
text-xs
font-bold
text-terracotta
"
            >
              {item.qty} left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
