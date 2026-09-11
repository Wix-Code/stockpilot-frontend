import { Check } from "lucide-react";

import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₦5,000",
    description: "For small businesses starting with digital inventory.",
    features: [
      "Inventory tracking",
      "Product management",
      "Sales recording",
      "Basic reports",
      "2 users",
    ],
  },

  {
    name: "Growth",
    price: "₦15,000",
    description: "For growing businesses managing daily operations.",
    popular: true,
    features: [
      "Everything in Starter",
      "Purchase management",
      "Supplier management",
      "Advanced reports",
      "10 users",
      "Stock alerts",
    ],
  },

  {
    name: "Business",
    price: "₦35,000",
    description: "For distributors and larger teams.",
    features: [
      "Everything in Growth",
      "Unlimited users",
      "Multiple locations",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
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
            Pricing
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
            Simple plans that grow with your business.
          </h2>
        </div>

        <div
          className="
mt-12
grid
gap-5
lg:grid-cols-3
"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
relative
rounded-3xl
border
bg-white
p-7

${
  plan.popular
    ? "border-green shadow-[0_20px_50px_rgba(47,104,68,0.12)]"
    : "border-[#E4E0D6]"
}
`}
            >
              {plan.popular && (
                <span
                  className="
absolute
right-6
top-6
rounded-full
bg-green
px-3
py-1
text-[11px]
font-bold
text-white
"
                >
                  Most popular
                </span>
              )}

              <h3
                className="
text-xl
font-bold
text-ink
"
              >
                {plan.name}
              </h3>

              <p
                className="
mt-3
text-sm
leading-6
text-stone
"
              >
                {plan.description}
              </p>

              <div
                className="
mt-6
"
              >
                <span
                  className="
text-4xl
font-bold
tracking-[-0.04em]
text-ink
"
                >
                  {plan.price}
                </span>

                <span
                  className="
text-sm
text-stone
"
                >
                  /month
                </span>
              </div>

              <div
                className="
mt-7
space-y-3
"
              >
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="
flex
items-center
gap-2
text-sm
font-semibold
text-ink-soft
"
                  >
                    <div
                      className="
flex
h-5
w-5
items-center
justify-center
rounded-full
bg-green-tint
text-green
"
                    >
                      <Check size={12} />
                    </div>

                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`
mt-8
block
rounded-xl
py-3
text-center
text-sm
font-bold

${
  plan.popular
    ? "bg-green text-white hover:bg-green-deep"
    : "border border-[#DDD8CC] text-ink-soft hover:bg-[#FBFAF6]"
}
`}
              >
                Start free
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
