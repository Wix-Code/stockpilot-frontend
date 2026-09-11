import { FileSpreadsheet, PackageX, TrendingDown } from "lucide-react";

const problems = [
  {
    title: "Manual inventory tracking",
    description:
      "Spreadsheets and paper records make it difficult to know your true stock position.",
    icon: FileSpreadsheet,
  },

  {
    title: "Stock losses and shortages",
    description:
      "Without visibility, products disappear, mistakes increase and profits suffer.",
    icon: PackageX,
  },

  {
    title: "Poor business decisions",
    description:
      "Without accurate information, owners react instead of planning ahead.",
    icon: TrendingDown,
  },
];

export function ProblemSection() {
  return (
    <section
      className="
        px-5
        py-20
        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto max-w-7xl">
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
            The challenge
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
            Running a business shouldn't mean guessing your inventory.
          </h2>

          <p
            className="
              mt-5
              text-lg
              leading-8
              text-stone
            "
          >
            Many businesses struggle with unclear stock levels, missing records
            and decisions made without reliable information.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-5
            md:grid-cols-3
          "
        >
          {problems.map((item) => {
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
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FBEEEB]
                    text-terracotta
                  "
                >
                  <Icon size={22} />
                </div>

                <h3
                  className="
                    mt-5
                    text-lg
                    font-bold
                    text-ink
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
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
