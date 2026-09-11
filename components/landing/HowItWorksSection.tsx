const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description:
      "Set up your StockPilot business account and configure your workspace.",
  },

  {
    number: "02",
    title: "Add your products",
    description:
      "Create your product catalogue with prices, categories and stock levels.",
  },

  {
    number: "03",
    title: "Track your operations",
    description:
      "Record sales, purchases and inventory movements as they happen.",
  },

  {
    number: "04",
    title: "Grow with insights",
    description:
      "Use reports and analytics to make smarter business decisions.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
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
          max-w-7xl
        "
      >
        <div className="max-w-3xl">
          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.15em]
              text-green
            "
          >
            How it works
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
            Get started in minutes, not weeks.
          </h2>
        </div>

        <div
          className="
            mt-12
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="
                rounded-2xl
                border
                border-[#E4E0D6]
                bg-white
                p-6
              "
            >
              <p
                className="
                  text-4xl
                  font-bold
                  tracking-[-0.04em]
                  text-green
                "
              >
                {step.number}
              </p>

              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  text-ink
                "
              >
                {step.title}
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-stone
                "
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
