import Link from "next/link";
import { ArrowRight, Check, Package, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-5
        py-20
        lg:px-8
        lg:py-28
      "
    >
      {/* Background */}

      <div
        className="
          absolute
          right-[-180px]
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-green-tint
          opacity-70
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          gap-14
          lg:grid-cols-2
          lg:items-center
        "
      >
        {/* Left Content */}

        <div>
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green/20
              bg-green-tint
              px-4
              py-2
              text-xs
              font-bold
              text-green-deep
            "
          >
            <TrendingUp size={14} />
            Built for growing businesses
          </div>

          <h1
            className="
              max-w-xl
              text-5xl
              font-bold
              leading-[1.05]
              tracking-[-0.05em]
              text-ink
              md:text-6xl
            "
          >
            Know exactly what you have, what is selling, and what needs
            restocking.
          </h1>

          <p
            className="
              mt-6
              max-w-lg
              text-lg
              leading-8
              text-stone
            "
          >
            StockPilot helps businesses manage inventory, sales, purchases and
            teams from one simple workspace.
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/register"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-green
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                hover:bg-green-deep
              "
            >
              Start free trial
              <ArrowRight size={16} />
            </Link>

            <Link
              href="#features"
              className="
                rounded-xl
                border
                border-[#DDD8CC]
                bg-white
                px-6
                py-3.5
                text-center
                text-sm
                font-bold
                text-ink-soft
              "
            >
              Explore features
            </Link>
          </div>

          <div
            className="
              mt-8
              grid
              gap-3
              sm:grid-cols-3
            "
          >
            {["Inventory tracking", "Sales analytics", "Stock alerts"].map(
              (item) => (
                <div
                  key={item}
                  className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-ink-soft
                "
                >
                  <Check size={15} className="text-green" />

                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Dashboard Preview */}

        <div>
          <div
            className="
              rounded-3xl
              border
              border-[#E4E0D6]
              bg-white
              p-5
              shadow-[0_30px_80px_rgba(18,38,30,0.12)]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-xs text-stone">Today's sales</p>

                <p
                  className="
                    mt-1
                    text-3xl
                    font-bold
                    text-ink
                  "
                >
                  ₦245,000
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  bg-green-tint
                  p-3
                  text-green
                "
              >
                <Package size={24} />
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                grid-cols-3
                gap-3
              "
            >
              {[
                ["Products", "248"],
                ["Stock", "1,842"],
                ["Alerts", "12"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="
                    rounded-xl
                    bg-[#FBFAF6]
                    p-4
                  "
                >
                  <p className="text-xs text-stone">{item[0]}</p>

                  <p
                    className="
                      mt-2
                      font-bold
                      text-ink
                    "
                  >
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="
                mt-5
                flex
                h-48
                items-end
                gap-3
                rounded-2xl
                bg-green-tint
                px-6
                pb-6
              "
            >
              {[40, 65, 45, 80, 60, 90].map((height, index) => (
                <div
                  key={index}
                  className="
                      flex-1
                      rounded-t-lg
                      bg-green
                    "
                  style={{
                    height: `${height}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
