"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        // adjust for your sticky navbar height
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds.join("|")]);

  return { active, setActive };
}
