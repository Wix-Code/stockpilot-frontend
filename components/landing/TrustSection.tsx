import { Building2, Boxes, Store, Truck } from "lucide-react";

const industries = [
  {
    title: "Retail Businesses",
    icon: Store,
  },

  {
    title: "Wholesale",
    icon: Boxes,
  },

  {
    title: "Distribution",
    icon: Truck,
  },

  {
    title: "Growing Teams",
    icon: Building2,
  },
];

export function TrustSection() {
  return (
    <section
      className="
border-y
border-[#E4E0D6]
bg-white
px-5
py-12
lg:px-8
"
    >
      <div
        className="
mx-auto
max-w-7xl
"
      >
        <p
          className="
text-center
text-sm
font-semibold
text-stone
"
        >
          Built for businesses that need better inventory control
        </p>

        <div
          className="
mt-8
grid
gap-4
sm:grid-cols-2
lg:grid-cols-4
"
        >
          {industries.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
flex
items-center
justify-center
gap-3
rounded-2xl
border
border-[#E4E0D6]
bg-[#FBFAF6]
px-5
py-5
"
              >
                <div
                  className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-green-tint
text-green
"
                >
                  <Icon size={20} />
                </div>

                <p
                  className="
text-sm
font-bold
text-ink
"
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
