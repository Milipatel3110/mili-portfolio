"use client";

import { motion, type Variants } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
} from "lucide-react";

type TimelineItem = {
  role: string;
  org: string;
  location: string;
  dates: string;
  type: "teaching" | "internship" | "leadership";
  bullets: string[];
  tags: string[];
  link?: string; // optional external link (e.g., LinkedIn post)
  linkLabel?: string; // button text
};

const items: TimelineItem[] = [
  {
    role: "Teaching Assistant / Instructional Assistant — CSCE 4010 (Social Issues in Computing)",
    org: "University of North Texas",
    location: "Denton, TX",
    dates: "Spring 2026 — Present",
    type: "teaching",
    bullets: [
      "Assist course delivery under Dr. Moawia Eldow (CSCE 4010).",
      "Support students through guidance, clarifying concepts, and feedback.",
      "Help with grading, rubrics, and maintaining consistent evaluation.",
    ],
    tags: ["Teaching", "Mentoring", "Grading", "CS Education"],
  },
  {
    role: "Teaching Assistant / Instructional Assistant — CSCE 4010 (Social Issues in Computing)",
    org: "University of North Texas",
    location: "Denton, TX",
    dates: "Fall 2025",
    type: "teaching",
    bullets: [
      "Graded assignments/discussion work and supported course operations.",
      "Helped students navigate course requirements and improved submissions via feedback.",
      "Contributed to smooth course logistics and timely communication.",
    ],
    tags: ["Teaching", "Evaluation", "Communication"],
  },
  {
    role: "Summer Camp Computing Instructor",
    org: "University of North Texas",
    location: "Denton, TX",
    dates: "May 2025 – Jun 2025",
    type: "teaching",
    bullets: [
      "Taught middle & high school students programming fundamentals using Python and embedded systems.",
      "Designed hands-on lessons touching AI, robotics, and hardware programming.",
      "Worked with staff to deliver a smooth 6-week learning experience.",
    ],
    tags: ["Python", "Robotics", "Embedded", "Instruction"],
  },
  {
    role: "Research & Development Intern",
    org: "Space Applications Centre (SAC), ISRO",
    location: "Ahmedabad, India",
    dates: "Jan 2024 – May 2024",
    type: "internship",
    bullets: [
      "Developed a GUI for a Stewart-platform telescope to capture high-resolution galaxy images.",
      "Designed a network topology using Raspberry Pi + motor controllers; improved synchronization by ~40%.",
      "Built automation scripts for motor control to strengthen hardware–software integration.",
    ],
    tags: ["Raspberry Pi", "Automation", "GUI", "Systems"],
  },
  {
    role: "Software Development Intern (Remote)",
    org: "Vas Ventures Pvt. Ltd.",
    location: "Remote",
    dates: "Jun 2023 – Jul 2023",
    type: "internship",
    bullets: [
      "Built a Tkinter GUI to automate bulk WhatsApp messaging; reduced manual effort by ~80%.",
      "Applied ML models in CallAstro to predict marriage status using web-scraped data (~85% accuracy).",
      "Automated testing with Selenium; reduced bug-detection time by ~60%.",
    ],
    tags: ["Tkinter", "Selenium", "ML", "Automation"],
  },

  // ✅ NEW: Leadership role
  {
    role: "Vice President — ACES (Association of Computer Engineering Students)",
    org: "Nirma University",
    location: "Ahmedabad, India",
    dates: "2023 – 2024",
    type: "leadership",
    bullets: [
      "Led ACES activities and coordinated student teams to deliver technical events and workshops.",
      "Collaborated with faculty and peers to execute department-level programs and student engagement initiatives.",
      "Mentored junior students and supported community-driven learning and collaboration.",
    ],
    tags: ["Leadership", "Community", "Event Management", "Mentoring"],
    link: "https://www.linkedin.com/posts/mili-patel-9859b7200_to-the-outgoing-board-your-dedication-and-activity-7130167846248022019-ak3A?utm_source=share&utm_medium=member_desktop&rcm=ACoAADNn27UB3KwwfHokg_OyEXrG0j-WTZjG54w",
    linkLabel: "View LinkedIn post",
  },
];

// Per-card animation (drop-in)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// Little dot animation
const dotVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
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
      <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
      {children}
    </span>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Experience Journey"
          subtitle="A timeline of my roles — teaching, internships, leadership, and hands-on engineering work."
        />

        <div className="mt-12 relative">
          {/* Center vertical line (desktop) + left line (mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-10">
            {items.map((it, idx) => {
              const leftSide = idx % 2 === 0; // alternate

              const Icon =
                it.type === "teaching"
                  ? GraduationCap
                  : it.type === "leadership"
                  ? Users
                  : Briefcase;

              return (
                <div key={`${it.role}-${it.org}-${it.dates}`} className="relative">
                  {/* timeline dot */}
                  <motion.div
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 h-3.5 w-3.5 rounded-full bg-[rgb(var(--fg))]/70 ring-4 ring-[rgb(var(--bg))]"
                  />

                  {/* layout: 2 columns on desktop, stacked on mobile */}
                  <div className="md:grid md:grid-cols-2 md:gap-10 items-start">
                    {/* LEFT column */}
                    <div className={leftSide ? "md:flex md:justify-end" : "hidden md:block"} />

                    {/* CARD (always visible on mobile) */}
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.25 }}
                      className={[
                        "card-glass rounded-3xl p-6 md:p-7",
                        // mobile spacing to clear the left line
                        "ml-10 md:ml-0",
                        // alternate position on desktop
                        leftSide
                          ? "md:col-start-1 md:justify-self-end"
                          : "md:col-start-2 md:justify-self-start",
                        "md:max-w-[560px]",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg md:text-xl font-semibold">{it.role}</div>
                          <div className="mt-1 text-sm text-[rgb(var(--muted))]">{it.org}</div>

                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[rgb(var(--muted))]">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={14} /> {it.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={14} /> {it.dates}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-2xl border border-white/10 p-2.5">
                          <Icon size={18} />
                        </div>
                      </div>

                      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[rgb(var(--muted))]">
                        {it.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgba(255,91,193,0.85)]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {it.tags.map((t) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </div>

                      {it.link ? (
                        <a
                          href={it.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] transition"
                        >
                          {it.linkLabel ?? "View link"} <ExternalLink size={14} />
                        </a>
                      ) : null}
                    </motion.div>

                    {/* RIGHT column */}
                    <div className={!leftSide ? "md:flex md:justify-start" : "hidden md:block"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

