import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

const screens = [
  {
    title: "Dashboard",
    description: "Understand your business performance instantly.",
    icon: LayoutDashboard,
  },

  {
    title: "Inventory",
    description: "Track stock levels and movements.",
    icon: Package,
  },

  {
    title: "Sales",
    description: "Record transactions and monitor revenue.",
    icon: ShoppingCart,
  },
];

export function ProductShowcase() {
  return (
    <section
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
        <div className="text-center">
          <p
            className="
text-sm
font-bold
uppercase
tracking-[0.15em]
text-green
"
          >
            Inside StockPilot
          </p>

          <h2
            className="
mt-4
text-4xl
font-bold
tracking-[-0.04em]
text-ink
"
          >
            A complete workspace for your operations.
          </h2>
        </div>

        <div
          className="
mt-12
grid
gap-6
lg:grid-cols-3
"
        >
          {screens.map((screen) => {
            const Icon = screen.icon;

            return (
              <div
                key={screen.title}
                className="
overflow-hidden
rounded-3xl
border
border-[#E4E0D6]
bg-white
"
              >
                <div
                  className="
flex
h-56
items-center
justify-center
bg-green-tint
"
                >
                  <Icon size={70} className="text-green" />
                </div>

                <div className="p-6">
                  <h3
                    className="
font-bold
text-ink
"
                  >
                    {screen.title}
                  </h3>

                  <p
                    className="
mt-2
text-sm
leading-6
text-stone
"
                  >
                    {screen.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
