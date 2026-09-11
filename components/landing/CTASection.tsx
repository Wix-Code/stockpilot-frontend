import Link from "next/link";

export function CTASection() {
  return (
    <section
      className="
px-5
py-20
lg:px-8
"
    >
      <div
        className="
mx-auto
max-w-7xl
rounded-3xl
bg-green
px-6
py-16
text-center
md:px-12
"
      >
        <h2
          className="
mx-auto
max-w-3xl
text-4xl
font-bold
tracking-[-0.04em]
text-white
md:text-5xl
"
        >
          Ready to take control of your inventory?
        </h2>

        <p
          className="
mx-auto
mt-5
max-w-xl
text-lg
leading-8
text-white/80
"
        >
          Start managing your products, sales and purchases with a clearer view
          of your business.
        </p>

        <div
          className="
mt-8
flex
flex-col
justify-center
gap-3
sm:flex-row
"
        >
          <Link
            href="/register"
            className="
rounded-xl
bg-white
px-6
py-3.5
text-sm
font-bold
text-green
"
          >
            Start free trial
          </Link>

          <Link
            href="/contact"
            className="
rounded-xl
border
border-white/30
px-6
py-3.5
text-sm
font-bold
text-white
"
          >
            Contact sales
          </Link>
        </div>
      </div>
    </section>
  );
}
