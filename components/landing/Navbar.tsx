"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#E4E0D6]
        bg-paper/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-5
          lg:px-8
        "
      >
        {/* Logo */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-green
              text-white
              shadow-sm
            "
          >
            <span className="text-lg font-bold">S</span>
          </div>

          <div>
            <p
              className="
                text-xl
                font-bold
                tracking-[-0.04em]
                text-ink
              "
            >
              StockPilot
            </p>

            <p
              className="
                text-[11px]
                font-medium
                text-stone
              "
            >
              Inventory workspace
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          <NavLink href="#features">Features</NavLink>

          <NavLink href="#solutions">Solutions</NavLink>

          <NavLink href="#pricing">Pricing</NavLink>

          <NavLink href="#resources">Resources</NavLink>
        </nav>

        {/* Desktop Actions */}

        <div
          className="
            hidden
            items-center
            gap-3
            lg:flex
          "
        >
          <Link
            href="/login"
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              text-ink-soft
              transition-colors
              hover:bg-green-tint
              hover:text-green-deep
            "
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="
              rounded-xl
              bg-green
              px-5
              py-3
              text-sm
              font-bold
              text-white
              transition-colors
              hover:bg-green-deep
            "
          >
            Start free
          </Link>
        </div>

        {/* Mobile Menu */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-[#DDD8CC]
            bg-white
            text-ink
            lg:hidden
          "
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}

      {open && (
        <div
          className="
            border-t
            border-[#E4E0D6]
            bg-paper
            px-5
            py-5
            lg:hidden
          "
        >
          <div className="space-y-4">
            <MobileLink href="#features">Features</MobileLink>

            <MobileLink href="#solutions">Solutions</MobileLink>

            <MobileLink href="#pricing">Pricing</MobileLink>

            <MobileLink href="/login">Sign in</MobileLink>

            <Link
              href="/register"
              className="
                block
                rounded-xl
                bg-green
                px-4
                py-3
                text-center
                text-sm
                font-bold
                text-white
              "
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        text-sm
        font-semibold
        text-ink-soft
        transition-colors
        hover:text-green
      "
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        block
        text-sm
        font-semibold
        text-ink-soft
      "
    >
      {children}
    </Link>
  );
}
