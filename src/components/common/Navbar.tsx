"use client";

import { SECTIONS } from "@/lib/sections";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  // prevents observer from fighting while we smooth-scroll by click
  const isClickScrolling = useRef(false);
  const clickTimer = useRef<number | null>(null);

  // keep these in ONE place so scroll + observer stay consistent
  const NAV_HEIGHT = 96; // set to your real navbar height
  const EXTRA_OFFSET = 12; // small breathing space under navbar

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (!sectionEls.length) return;

    // Observer decides active section based on what’s most visible inside a band below navbar
    const obs = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        // top pushes the "active band" below navbar, bottom makes it switch earlier
        rootMargin: `-${NAV_HEIGHT + EXTRA_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5],
      }
    );

    sectionEls.forEach((el) => obs.observe(el));

    return () => {
      obs.disconnect();
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // set active immediately for instant UI feedback
    setActive(id);

    // pause observer while smooth-scrolling to avoid "wrong active" flicker
    isClickScrolling.current = true;
    if (clickTimer.current) window.clearTimeout(clickTimer.current);

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      (NAV_HEIGHT + EXTRA_OFFSET);

    window.scrollTo({ top: y, behavior: "smooth" });

    // release observer after scroll settles
    clickTimer.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <header className="sticky top-0 z-50 bg-mesh border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={() => scrollTo("home")} className="font-semibold">
          Mili Patel
        </button>

        <nav className="hidden md:flex gap-2">
          {SECTIONS.filter((s) => s.id !== "home").map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-2 rounded-full text-sm ${
                active === s.id ? "card-glass" : ""
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
