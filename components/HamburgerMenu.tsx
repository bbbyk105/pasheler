// components/HamburgerMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState<{ [k: string]: boolean }>({
    shop: true,
    brand: false,
    support: false,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the search on open
    const t = setTimeout(() => searchRef.current?.focus(), 100);
    return () => {
      document.body.style.overflow = original;
      clearTimeout(t);
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (
        !panelRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Simple util for section toggles
  const toggle = (k: string) => setCatsOpen((s) => ({ ...s, [k]: !s[k] }));

  return (
    <>
      {/* Trigger */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="hamburger-panel"
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-none text-stone-800 hover:bg-white/100 active:scale-95 md:hidden"
      >
        {/* Burger / X icon (CSS) */}
        <span className="relative block h-5 w-6">
          <span
            className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-current transition-transform duration-200 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-2 h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-4 h-0.5 w-6 rounded bg-current transition-transform duration-200 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Layer */}
      <div
        id="hamburger-panel"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 transition-opacity ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop: soft gradient + blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/60 via-stone-900/40 to-stone-900/60 backdrop-blur-sm" />

        {/* Panel - now FULLSCREEN */}
        <div
          ref={panelRef}
          className={`absolute inset-0 h-full w-full shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Glass container */}
          <div className="relative flex h-full flex-col overflow-y-auto bg-white/80 backdrop-blur-xl">
            {/* Top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-stone-200/70 bg-white/70 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold tracking-tight">
                  Menu
                </span>
                {/* Optional quick search */}
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search…"
                  className="hidden min-w-0 flex-1 rounded-lg border border-stone-300 bg-white/80 px-3 py-1.5 text-sm outline-none placeholder:text-stone-400 focus:border-stone-500 sm:block"
                />
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
              >
                {/* Close icon */}
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Content area */}
            <div className="mx-auto w-full max-w-xl grow px-3 pb-10 pt-2 sm:px-5">
              {/* Navigation groups */}
              <div className="mt-2 space-y-2">
                {/* SHOP */}
                <Section
                  title="Shop"
                  open={catsOpen.shop}
                  onToggle={() => toggle("shop")}
                >
                  <MenuLink
                    href="/"
                    label="Home"
                    onDone={() => setOpen(false)}
                  />
                  <MenuLink
                    href="/catalog"
                    label="Products"
                    onDone={() => setOpen(false)}
                  />
                </Section>

                {/* BRAND (sample – keep commented if unused) */}
                {false && (
                  <Section
                    title="Brand"
                    open={catsOpen.brand}
                    onToggle={() => toggle("brand")}
                  >
                    <MenuLink
                      href="/about"
                      label="About Us"
                      onDone={() => setOpen(false)}
                    />
                    <MenuLink
                      href="/story"
                      label="Brand Story"
                      onDone={() => setOpen(false)}
                    />
                    <MenuLink
                      href="/journal"
                      label="Journal"
                      onDone={() => setOpen(false)}
                    />
                  </Section>
                )}

                {/* SUPPORT */}
                <Section
                  title="Support"
                  open={catsOpen.support}
                  onToggle={() => toggle("support")}
                >
                  <MenuLink
                    href="/contact"
                    label="Contact"
                    onDone={() => setOpen(false)}
                  />
                </Section>
              </div>

              {/* Utilities */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-4 py-3 text-[15px] font-medium shadow-sm hover:bg-white"
                >
                  {/* Cart icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-70"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4h2l2.4 12.1A2 2 0 0 0 9.36 18h7.28a2 2 0 0 0 1.96-1.9L20 8H6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="17" cy="20" r="1.5" fill="currentColor" />
                  </svg>
                  Cart
                </Link>
              </div>

              {/* Social / footer */}
              <div className="mt-6 pb-8 pt-4">
                <div className="flex items-center gap-4">
                  <Social href="https://instagram.com" label="Instagram">
                    <FaInstagram className="h-5 w-5" />
                  </Social>
                  <Social href="https://x.com" label="X / Twitter">
                    <FaXTwitter className="h-5 w-5" />
                  </Social>
                  <Social href="mailto:hello@yawnnap.com" label="Email">
                    <HiMail className="h-6 w-6" />
                  </Social>
                </div>
                <p className="mt-3 text-center text-xs text-stone-500">
                  © {new Date().getFullYear()} MITSUI KANA. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────
function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-stone-200/70 bg-white/70 p-2 shadow-sm">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left"
      >
        <span className="text-[15px] font-semibold tracking-tight">
          {title}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col">{children}</nav>
        </div>
      </div>
    </section>
  );
}

function MenuLink({
  href,
  label,
  onDone,
  badge,
}: {
  href: string;
  label: string;
  onDone: () => void;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onDone}
      className="group flex items-center justify-between rounded-lg px-3 py-2 text-[15px] hover:bg-stone-100/80"
    >
      <span className="flex items-center gap-2">
        <span>{label}</span>
        {badge ? (
          <span className="rounded-full bg-stone-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
      >
        <path
          d="M7 12h10m0 0l-4-4m4 4l-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </Link>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/70 shadow-sm hover:bg-white"
    >
      {children}
    </Link>
  );
}
