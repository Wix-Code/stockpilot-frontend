import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Updates"],
  },

  {
    title: "Company",
    links: ["About", "Contact"],
  },

  {
    title: "Resources",
    links: ["Help Centre", "Documentation"],
  },

  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer
      className="
border-t
border-[#E4E0D6]
bg-[#FBFAF6]
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
        <div
          className="
grid
gap-10
sm:grid-cols-2
lg:grid-cols-5
"
        >
          <div>
            <p
              className="
text-xl
font-bold
text-ink
"
            >
              StockPilot
            </p>

            <p
              className="
mt-3
max-w-xs
text-sm
leading-6
text-stone
"
            >
              Simple inventory management for growing businesses.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p
                className="
text-sm
font-bold
text-ink
"
              >
                {column.title}
              </p>

              <div
                className="
mt-4
space-y-3
"
              >
                {column.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="
block
text-sm
text-stone
hover:text-green
"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="
mt-12
border-t
border-[#E4E0D6]
pt-6
text-sm
text-stone
"
        >
          © {new Date().getFullYear()} StockPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
