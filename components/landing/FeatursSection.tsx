import { Check } from "lucide-react";

const features = [
  "Real-time inventory visibility",
  "Low stock notifications",
  "Sales performance tracking",
  "Supplier management",
  "Purchase history",
  "Team permissions",
  "Business reports",
  "Exportable data",
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="
px-5
py-20
lg:px-8
lg:py-28
"
    >
      <div
        className="
mx-auto
grid
max-w-7xl
gap-12
lg:grid-cols-2
lg:items-center
"
      >
        <div>
          <p
            className="
text-sm
font-bold
uppercase
tracking-[0.15em]
text-green
"
          >
            Powerful features
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
            Everything your business needs, in one workspace.
          </h2>

          <p
            className="
mt-5
text-lg
leading-8
text-stone
"
          >
            From daily operations to business insights, StockPilot gives you the
            tools to stay in control.
          </p>
        </div>

        <div
          className="
grid
gap-3
sm:grid-cols-2
"
        >
          {features.map((feature) => (
            <div
              key={feature}
              className="
flex
items-center
gap-3
rounded-xl
border
border-[#E4E0D6]
bg-white
p-4
"
            >
              <div
                className="
flex
h-7
w-7
items-center
justify-center
rounded-full
bg-green-tint
text-green
"
              >
                <Check size={15} />
              </div>

              <p
                className="
text-sm
font-semibold
text-ink
"
              >
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
