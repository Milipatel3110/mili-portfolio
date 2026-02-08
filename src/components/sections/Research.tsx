"use client";

import { motion, type Variants } from "framer-motion";
import { FileText, ExternalLink, Quote, Calendar } from "lucide-react";

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

type Pub = {
  title: string;
  venue: string;
  date: string;
  authors: string;
  doi?: string;
  link?: string;
  highlights: string[];
};

const PUBLICATIONS: Pub[] = [
  {
    title:
      "Advancements and Challenges in the Use of Artificial Intelligence for Coronary Artery Disease Diagnosis: An Integrated Review",
    venue: "Archives of Computational Methods in Engineering (Springer)",
    date: "June 2025",
    authors: "Heni Mehta, Mili Patel, Manav Vakharia, Parita Oza",
    doi: "10.1007/s11831-025-10298-5",
    link: "https://link.springer.com/article/10.1007/s11831-025-10298-5",
    highlights: [
      "Comprehensive review of AI and deep learning methods for coronary artery disease diagnosis.",
      "Analyzed challenges including data quality, generalization, interpretability, and clinical adoption.",
      "Discussed future directions for reliable AI-assisted clinical decision systems.",
    ],
  },
];

export default function Research() {
  return (
    <section id="research" className="scroll-mt-28 py-16 md:py-24">
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
            Research{" "}
            <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
              & Publications
            </span>
          </h2>
          <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">
            Peer-reviewed work and research contributions — plus my ongoing thesis
            work in deepfake anomaly detection.
          </p>
        </motion.div>

        {/* GRID: Thesis + Publications (same size boxes) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-2 items-stretch"
        >
          {/* Thesis Card */}
          <motion.article
            variants={fadeUp}
            className="card-glass h-full rounded-3xl p-7 md:p-8 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(78,155,255,0.55)]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(255,91,193,0.55)]" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-2xl grid place-items-center border border-white/10 bg-white/5">
                  <Quote size={18} />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-semibold">
                    Master’s Thesis — Deepfake Anomaly Detection
                  </div>
                  <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                    Detecting deepfake facial images under distribution shift using
                    anomaly/OOD signals — with robust evaluation and behavior analysis.
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                In Progress
              </span>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3 text-sm text-[rgb(var(--muted))]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-[rgb(var(--fg))]">Goal</div>
                <div className="mt-1">
                  Robust deepfake detection beyond closed-set classification.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-[rgb(var(--fg))]">Method</div>
                <div className="mt-1">
                  OOD scoring, calibration analysis, and distribution-shift evaluation.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-[rgb(var(--fg))]">Output</div>
                <div className="mt-1">
                  Reproducible pipeline + metrics dashboard + demo-ready app.
                </div>
              </div>
            </div>

            <div className="pointer-events-none mt-7 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
          </motion.article>

          {/* Publication Card(s) */}
          {PUBLICATIONS.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              className="card-glass h-full relative overflow-hidden rounded-3xl p-7 md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
              <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(78,155,255,0.55)]" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(255,91,193,0.55)]" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-10 w-10 rounded-2xl grid place-items-center border border-white/10 bg-white/5">
                    <FileText size={18} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                        Published
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]">
                        Springer
                      </span>
                      {p.doi ? (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]">
                          DOI: {p.doi}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-lg md:text-xl font-semibold leading-snug">
                      {p.title}
                    </h3>

                    <p className="mt-2 text-sm text-[rgb(var(--muted))]">{p.venue}</p>

                    <div className="mt-2 text-xs text-[rgb(var(--muted))] inline-flex items-center gap-2">
                      <Calendar size={14} /> {p.date}
                    </div>
                  </div>
                </div>

                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:opacity-95 transition inline-flex items-center gap-2"
                  >
                    View Paper <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>

              <div className="mt-5 text-sm text-[rgb(var(--muted))]">
                <span className="font-medium text-[rgb(var(--fg))]">Authors:</span>{" "}
                {p.authors}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--muted))]">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgba(78,155,255,0.9)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none mt-7 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
