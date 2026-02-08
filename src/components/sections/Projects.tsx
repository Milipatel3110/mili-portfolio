"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type ProjectType = "All" | "Full-Stack" | "AI/ML" | "Data/BI" | "Edge/Hardware" | "Hackathon";
type NonAllType = Exclude<ProjectType, "All">;

type Project = {
  id: string;
  title: string;
  // ✅ allow single OR multiple categories
  type: NonAllType | NonAllType[];
  org?: string;
  date?: string;
  summary: string;
  bullets: string[];
  impact?: string;
  tech: string[];
  links?: { label: string; href: string; icon: "github" | "link" }[];
  featured?: boolean;
};

const GITHUB = "https://github.com/Milipatel3110";

const PROJECTS: Project[] = [
  // ✅ Flagship Thesis (featured)
  {
    id: "deepfake-thesis",
    title: "Anomaly Detection for Deepfake Facial Images (Master’s Thesis)",
    type: "AI/ML", // or: ["AI/ML", "Full-Stack"] if you want it in both
    org: "University of North Texas",
    date: "2024 – 2026 (Expected)",
    featured: true,
    summary:
      "Research-driven anomaly/OOD detection for deepfake facial images under distribution shift — beyond closed-set classification.",
    bullets: [
      "Focus on distribution shift and generalization across manipulation types.",
      "Build reproducible pipeline + robust evaluation + demo-ready web app.",
      "Analyze model behavior using OOD signals and calibration-style insights.",
    ],
    impact: "Research pipeline + demo-ready app",
    tech: ["Python", "PyTorch/TensorFlow", "Computer Vision", "OOD/Anomaly", "Next.js", "Dashboards"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },

  {
    id: "smart-inventory",
    title: "Smart Inventory Management System",
    type: "Full-Stack",
    org: "University of North Texas",
    date: "Apr 2025 – May 2025",
    summary: "Real-time retail dashboard with alerts, email notifications, and exports.",
    bullets: [
      "Full-stack solution (Streamlit + MySQL) with real-time dashboards and low-stock alerts.",
      "Designed normalized schemas with indexes/triggers; role-based access control.",
      "Enabled exports to Excel/PDF and email notifications.",
    ],
    impact: "Real-time dashboard + automated alerts",
    tech: ["Python", "Streamlit", "MySQL", "SQL", "Email Notifications", "Data Modeling"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
  {
    id: "crime-pattern",
    title: "AI-Driven Crime Pattern Analysis",
    type: "Data/BI",
    org: "University of North Texas",
    date: "Mar 2025 – Apr 2025",
    summary: "Large-scale crime analytics with dashboards for hotspots, trends, and outcomes.",
    bullets: [
      "Analyzed 638,000+ U.S. crime records; built Tableau/Power BI dashboards.",
      "Cleaned + modeled data in Python to extract state/weapon/demographic insights.",
      "Delivered visual insights for final presentation and decision-making.",
    ],
    impact: "638K+ records analyzed",
    tech: ["Python", "Data Cleaning", "Power BI", "Tableau", "Analytics", "Visualization"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance System",
    type: "Edge/Hardware",
    org: "University of North Texas",
    date: "Jan 2025 – Apr 2025",
    summary: "Raspberry Pi + OpenCV pipeline for real-time face recognition and attendance automation.",
    bullets: [
      "Built real-time facial recognition pipeline using Raspberry Pi + OpenCV.",
      "Processed live classroom feeds; optimized for low latency.",
      "Added engagement-style metrics to enhance reporting.",
    ],
    impact: "Real-time recognition on edge",
    tech: ["Raspberry Pi", "OpenCV", "Python", "Computer Vision", "Edge Deployment"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
  {
    id: "fpga-object-detection",
    title: "AI-Based Object Detection on FPGA (Funded Project – ISRO)",
    type: "Edge/Hardware",
    org: "Ahmedabad (Funded Project)",
    date: "Aug 2023 – Dec 2023",
    summary: "YOLOv3 inference optimization on PYNQ FPGA for lower latency object detection.",
    bullets: [
      "Implemented YOLOv3 inference on PYNQ FPGA, reducing end-to-end latency by 30%.",
      "Designed Raspberry Pi + motor-controller network; improved synchronization by 40%.",
      "Optimized hardware–software integration for real-time performance.",
    ],
    impact: "30% lower latency • 40% better sync",
    tech: ["YOLOv3", "PYNQ FPGA", "Raspberry Pi", "Python/C++", "Edge AI", "Embedded"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
  {
    id: "mined-journal",
    title: "MineD Hackathon — Journal Rejection Predictor",
    type: "Hackathon",
    org: "Nirma University",
    date: "Mar 2023",
    summary: "ML model to flag likely journal rejections + Streamlit prototype for formatting issues.",
    bullets: [
      "Built classifier (Random Forest / Logistic Regression) to flag likely rejections.",
      "Reduced manual revisions by ~35% via early rejection prediction.",
      "Shipped Streamlit prototype highlighting formatting issues in real time.",
    ],
    impact: "35% fewer manual revisions",
    tech: ["Python", "Scikit-learn", "Random Forest", "LogReg", "Streamlit"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
  {
    id: "hackinfinity-captioning",
    title: "HackInfinity — Real-Time Captioning & Translation (EdTech)",
    type: "Hackathon",
    org: "DA-IICT, Gandhinagar",
    date: "Feb 2023",
    summary: "Captioning tool for accessibility with live speech-to-text + multilingual translation.",
    bullets: [
      "Designed accessibility-focused captioning for hearing/language impairments.",
      "Integrated speech-to-text + multilingual translation for live support.",
      "Used OpenCV + TensorFlow components to support real-time flow.",
    ],
    impact: "Accessibility-first EdTech demo",
    tech: ["OpenCV", "TensorFlow", "Speech-to-Text", "Translation", "Python"],
    links: [{ label: "GitHub", href: GITHUB, icon: "github" }],
  },
];

const FILTERS: ProjectType[] = ["All", "Full-Stack", "AI/ML", "Data/BI", "Edge/Hardware", "Hackathon"];

function hasType(p: Project, f: NonAllType) {
  return Array.isArray(p.type) ? p.type.includes(f) : p.type === f;
}

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

function LinkBtn({ href, icon, label }: { href: string; icon: "github" | "link"; label: string }) {
  const Icon = icon === "github" ? Github : ExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs hover:opacity-95 transition inline-flex items-center gap-2"
    >
      <Icon size={14} /> {label}
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectType>("All");

  const featured = PROJECTS.find((p) => p.featured);

  // ✅ show featured only when it matches current filter (or All)
  type ProjectType = "All" | "Full-Stack" | "AI/ML" | "Data/BI" | "Edge/Hardware" | "Hackathon";
  type NonAllType = Exclude<ProjectType, "All">;
  
  
  function isNonAllType(f: ProjectType): f is NonAllType {
    return f !== "All";
  }
  
  const showFeatured =
    !!featured && (filter === "All" || (isNonAllType(filter) && hasType(featured, filter)));
  

  const list = useMemo(() => {
    const base = [...PROJECTS].filter((p) => !p.featured);

    if (filter === "All") return base;

    return base.filter((p) => hasType(p, filter));
  }, [filter]);

  return (
    <section id="projects" className="scroll-mt-28 py-16 md:py-24">
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
            Projects{" "}
            <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">
            Full-stack builds, ML research, dashboards, and edge projects — all in one place.
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
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Chip>
          ))}
        </motion.div>

        {/* Featured / Flagship (NOW respects filter) */}
        {showFeatured && featured ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 card-glass rounded-3xl p-7 md:p-9 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(78,155,255,0.55)]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-[rgba(255,91,193,0.55)]" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]">
                  <Sparkles size={14} /> Flagship (Thesis)
                </div>

                <h3 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">{featured.title}</h3>

                <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                  {featured.org} {featured.date ? `• ${featured.date}` : ""}
                </div>

                <p className="mt-4 text-[rgb(var(--muted))] max-w-3xl">{featured.summary}</p>

                <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--muted))]">
                  {featured.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgba(78,155,255,0.9)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {featured.impact ? (
                  <div className="mt-5 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    {featured.impact}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {featured.links?.map((l) => (
                  <LinkBtn key={l.href} href={l.href} icon={l.icon} label={l.label} />
                ))}
              </div>
            </div>

            <div className="pointer-events-none mt-7 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
          </motion.div>
        ) : null}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {list.map((p) => (
              <motion.article key={p.id} variants={fadeUp} className="card-glass rounded-3xl p-7 md:p-8 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs inline-flex text-[rgb(var(--muted))]">
                      {Array.isArray(p.type) ? p.type.join(" • ") : p.type}
                    </div>

                    <h3 className="mt-3 text-lg md:text-xl font-semibold">{p.title}</h3>

                    <div className="mt-2 text-xs text-[rgb(var(--muted))]">
                      {p.org ? p.org : ""} {p.date ? (p.org ? `• ${p.date}` : p.date) : ""}
                    </div>

                    <p className="mt-3 text-sm text-[rgb(var(--muted))]">{p.summary}</p>

                    {p.impact ? (
                      <div className="mt-4 text-xs text-emerald-300 border border-emerald-500/25 bg-emerald-500/15 rounded-full px-3 py-1 inline-flex">
                        {p.impact}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {p.links?.map((l) => (
                      <LinkBtn key={l.href} href={l.href} icon={l.icon} label={l.label} />
                    ))}
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--muted))]">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgba(255,91,193,0.8)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pointer-events-none mt-7 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
