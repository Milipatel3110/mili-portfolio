"use client";

import { motion, type Variants } from "framer-motion";
import { GraduationCap, MapPin, Calendar, School } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const chip =
  "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-18 py-20 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[rgb(var(--muted))]">
            Academic foundation in AI, machine learning, and systems.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* MS */}
          <EduCard
            status="In Progress"
            statusTone="green"
            degree="Master of Science"
            major="Computer Science"
            school="University of North Texas"
            location="Denton, TX, USA"
            dates="2024 – 2026 (Expected)"
            highlights={[
              "Thesis: Anomaly Detection for Deepfake Facial Images",
              "Focus: Machine Learning, Computer Vision, AI Systems",
            ]}
            coursework={[
              "Machine Learning",
              "Deep Learning",
              "Computer Vision",
              "Data Mining",
              "NLP",
              "Advanced Algorithms",
            ]}
          />

          {/* BTech */}
          <EduCard
            status="Completed"
            statusTone="purple"
            degree="Bachelor of Technology"
            major="Computer Science & Engineering"
            school="Institute of Technology, Nirma University"
            location="Ahmedabad, India"
            dates="2020 – 2024"
            highlights={[
              "GPA: 3.14 / 4.0",
              "Coursework: Data Structures, Machine Learning, Computer Vision",
            ]}
            coursework={[
              "Data Structures",
              "Algorithms",
              "DBMS",
              "Operating Systems",
              "Computer Networks",
              "AI/ML Foundations",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function EduCard(props: {
  status: string;
  statusTone: "green" | "purple";
  degree: string;
  major: string;
  school: string;
  location: string;
  dates: string;
  highlights: string[];
  coursework: string[];
}) {
  const statusClass =
    props.statusTone === "green"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20"
      : "bg-violet-500/15 text-violet-300 border-violet-500/20";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="card-glass relative overflow-hidden rounded-3xl p-7 md:p-8"
    >
      {/* subtle border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

      {/* top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}
            >
              {props.status}
            </span>
          </div>
        </div>

        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
          <School className="h-5 w-5 opacity-80" />
        </div>
      </div>

      {/* title */}
      <div className="mt-5">
        <div className="text-xl md:text-2xl font-semibold">{props.degree}</div>
        <div className="mt-1 text-sm md:text-base text-[rgb(var(--muted))]">
          {props.major}
        </div>
      </div>

      {/* meta */}
      <div className="mt-4 space-y-2 text-sm text-[rgb(var(--muted))]">
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 opacity-70" />
          <span>{props.school}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 opacity-70" />
          <span>{props.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 opacity-70" />
          <span>{props.dates}</span>
        </div>
      </div>

      {/* divider */}
      <div className="mt-6 h-px w-full bg-white/10" />

      {/* highlights */}
      <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--muted))]">
        {props.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/30" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* coursework */}
      <div className="mt-6">
        <div className="text-xs font-semibold tracking-wide text-[rgb(var(--muted))]">
          RELEVANT COURSEWORK
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {props.coursework.map((c) => (
            <span key={c} className={chip}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* bottom accent line */}
      <div className="pointer-events-none mt-7 h-1 w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.65)] to-[rgba(255,91,193,0.65)] opacity-70" />
    </motion.div>
  );
}
