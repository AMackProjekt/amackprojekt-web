"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockTimeEntries, mockParticipants, mockPrograms } from "@/lib/data/mockPortalData";
import type { TimeEntry } from "@/lib/types/portal";

export default function TimeTrackingPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<"week" | "month">("week");
  const [isTracking, setIsTracking] = useState(false);
  const [activeEntry, setActiveEntry] = useState<Partial<TimeEntry>>({
    activity: "",
    description: "",
    startTime: new Date().toISOString()
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const calculateDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    return Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalHoursThisWeek = mockTimeEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    })
    .reduce((sum, entry) => sum + entry.duration, 0);

  const billableHoursThisWeek = mockTimeEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo && entry.billable;
    })
    .reduce((sum, entry) => sum + entry.duration, 0);

  const handleStartTracking = () => {
    if (!activeEntry.activity) return;
    setIsTracking(true);
    setActiveEntry({
      ...activeEntry,
      startTime: new Date().toISOString()
    });
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    // In production, this would save to backend
    console.log("Time entry saved:", activeEntry);
    setActiveEntry({
      activity: "",
      description: "",
      startTime: new Date().toISOString()
    });
  };

  const getParticipant = (id?: string) => id ? mockParticipants.find(p => p.id === id) : null;
  const getProgram = (id?: string) => id ? mockPrograms.find(p => p.id === id) : null;

  const groupedEntries = mockTimeEntries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, TimeEntry[]>);

  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/portal/dashboard")}
              className="text-muted hover:text-text"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-text">Time Tracking</h1>
              <p className="text-sm text-muted">Track program hours and activities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-bg rounded-lg p-1 border border-border">
              <button
                onClick={() => setSelectedView("week")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedView === "week" ? "bg-brand text-white" : "text-muted hover:text-text"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedView("month")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedView === "month" ? "bg-brand text-white" : "text-muted hover:text-text"
                }`}
              >
                Month
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Timer Card */}
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Timer</h3>
              
              {isTracking ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand mb-2">
                      {formatDuration(calculateDuration(activeEntry.startTime!))}
                    </div>
                    <div className="text-xs text-muted">{activeEntry.activity}</div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStopTracking}
                    className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    ⏹️ Stop Timer
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="What are you working on?"
                    value={activeEntry.activity}
                    onChange={(e) => setActiveEntry({ ...activeEntry, activity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-brand/50"
                  />
                  
                  <textarea
                    placeholder="Description (optional)"
                    value={activeEntry.description}
                    onChange={(e) => setActiveEntry({ ...activeEntry, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-brand/50 resize-none"
                    rows={2}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartTracking}
                    disabled={!activeEntry.activity}
                    className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ▶️ Start Timer
                  </motion.button>
                </div>
              )}
            </GlowCard>

            {/* Stats Card */}
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">This Week</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-text">
                    {formatDuration(totalHoursThisWeek)}
                  </div>
                  <div className="text-xs text-muted">Total Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand">
                    {formatDuration(billableHoursThisWeek)}
                  </div>
                  <div className="text-xs text-muted">Billable Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand2">
                    {mockTimeEntries.filter(e => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(e.date) >= weekAgo;
                    }).length}
                  </div>
                  <div className="text-xs text-muted">Entries</div>
                </div>
              </div>
            </GlowCard>

            {/* Quick Add */}
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Quick Add</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
              >
                + Manual Entry
              </motion.button>
            </GlowCard>
          </div>

          {/* Time Entries */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text">Time Entries</h2>
              <button className="text-sm text-muted hover:text-text">
                Export →
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedEntries)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, entries]) => (
                  <div key={date}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-muted">
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <div className="text-sm text-muted">
                        {formatDuration(entries.reduce((sum, e) => sum + e.duration, 0))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {entries.map((entry, index) => {
                        const participant = getParticipant(entry.participantId);
                        const program = getProgram(entry.programId);
                        
                        return (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <GlowCard className="p-4 hover:border-brand/50 transition-colors">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-text">{entry.activity}</h4>
                                    {entry.billable && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand/20 text-brand">
                                        Billable
                                      </span>
                                    )}
                                    {entry.approved ? (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                        ✓ Approved
                                      </span>
                                    ) : (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                                        Pending
                                      </span>
                                    )}
                                  </div>

                                  {entry.description && (
                                    <p className="text-sm text-muted mb-2">{entry.description}</p>
                                  )}

                                  <div className="flex items-center gap-4 text-xs text-muted">
                                    <span>
                                      🕐 {new Date(entry.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      {entry.endTime && ` - ${new Date(entry.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                    </span>
                                    {participant && (
                                      <span>👤 {participant.name}</span>
                                    )}
                                    {program && (
                                      <span>📚 {program.name}</span>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-lg font-bold text-text">
                                    {formatDuration(entry.duration)}
                                  </div>
                                  <div className="flex items-center gap-1 mt-2">
                                    <button className="p-1 rounded hover:bg-white/5 text-muted hover:text-text">
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                    </button>
                                    <button className="p-1 rounded hover:bg-white/5 text-muted hover:text-text">
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </GlowCard>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>

            {Object.keys(groupedEntries).length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold text-text mb-2">No time entries yet</h3>
                <p className="text-muted">Start tracking your time with the timer above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
