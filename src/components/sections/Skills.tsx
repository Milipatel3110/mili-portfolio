"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Brain,
  BarChart3,
  Code2,
  Globe,
  Database,
  Wrench,
  Cloud,
  Blocks,
  Monitor,
  Shield,
  GitBranch,
  Bot,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

type Level = "Expert" | "Advanced" | "Intermediate";

type SkillItem = { name: string; level: Level };

type SkillGroup = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number }>;
  badge: { label: Level; tone: "blue" | "green" | "purple" | "amber" };
  items: SkillItem[];
};

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  const parts = title.split(" ");
  const last = parts.pop();
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
        {parts.join(" ")}{" "}
        <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
          {last}
        </span>
      </h2>
      <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

function TopBadge({
  label,
  tone,
}: {
  label: Level;
  tone: "blue" | "green" | "purple" | "amber";
}) {
  const cls =
    tone === "green"
      ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-200"
      : tone === "blue"
      ? "border-sky-500/25 bg-sky-500/15 text-sky-200"
      : tone === "amber"
      ? "border-amber-500/25 bg-amber-500/15 text-amber-200"
      : "border-purple-500/25 bg-purple-500/15 text-purple-200";

  // In light mode, these token-based pills still look fine because your bg-mesh + card-glass handles contrast.
  // We also keep text readable by relying on the token colors.
  return <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${cls}`}>{label}</span>;
}

function LevelBadge({ level }: { level: Level }) {
  const cls =
    level === "Expert"
      ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-200"
      : level === "Advanced"
      ? "border-sky-500/25 bg-sky-500/15 text-sky-200"
      : "border-amber-500/25 bg-amber-500/15 text-amber-200";

  return <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${cls}`}>{level}</span>;
}

const GROUPS: SkillGroup[] = [
  {
    title: "Machine Learning & AI",
    subtitle: "Deep learning, anomaly/OOD, and applied CV research",
    icon: Brain,
    badge: { label: "Advanced", tone: "blue" },
    items: [
      { name: "PyTorch", level: "Advanced" },
      { name: "TensorFlow", level: "Advanced" },
      { name: "Scikit-learn", level: "Advanced" },
      { name: "Computer Vision", level: "Advanced" },
      { name: "OOD / Anomaly Detection", level: "Advanced" },
      { name: "Deep Learning", level: "Advanced" },
      { name: "NLP / LLM basics", level: "Intermediate" },
    ],
  },
  {
    title: "Data Science & Analytics",
    subtitle: "Cleaning, modeling, dashboards & insights",
    icon: BarChart3,
    badge: { label: "Advanced", tone: "green" },
    items: [
      { name: "Data Structures and Algorithms", level: "Advanced" },
      { name: "Feature Engineering", level: "Advanced" },
      { name: "SQL Analytics", level: "Advanced" },
      { name: "Visualization", level: "Advanced" },
      { name: "Tableau", level: "Intermediate" },
      { name: "Power BI", level: "Intermediate" },

    ],
  },
  {
    title: "Programming Languages",
    subtitle: "Used across ML + systems + full-stack",
    icon: Code2,
    badge: { label: "Advanced", tone: "purple" },
    items: [
      { name: "Python", level: "Expert" },
      { name: "SQL", level: "Advanced" },
      { name: "Java", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "JavaScript / TypeScript", level: "Intermediate" },
    ],
  },
  {
    title: "Web / Frameworks",
    subtitle: "APIs, UI, and product delivery",
    icon: Globe,
    badge: { label: "Advanced", tone: "blue" },
    items: [
      { name: "Next.js (App Router)", level: "Advanced" },
      { name: "React", level: "Advanced" },
      { name: "FastAPI", level: "Advanced" },
      { name: "Flask", level: "Advanced" },
      { name: "Django", level: "Intermediate" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" },
    ],
  },
  {
    title: "Cloud / DevOps",
    subtitle: "Deployments, containers, infra basics",
    icon: Cloud,
    badge: { label: "Intermediate", tone: "amber" },
    items: [
      { name: "Cloud Computing (fundamentals)", level: "Intermediate" },
      { name: "AWS (basics)", level: "Intermediate" },
      { name: "Docker", level: "Intermediate" },
      { name: "Linux", level: "Advanced" },
      { name: "CI/CD basics", level: "Intermediate" },
      { name: "GitHub Actions (basic)", level: "Intermediate" },
    ],
  },
  {
    title: "Databases",
    subtitle: "Relational + NoSQL",
    icon: Database,
    badge: { label: "Advanced", tone: "green" },
    items: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Cassandra", level: "Intermediate" },
    ],
  },
  {
    title: "Blockchain",
    subtitle: "Concepts + project experience",
    icon: Blocks,
    badge: { label: "Intermediate", tone: "purple" },
    items: [
      { name: "Blockchain fundamentals", level: "Intermediate" },
      { name: "Smart contracts (basic)", level: "Intermediate" },
      { name: "Web3 tooling (basic)", level: "Intermediate" },
    ],
  },
  {
    title: "Python GUI / Desktop",
    subtitle: "Building interactive interfaces",
    icon: Monitor,
    badge: { label: "Intermediate", tone: "green" },
    items: [
      { name: "Tkinter", level: "Intermediate" },
      { name: "PyQt", level: "Intermediate" },
      { name: "PySide (basic)", level: "Intermediate" },
    ],
  },
  {
    title: "Testing / Automation",
    subtitle: "QA + scripting workflows",
    icon: Bot,
    badge: { label: "Intermediate", tone: "blue" },
    items: [
      { name: "Selenium", level: "Intermediate" },
      { name: "Automation scripting", level: "Intermediate" },
    ],
  },
  {
    title: "Tools / Platforms",
    subtitle: "Daily engineering toolkit",
    icon: Wrench,
    badge: { label: "Advanced", tone: "purple" },
    items: [
      { name: "Git / GitHub", level: "Advanced" },
      { name: "Jupyter", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
    ],
  },
  {
    title: "Security / Reliability",
    subtitle: "Practical safety + robustness habits",
    icon: Shield,
    badge: { label: "Intermediate", tone: "amber" },
    items: [
      { name: "Secure coding basics", level: "Intermediate" },
      { name: "Logging/monitoring basics", level: "Intermediate" },
      { name: "Model robustness thinking", level: "Intermediate" },
    ],
  },
  {
    title: "Collaboration",
    subtitle: "Working clean with teams",
    icon: GitBranch,
    badge: { label: "Advanced", tone: "green" },
    items: [
      { name: "Code reviews", level: "Advanced" },
      { name: "Issue/PR workflows", level: "Advanced" },
      { name: "Documentation", level: "Advanced" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-28 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="A curated view of the tools I use to build ML systems and full-stack products."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {GROUPS.map((g) => {
            const Icon = g.icon;

            return (
              <motion.div
                key={g.title}
                variants={fadeUp}
                className="card-glass relative overflow-hidden rounded-3xl p-6 md:p-7"
              >
                {/* ring + glows (same vibe as Experience cards) */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl opacity-15 bg-[rgba(78,155,255,0.55)]" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-15 bg-[rgba(255,91,193,0.55)]" />

                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-11 w-11 rounded-2xl grid place-items-center border border-white/10 bg-white/5 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold leading-tight">{g.title}</div>
                      <div className="mt-1 text-sm text-[rgb(var(--muted))]">{g.subtitle}</div>
                    </div>
                  </div>

                  <TopBadge label={g.badge.label} tone={g.badge.tone} />
                </div>

                {/* Items */}
                <div className="mt-6 space-y-3">
                  {g.items.map((it) => (
                    <div
                      key={`${g.title}-${it.name}`}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 border border-white/10 bg-white/5"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{it.name}</div>
                      </div>
                      <LevelBadge level={it.level} />
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none mt-6 h-[3px] w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.55)] to-[rgba(255,91,193,0.55)] opacity-80" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
