import {
  BellRing,
  ChartNoAxesCombined,
  Package,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

const solutions = [
  {
    title: "Inventory Management",
    description: "Track products, quantities, movements and reorder levels.",
    icon: Package,
  },

  {
    title: "Sales Tracking",
    description: "Record sales and understand what products drive revenue.",
    icon: ShoppingCart,
  },

  {
    title: "Purchase Management",
    description: "Manage suppliers and receive inventory seamlessly.",
    icon: Truck,
  },

  {
    title: "Business Reports",
    description: "Transform daily transactions into useful insights.",
    icon: ChartNoAxesCombined,
  },

  {
    title: "Team Management",
    description: "Give staff the right access while protecting your data.",
    icon: Users,
  },

  {
    title: "Stock Alerts",
    description: "Know what needs attention before products run out.",
    icon: BellRing,
  },
];

export function SolutionSection() {
  return (
    <section
      id="solutions"
      className="
bg-[#FBFAF6]
px-5
py-20
lg:px-8
lg:py-28
"
    >
      <div
        className="
mx-auto
max-w-7xl
"
      >
        <div
          className="
mx-auto
max-w-3xl
text-center
"
        >
          <p
            className="
text-sm
font-bold
uppercase
tracking-[0.15em]
text-green
"
          >
            The solution
          </p>

          <h2
            className="
mt-4
text-4xl
font-bold
tracking-[-0.04em]
text-ink
md:text-5xl
"
          >
            Everything you need to run inventory with confidence.
          </h2>
        </div>

        <div
          className="
mt-12
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {solutions.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
rounded-2xl
border
border-[#E4E0D6]
bg-white
p-6
"
              >
                <div
                  className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-green-tint
text-green
"
                >
                  <Icon size={21} />
                </div>

                <h3
                  className="
mt-5
font-bold
text-ink
"
                >
                  {item.title}
                </h3>

                <p
                  className="
mt-2
text-sm
leading-6
text-stone
"
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
