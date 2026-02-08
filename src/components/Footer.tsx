"use client";

import { Github, Linkedin } from "lucide-react";

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]">
      {children}
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-10">
      {/* gradient divider (same visual language as other sections) */}
      <div className="pointer-events-none mx-auto mb-10 h-[3px] max-w-6xl rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.55)] to-[rgba(255,91,193,0.55)] opacity-80" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="card-glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            {/* Left */}
            <div>
              <div className="font-semibold text-lg">Mili Patel</div>
              <div className="text-sm text-[rgb(var(--muted))] mt-1">
                Building ML systems, research-driven AI, and full-stack products.
              </div>

              <div className="text-xs text-[rgb(var(--muted))] mt-4">
                © {year} Mili Patel. All rights reserved.
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">
                Built with
              </div>

              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/Milipatel3110"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition"
                >
                  <Github size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/mili-patel-9859b7200/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
