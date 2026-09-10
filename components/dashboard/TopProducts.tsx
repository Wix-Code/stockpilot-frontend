import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "iPhone 15 Pro",
    sold: 18,
    revenue: "₦22.5M",
  },
  {
    name: "Samsung A55",
    sold: 14,
    revenue: "₦7.2M",
  },
  {
    name: "AirPods Pro",
    sold: 11,
    revenue: "₦2M",
  },
];

export function TopProducts() {
  return (
    <div
      className="
rounded-2xl
border border-[#E4E0D6]
bg-white
p-5
"
    >
      <div className="flex justify-between mb-5">
        <h3
          className="
text-sm
font-bold
text-ink
"
        >
          Top selling products
        </h3>

        <button
          className="
text-xs
font-semibold
text-green
"
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div
            key={item.name}
            className="
flex
items-center
justify-between
"
          >
            <div className="flex gap-3">
              <div
                className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-green-tint
font-bold
text-green
"
              >
                {index + 1}
              </div>

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
                  {item.sold} units sold
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className="
text-sm
font-bold
text-ink
"
              >
                {item.revenue}
              </p>

              <ArrowUpRight size={14} className="ml-auto text-green" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
