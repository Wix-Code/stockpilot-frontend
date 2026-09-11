const testimonials = [
  {
    quote:
      "StockPilot gave us visibility we never had before. We now know what is selling and what needs restocking.",
    name: "Business Owner",
    company: "Retail Store",
  },

  {
    quote:
      "Managing purchases and inventory used to take hours. Now our team works from one platform.",
    name: "Operations Manager",
    company: "Distribution Company",
  },

  {
    quote:
      "The reports help us make better decisions instead of relying on assumptions.",
    name: "Founder",
    company: "Growing Business",
  },
];

export function Testimonials() {
  return (
    <section
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
            Customer stories
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
            Trusted by businesses growing with confidence.
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
          {testimonials.map((item) => (
            <div
              key={item.name}
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
text-base
leading-7
text-ink-soft
"
              >
                "{item.quote}"
              </p>

              <div
                className="
mt-6
"
              >
                <p
                  className="
font-bold
text-ink
"
                >
                  {item.name}
                </p>

                <p
                  className="
text-sm
text-stone
"
                >
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
