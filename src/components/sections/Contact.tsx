"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Copy, ExternalLink, Send } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
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
      <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

function PillRow({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{children}</div>;
}

function openGmailCompose(to: string, subject: string, body: string) {
  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // Must happen directly on click/submit (no await before this) for popup blockers.
  const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");

  // Popup blocked → open in same tab
  if (!win) window.location.href = gmailUrl;
}

export default function Contact() {
  const EMAIL = "milipatel.career@gmail.com";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const subject = useMemo(() => `Portfolio message from ${name || "Someone"}`, [name]);

  const body = useMemo(() => {
    return [
      `Name: ${name || "-"}`,
      `Email: ${fromEmail || "-"}`,
      "",
      (message || "").trim(),
      "",
      "— Sent from portfolio contact form",
    ].join("\n");
  }, [name, fromEmail, message]);

  const mailtoHref = useMemo(() => {
    return `mailto:${encodeURIComponent(EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [EMAIL, subject, body]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please write a message 🙂");
      return;
    }

    // Preferred: Gmail compose
    try {
      openGmailCompose(EMAIL, subject, body);
    } catch {
      // Fallback: default mail client
      window.location.href = mailtoHref;
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <SectionTitle
            title="Let's connect"
            subtitle="Want to collaborate, discuss research, or talk full-stack? Send a message — I reply fast."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Left card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="card-glass rounded-3xl p-6 md:p-7"
          >
            <div className="text-lg font-semibold">Reach me directly</div>
            <div className="mt-1 text-sm text-[rgb(var(--muted))]">Best way: email. Also active on LinkedIn + GitHub.</div>

            <div className="mt-5 space-y-3">
              <PillRow>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-[rgb(var(--muted))]">Email</div>
                    <div className="font-semibold truncate">{EMAIL}</div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                  >
                    <Copy size={14} />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </PillRow>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-xs text-[rgb(var(--muted))]">Connect / message</div>
                  </div>
                  <ExternalLink size={16} />
                </div>
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-xs text-[rgb(var(--muted))]">Projects & code</div>
                  </div>
                  <ExternalLink size={16} />
                </div>
              </a>
            </div>

            <div className="pointer-events-none mt-6 h-[3px] w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.55)] to-[rgba(255,91,193,0.55)] opacity-80" />
          </motion.div>

          {/* Right card - form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="card-glass rounded-3xl p-6 md:p-7"
          >
            <div className="text-lg font-semibold">Send a message</div>
            <div className="mt-1 text-sm text-[rgb(var(--muted))]">
              This opens Gmail compose with the message pre-filled.
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:bg-white/10"
                />
                <input
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  placeholder="Your email"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:bg-white/10"
                />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:bg-white/10 resize-none"
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  <Mail size={16} />
                  Send
                  <Send size={16} />
                </button>

                {/* Optional fallback link (handy if popups blocked) */}
                <a
                  href={mailtoHref}
                  className="text-xs text-[rgb(var(--muted))] underline underline-offset-4 hover:text-[rgb(var(--fg))]"
                >
                  Having trouble? Open default email app
                </a>
              </div>
            </form>

            <div className="pointer-events-none mt-6 h-[3px] w-full rounded-full bg-gradient-to-r from-[rgba(78,155,255,0.0)] via-[rgba(120,119,198,0.55)] to-[rgba(255,91,193,0.55)] opacity-80" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
