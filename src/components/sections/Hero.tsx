"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const easeOutQuart: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutQuart },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOutQuart } },
};

const LINKS = {
  linkedin: "https://www.linkedin.com/in/mili-patel-9859b7200/",
  github: "https://github.com/Milipatel3110",
  // Opens the Google Drive viewer (works reliably)
  resumeView:
    "https://drive.google.com/file/d/1W2P1PPOuafFeCEfDGfpUEqFnlaqsIUIq/view?usp=sharing",
  // Optional: direct download version (uncomment if you prefer)
  // resumeDownload: "https://drive.google.com/uc?export=download&id=1W2P1PPOuafFeCEfDGfpUEqFnlaqsIUIq",
};

export default function Hero() {
  return (
    <section id="home" className="pt-16 md:pt-20 pb-10 md:pb-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="card-glass relative overflow-hidden rounded-3xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 dark:ring-white/10" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30 bg-[rgba(120,119,198,0.6)]" />
          <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-25 bg-[rgba(255,91,193,0.55)]" />

          <div className="grid gap-10 p-8 md:p-12 md:grid-cols-2 md:items-center">
            {/* Left */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm tracking-wide text-[rgb(var(--muted))]"
              >
                MS Computer Science • AI/ML + Full-Stack
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mt-3 text-4xl font-semibold leading-tight md:text-6xl"
              >
                Building{" "}
                <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
                  AI + Full-Stack
                </span>{" "}
                systems with a research mindset.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base text-[rgb(var(--muted))] md:text-lg"
              >
                Thesis focused on anomaly detection for deepfake facial images. I
                build ML pipelines, dashboards, and production-ready web apps —
                with strong experimentation and engineering.
              </motion.p>

              {/* Actions */}
              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full px-5 py-2.5 text-sm font-medium card-glass transition hover:opacity-95"
                >
                  View Projects
                </a>

                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium transition hover:opacity-95"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>

                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium transition hover:opacity-95"
                >
                  <Github size={16} /> GitHub
                </a>

                <a
                  href={LINKS.resumeView}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium transition hover:opacity-95"
                >
                  <Download size={16} /> Resume
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"
              >
                <Stat label="Publication" value="1" />
                <Stat label="Projects" value="6+" />
                <Stat label="Years Experience" value="2+" />
                <Stat label="Records Analyzed" value="638K+" />
              </motion.div>
            </motion.div>

            {/* Right - Portrait */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex justify-center"   // ✅ centered in its column (no md:justify-end)
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, ease: easeOutQuart }}
                className="relative -translate-y-6 md:-translate-y-10"
              >
                <div className="absolute -inset-6 rounded-full border border-white/10" />
                <div className="absolute -inset-10 rounded-full border border-white/5" />

                <div className="h-70 w-70 overflow-hidden rounded-full border border-white/10 bg-black/5 dark:bg-white/5 md:h-92 md:w-92">
                  <img
                    src="/me.jpg"
                    alt="Mili Patel"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_90px_rgba(120,119,198,0.25)]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center pb-6">
            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: easeOutQuart }}
            >
              Scroll <ArrowDown size={14} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-glass rounded-2xl px-4 py-4">
      <div className="text-xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-[rgb(var(--muted))]">{label}</div>
    </div>
  );
}
