"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";

/* ─── Portal definitions ─────────────────────────────────────────────────── */
const portals = [
  {
    tag: "Enrolled participants",
    title: "Participant Portal",
    description:
      "Access your courses, track your progress, and manage your T.O.O.L.S Inc program journey.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 6a7 7 0 0 1 14 0" />
      </svg>
    ),
    accent: "from-brand/20 to-brand/5",
    ring: "group-hover:ring-brand/40",
  },
  {
    tag: "Staff & Case Managers",
    title: "Staff Portal",
    description:
      "Manage caseloads, schedule appointments, review documents, and support program participants.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.5 7.5A7.5 7.5 0 0 1 15 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 17.25A7.5 7.5 0 0 0 3 18.75" />
      </svg>
    ),
    accent: "from-brand2/20 to-brand2/5",
    ring: "group-hover:ring-brand2/40",
  },
  {
    tag: "Administrators only",
    title: "Admin Portal",
    description:
      "Oversee operations, manage personnel, review compliance reports, and configure program settings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    accent: "from-accent/20 to-accent/5",
    ring: "group-hover:ring-accent/40",
  },
  {
    tag: "Enterprise Administrators",
    title: "Enterprise Workspace",
    description:
      "Identity, compliance, integrations, and executive analytics for enterprise administrators.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    accent: "from-sky-400/20 to-sky-400/5",
    ring: "group-hover:ring-sky-400/40",
  },
  {
    tag: "Finance Team",
    title: "Finance Portal",
    description:
      "Manage budgets, payroll, invoices, and financial reports for the organization.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    accent: "from-emerald-400/20 to-emerald-400/5",
    ring: "group-hover:ring-emerald-400/40",
  },
  {
    tag: "HR Department",
    title: "HR Portal",
    description:
      "Staff management, onboarding, performance reviews, and compliance tracking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
    accent: "from-orange-400/20 to-orange-400/5",
    ring: "group-hover:ring-orange-400/40",
  },
  {
    tag: "Communications Team",
    title: "News & Media Portal",
    description:
      "Publish articles, manage announcements, and track media content and engagement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-4.5 5.25h4.5m.75-8.25H18a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 21.75H6A2.25 2.25 0 0 1 3.75 19.5V9A2.25 2.25 0 0 1 6 6.75h.75M8.25 9H12m-3.75 3H12m-3.75 3H12M6 3h.008v.008H6V3Z" />
      </svg>
    ),
    accent: "from-pink-400/20 to-pink-400/5",
    ring: "group-hover:ring-pink-400/40",
  },
];

/* ─── Stagger animation variants ─────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function PortalPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="inline-block mb-4 rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            T.O.O.L.S Inc
          </p>
          <h1 className="h1 mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-brand to-brand2 bg-clip-text text-transparent">
              Platform Suite
            </span>
          </h1>
          <p className="p-lead mx-auto max-w-xl">
            A unified ecosystem of specialized portals — each designed for a distinct role within the T.O.O.L.S Inc program.
          </p>
        </motion.div>

        {/* Portal grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {portals.map((portal) => (
            <motion.div key={portal.title} variants={item}>
              <div
                className={`group relative flex flex-col gap-4 rounded-2xl bg-panel border border-border p-6 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 ${portal.ring}`}
              >
                {/* Gradient background */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${portal.accent}`}
                />

                {/* Icon + badge */}
                <div className="relative flex items-start justify-between">
                  <div className={`rounded-xl bg-gradient-to-br ${portal.accent} p-3 text-text/80 group-hover:text-text transition-colors`}>
                    {portal.icon}
                  </div>
                  <span className="text-[11px] font-medium text-muted leading-tight text-right max-w-[120px]">
                    {portal.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="relative flex-1">
                  <h2 className="text-base font-bold text-text mb-1 group-hover:text-white transition-colors">
                    {portal.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    {portal.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </section>
    </main>
  );
}
