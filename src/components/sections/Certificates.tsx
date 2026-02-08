"use client";

import { useMemo, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink, FileText, X, Trophy } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type CertType = "Award" | "Participation" | "Course" | "Recognition";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  type: CertType;
  highlight?: string; // e.g., "Winner", "3rd Rank", "In Progress"
  tags: string[];
  image?: string; // /public path
  pdf?: string; // /public path
  verifyUrl?: string;
};

const CERTIFICATES: Certificate[] = [
  {
    id: "unt-recognition-2025",
    title: "Distinguished Computer Science, MS Student",
    issuer: "UNT Department of Computer Science & Engineering",
    date: "2025",
    type: "Recognition",
    highlight: "Recognition",
    tags: ["UNT", "MSCS", "Recognition"],
    image: "/certificates/unt-recognition-2025.png",
  },
  {
    id: "charusat-pythonathon",
    title: "Pythonathon (National Level Hackathon) — Certificate of Winning",
    issuer: "CHARUSAT",
    date: "Aug 2022",
    type: "Award",
    highlight: "Winner",
    tags: ["Hackathon", "Winner", "Python"],
    image: "/certificates/charusat-pythonathon-winning.jpeg",
  },
  {
    id: "mined-hackathon",
    title: "MineD Hackathon — Certificate of Participation",
    issuer: "Institute of Technology, Nirma University (ITNU)",
    date: "Mar 2023",
    type: "Participation",
    highlight: "Participated",
    tags: ["Hackathon", "ML", "Nirma"],
    image: "/certificates/mined-hackathon-participation.jpg",
  },
  {
    id: "flipkart-grid",
    title: "Flipkart GRID 4.0 (Level 1) — E-Commerce & Tech Quiz",
    issuer: "Unstop × Flipkart",
    type: "Participation",
    highlight: "Participated",
    tags: ["Flipkart", "Quiz", "Competition"],
    image: "/certificates/flipkart-grid-participation.jpg",
  },
  {
    id: "google-python-coursera",
    title: "Crash Course on Python",
    issuer: "Google (Coursera)",
    type: "Course",
    highlight: "Completed",
    tags: ["Python", "Course", "Google"],
    image: "/certificates/google-python-coursera.jpg",
  },
  {
    id: "dce-3rd-rank",
    title: "Certificate of Appreciation — 3rd Rank",
    issuer: "DA-IICT Center for Entrepreneurship and Incubation (DCEI)",
    type: "Award",
    highlight: "3rd Rank",
    tags: ["Rank", "Award"],
    image: "/certificates/dce-appreciation-trophy.jpg",
  },
  {
    id: "hacknuthon-2021",
    title: "Hack-NU-thon’21 — Certificate of Participation",
    issuer: "Computer Society of India, Nirma University (CSI, ITNU)",
    date: "17–18 Apr 2021",
    type: "Participation",
    highlight: "Participated",
    tags: ["Hackathon", "CSI", "Nirma"],
    pdf: "/certificates/hacknuthon2021.pdf",
  },
  {
    id: "hacknuthon-2022",
    title: "Hack-NU-thon 3.0 — Certificate of Participation",
    issuer: "Computer Society of India, Nirma University (CSI, ITNU)",
    type: "Participation",
    highlight: "Participated",
    tags: ["Hackathon", "CSI", "Nirma"],
    pdf: "/certificates/hacknuthon2022.pdf",
  },
  {
    id: "devtown",
    title: "DevTown Certificate",
    issuer: "DevTown",
    type: "Course",
    highlight: "Verified",
    tags: ["DevTown", "Certificate"],
    pdf: "/certificates/Devtowncertificate.pdf",
    verifyUrl: "https://cert.devtown.in.tech/verify/UgA3q",
  },
];

const FILTERS: Array<"All" | CertType> = ["All", "Award", "Participation", "Course", "Recognition"];

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm transition",
        "border border-white/10",
        active ? "card-glass" : "bg-white/5 hover:opacity-95",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Badge({
  text,
  tone = "neutral",
}: {
  text: string;
  tone?: "neutral" | "green" | "pink" | "blue";
}) {
  const toneCls =
    tone === "green"
      ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-300"
      : tone === "pink"
      ? "border-pink-500/25 bg-pink-500/15 text-pink-200"
      : tone === "blue"
      ? "border-sky-500/25 bg-sky-500/15 text-sky-200"
      : "border-white/10 bg-white/5 text-[rgb(var(--muted))]";
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneCls}`}>{text}</span>;
}

export default function Certificates() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Certificate | null>(null);

  // ✅ Always return a fresh array (prevents weird state/reference issues)
  const list = useMemo(() => {
    const base = [...CERTIFICATES];
    if (filter === "All") return base;
    return base.filter((c) => c.type === filter);
  }, [filter]);

  return (
    <section id="certificates" className="scroll-mt-28 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Certificates{" "}
            <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
              & Awards
            </span>
          </h2>
          <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">
            A curated collection of recognitions, hackathons, courses, and achievements.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {FILTERS.map((f) => (
            <Chip
              key={f}
              active={filter === f}
              onClick={() => {
                setFilter(f);
              }}
            >
              {f}
            </Chip>
          ))}
        </motion.div>

        {/* Grid (fix: remount on filter + use animate not whileInView) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter} // ✅ critical: resets animation/layout per filter switch
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {list.map((c) => {
              const Icon = c.type === "Award" ? Trophy : c.type === "Recognition" ? Award : FileText;

              return (
                <motion.button
                  key={c.id}
                  variants={fadeUp}
                  onClick={() => setActive(c)}
                  className="text-left card-glass relative overflow-hidden rounded-3xl p-6 md:p-7 hover:opacity-95 transition"
                >
                  {/* ring + glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                  <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(78,155,255,0.55)]" />
                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(255,91,193,0.55)]" />

                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-11 w-11 rounded-2xl grid place-items-center border border-white/10 bg-white/5 shrink-0">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge text={c.type} tone="neutral" />
                        {c.highlight ? (
                          <Badge
                            text={c.highlight}
                            tone={
                              c.highlight.toLowerCase().includes("win") ||
                              c.highlight.toLowerCase().includes("rank")
                                ? "green"
                                : "blue"
                            }
                          />
                        ) : null}
                        {c.date ? <Badge text={c.date} tone="pink" /> : null}
                      </div>

                      <h3 className="mt-3 text-lg md:text-xl font-semibold leading-snug">
                        {c.title}
                      </h3>

                      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{c.issuer}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.tags.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 text-xs text-[rgb(var(--muted))] inline-flex items-center gap-2">
                        Click to preview <ExternalLink size={14} />
                      </div>
                    </div>

                    {/* mini preview */}
                    <div className="hidden md:block shrink-0">
                      <div className="h-20 w-28 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                        {c.image ? (
                          <Image
                            src={c.image}
                            alt={c.title}
                            width={200}
                            height={140}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full grid place-items-center text-[rgb(var(--muted))] text-xs">
                            PDF
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* bottom accent */}
                  <div className="pointer-events-none mt-6 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl card-glass rounded-3xl overflow-hidden"
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

              <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-white/10">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge text={active.type} />
                    {active.highlight ? <Badge text={active.highlight} tone="green" /> : null}
                    {active.date ? <Badge text={active.date} tone="pink" /> : null}
                  </div>
                  <div className="mt-2 font-semibold text-lg md:text-xl">{active.title}</div>
                  <div className="mt-1 text-sm text-[rgb(var(--muted))]">{active.issuer}</div>
                </div>

                <div className="flex items-center gap-2">
                  {active.verifyUrl ? (
                    <a
                      href={active.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:opacity-95 transition inline-flex items-center gap-2"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  ) : null}

                  <button
                    onClick={() => setActive(null)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 hover:opacity-95 transition"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-6">
                {active.image ? (
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/10">
                    <Image
                      src={active.image}
                      alt={active.title}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : active.pdf ? (
                  <div className="w-full rounded-2xl border border-white/10 bg-black/10 overflow-hidden">
                    <object data={active.pdf} type="application/pdf" className="w-full h-[75vh]">
                      <div className="p-6 text-sm text-[rgb(var(--muted))]">
                        PDF preview not supported in this browser.
                        <a
                          href={active.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="underline ml-2"
                        >
                          Open PDF
                        </a>
                      </div>
                    </object>
                  </div>
                ) : (
                  <div className="text-sm text-[rgb(var(--muted))]">No preview available.</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
