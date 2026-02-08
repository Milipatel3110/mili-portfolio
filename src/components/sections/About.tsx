"use client";

import { motion } from "framer-motion";
import { Brain, Boxes, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import type { Variants } from "framer-motion";


const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };
  

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
          >
            About{" "}
            <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.08}
            className="mt-4 mx-auto max-w-2xl text-[rgb(var(--muted))] text-base md:text-lg"
          >
            I’m Mili Patel — building AI systems that don’t break when the world
            changes, and shipping full-stack products that make those systems usable.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Left: Story */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp} custom={0} className="card-glass rounded-3xl p-7 md:p-9">
              <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                <Sparkles size={16} />
                Research-first engineering
              </div>

              <h3 className="mt-3 text-2xl md:text-3xl font-semibold leading-snug">
                I treat deepfake detection as{" "}
                <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
                  anomaly detection
                </span>{" "}
                — not just classification.
              </h3>

              <p className="mt-4 text-[rgb(var(--muted))] leading-relaxed">
                My thesis focuses on detecting deepfake facial images under real-world
                distribution shifts (new manipulations, unseen datasets, changing lighting,
                compression artifacts, and model drift). That means I care about
                robustness, calibration, and decision boundaries — not just accuracy on
                a single benchmark.
              </p>

              <p className="mt-4 text-[rgb(var(--muted))] leading-relaxed">
                Alongside research, I build production-grade systems: clean UI, fast APIs,
                evaluation dashboards, and reproducible pipelines. I like work where
                machine learning meets engineering — the part where results become tools.
              </p>

              {/* Focus rows */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Focus
                  icon={<Brain size={18} />}
                  title="AI/ML + Vision"
                  desc="OOD detection, deepfakes, calibration, pipelines."
                />
                <Focus
                  icon={<Boxes size={18} />}
                  title="Full-Stack"
                  desc="Next.js apps, APIs, dashboards, deployments."
                />
              </div>

              {/* Chips */}
              <div className="mt-7 flex flex-wrap gap-2">
                <Chip text="Anomaly Detection" />
                <Chip text="Deepfake Forensics" />
                <Chip text="OOD / Distribution Shift" />
                <Chip text="Experiment Tracking" />
                <Chip text="Dashboards" />
                <Chip text="Production ML" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Now card */}
            <motion.div variants={fadeUp} custom={0.06} className="card-glass rounded-3xl p-7">
              <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                <ShieldCheck size={16} />
                What I’m building now
              </div>

              <div className="mt-3 text-lg font-semibold">
                Robust deepfake anomaly detection pipeline
              </div>

              <p className="mt-2 text-[rgb(var(--muted))] leading-relaxed">
                Training on clean splits, validating with controlled OOD sets, and
                testing against unseen manipulation methods — with score analysis +
                dashboarding for model behavior.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniStat value="Research" label="Thesis Track" />
                <MiniStat value="Full-Stack" label="Product Mindset" />
                <MiniStat value="ML + CV" label="Primary Focus" />
                <MiniStat value="UNT" label="MS CS" />
              </div>
            </motion.div>

            {/* Education/TA card */}
            <motion.div variants={fadeUp} custom={0.12} className="card-glass rounded-3xl p-7">
              <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                <GraduationCap size={16} />
                Background
              </div>

              <ul className="mt-4 space-y-3 text-[rgb(var(--muted))]">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                  MS Computer Science @ University of North Texas (Thesis).
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                  Teaching / mentoring mindset — I enjoy making complex topics clear.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                  I build projects that can be demoed, measured, and shipped.
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 p-4">
                <div className="text-sm font-medium">My principle</div>
                <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                  If it can’t be evaluated, monitored, and explained — it isn’t done.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small UI helpers ---------- */

function Focus({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="flex items-center gap-2 font-medium">
        <span className="text-[rgb(var(--muted))]">{icon}</span>
        {title}
      </div>
      <div className="mt-1 text-sm text-[rgb(var(--muted))]">{desc}</div>
    </div>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs border border-white/10 text-[rgb(var(--muted))]">
      {text}
    </span>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 px-4 py-3">
      <div className="text-sm font-semibold">{value}</div>
      <div className="mt-1 text-xs text-[rgb(var(--muted))]">{label}</div>
    </div>
  );
}
