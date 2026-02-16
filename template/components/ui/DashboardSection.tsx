"use client";

import { GlowCard } from "./GlowCard";
import { SectionHeading } from "./SectionHeading";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const chartData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 24 },
  { name: "Fri", value: 21 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 6 }
];

function MiniKpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <GlowCard className="p-5">
      <div className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-muted">{hint}</div>
    </GlowCard>
  );
}

export function DashboardSection() {
  return (
    <section id="dashboard" className="pt-20">
      <SectionHeading
        eyebrow="Impact Metrics"
        title="Real-Time Program Insights"
        subtitle="Track participant progress, program outcomes, and community impact with comprehensive metrics and reporting."
      />

      <div className="mx-auto mt-10 max-w-container">
        <div className="glass overflow-hidden rounded-xl">
          <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex items-center justify-between">
                <div className="font-extrabold tracking-tight">Program Hub</div>
                <div className="h-2 w-2 rounded-full bg-brand" />
              </div>

              <div className="space-y-2">
                {["Overview", "Participants", "Programs", "Reports", "Resources"].map((x) => (
                  <div
                    key={x}
                    className="rounded-md px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-text"
                  >
                    {x}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-border bg-white/5 p-4">
                <div className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                  Active Programs
                </div>
                <div className="mt-2 text-sm text-text">
                  Job Readiness · Education · Mentorship
                </div>
                <div className="mt-2 text-xs text-muted">
                  Supporting 42 active participants
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="p-5">
              {/* Top bar */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-muted">Overview</div>
                  <div className="text-xl font-extrabold tracking-tight">Program Impact</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="glass rounded-md px-4 py-2 text-sm text-muted">
                    Search participants…
                  </div>
                  <div className="glass rounded-md px-4 py-2 text-sm text-muted">
                    Last 7 days
                  </div>
                </div>
              </div>

              {/* KPI row */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <MiniKpi label="Active Participants" value="42" hint="Engaged in programs" />
                <MiniKpi label="Job Placements" value="18" hint="This quarter" />
                <MiniKpi label="Success Rate" value="87%" hint="Program completion" />
              </div>

              {/* Chart + Activity */}
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_.8fr]">
                <GlowCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                        Participant Engagement
                      </div>
                      <div className="mt-1 text-sm text-muted">Weekly activity overview</div>
                    </div>
                    <div className="text-xs text-muted">Current week</div>
                  </div>

                  <div className="mt-4 h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fill: "rgba(148,163,184,.85)", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(12,15,23,.92)",
                            border: "1px solid rgba(255,255,255,.12)",
                            borderRadius: 12,
                            color: "rgba(248,250,252,.96)"
                          }}
                          labelStyle={{ color: "rgba(148,163,184,.9)" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="rgba(56,189,248,.85)"
                          fill="rgba(56,189,248,.14)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </GlowCard>

                <GlowCard className="p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                    Recent Activity
                  </div>
                  <div className="mt-3 space-y-3">
                    {[
                      { t: "10m ago", m: "New participant enrolled in Job Readiness" },
                      { t: "1h ago", m: "Interview scheduled for John D." },
                      { t: "2h ago", m: "Resume workshop completed - 8 attendees" },
                      { t: "4h ago", m: "Job placement confirmed for Sarah M." }
                    ].map((x) => (
                      <div key={x.m} className="rounded-lg border border-border bg-white/5 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold">Update</div>
                          <div className="text-xs text-muted">{x.t}</div>
                        </div>
                        <div className="mt-1 text-sm text-muted">{x.m}</div>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </div>

              {/* Table */}
              <GlowCard className="mt-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                      Upcoming Milestones
                    </div>
                    <div className="mt-1 text-sm text-muted">Program activities this week</div>
                  </div>
                  <div className="text-xs text-muted">Auto-scheduled</div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-muted">
                      <tr className="border-b border-border">
                        <th className="py-2 pr-4 font-semibold">Date</th>
                        <th className="py-2 pr-4 font-semibold">Activity</th>
                        <th className="py-2 pr-4 font-semibold">Program</th>
                        <th className="py-2 pr-4 font-semibold">Participants</th>
                        <th className="py-2 pr-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-text">
                      {[
                        ["Mon 1/13", "Resume Workshop", "Job Readiness", "12", "Confirmed"],
                        ["Tue 1/14", "Mock Interviews", "Job Readiness", "6", "Scheduled"],
                        ["Wed 1/15", "Career Counseling", "Mentorship", "8", "In Progress"],
                        ["Thu 1/16", "Skills Assessment", "Education", "15", "Pending"]
                      ].map((r) => (
                        <tr key={r[0] + r[1]} className="border-b border-border/60">
                          <td className="py-3 pr-4 font-semibold">{r[0]}</td>
                          <td className="py-3 pr-4 text-muted">{r[1]}</td>
                          <td className="py-3 pr-4">
                            <span className="rounded-md border border-border bg-white/5 px-2 py-1 text-xs">
                              {r[2]}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-muted">{r[3]}</td>
                          <td className="py-3 pr-2">
                            <span className="rounded-md border border-border bg-white/5 px-2 py-1 text-xs">
                              {r[4]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
