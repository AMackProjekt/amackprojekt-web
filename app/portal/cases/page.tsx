"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockParticipants, mockPrograms } from "@/lib/data/mockPortalData";
import type { Participant } from "@/lib/types/portal";

export default function CasesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filteredParticipants = mockParticipants.filter(p => {
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusColors = {
    active: "bg-brand/20 text-brand border-brand/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "on-hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    archived: "bg-muted/20 text-muted border-border"
  };

  const getProgram = (programId: string) => mockPrograms.find(p => p.id === programId);

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
              <h1 className="text-xl font-extrabold tracking-tight text-text">Case Management</h1>
              <p className="text-sm text-muted">Track and manage participant cases</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            + New Case
          </motion.button>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Filters</h3>
              
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text placeholder:text-muted focus:outline-none focus:border-brand/50"
                />
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Cases", count: mockParticipants.length },
                  { value: "active", label: "Active", count: mockParticipants.filter(p => p.status === "active").length },
                  { value: "completed", label: "Completed", count: mockParticipants.filter(p => p.status === "completed").length },
                  { value: "on-hold", label: "On Hold", count: mockParticipants.filter(p => p.status === "on-hold").length },
                  { value: "archived", label: "Archived", count: mockParticipants.filter(p => p.status === "archived").length }
                ].map(status => (
                  <button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedStatus === status.value 
                        ? "bg-brand/20 text-brand" 
                        : "text-muted hover:bg-white/5 hover:text-text"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{status.label}</span>
                      <span className="text-xs">{status.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-text">{mockParticipants.filter(p => p.status === "active").length}</div>
                  <div className="text-xs text-muted">Active Cases</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand2">{mockParticipants.filter(p => p.status === "completed").length}</div>
                  <div className="text-xs text-muted">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {Math.round((mockParticipants.filter(p => p.status === "completed").length / mockParticipants.length) * 100)}%
                  </div>
                  <div className="text-xs text-muted">Success Rate</div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Main Content */}
          <div>
            {!selectedParticipant ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredParticipants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowCard 
                      className="p-5 cursor-pointer hover:border-brand/50 transition-colors"
                      onClick={() => setSelectedParticipant(participant)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-white font-bold text-lg">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-bold text-text">{participant.name}</h3>
                            <p className="text-sm text-muted">{participant.email}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[participant.status]}`}>
                          {participant.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted">
                          <span>📅</span>
                          <span>Joined: {new Date(participant.joinDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted">
                          <span>📚</span>
                          <span>{participant.programIds.length} Program{participant.programIds.length !== 1 ? 's' : ''}</span>
                        </div>
                        {participant.tags && participant.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {participant.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 rounded bg-brand/10 text-brand">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <GlowCard className="p-6">
                  <button
                    onClick={() => setSelectedParticipant(null)}
                    className="text-muted hover:text-text mb-4 text-sm"
                  >
                    ← Back to list
                  </button>

                  {/* Participant Detail */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-white font-bold text-2xl">
                      {selectedParticipant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-text">{selectedParticipant.name}</h2>
                        <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[selectedParticipant.status]}`}>
                          {selectedParticipant.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-muted">
                        <div>📧 {selectedParticipant.email}</div>
                        {selectedParticipant.phone && <div>📞 {selectedParticipant.phone}</div>}
                        <div>📅 Joined: {new Date(selectedParticipant.joinDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="mb-6">
                    <h3 className="font-bold text-sm mb-3 tracking-wider uppercase text-muted">Enrolled Programs</h3>
                    <div className="space-y-2">
                      {selectedParticipant.programIds.map(progId => {
                        const program = getProgram(progId);
                        if (!program) return null;
                        const completedMilestones = program.milestones.filter(m => m.completed).length;
                        const progress = Math.round((completedMilestones / program.milestones.length) * 100);
                        
                        return (
                          <div key={progId} className="p-3 rounded-lg bg-bg border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-text">{program.name}</span>
                              <span className="text-xs text-muted">{progress}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-brand to-brand2 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedParticipant.notes && (
                    <div className="mb-6">
                      <h3 className="font-bold text-sm mb-3 tracking-wider uppercase text-muted">Notes</h3>
                      <div className="p-3 rounded-lg bg-bg border border-border text-sm text-text">
                        {selectedParticipant.notes}
                      </div>
                    </div>
                  )}

                  {/* Custom Fields */}
                  {selectedParticipant.customFields && Object.keys(selectedParticipant.customFields).length > 0 && (
                    <div>
                      <h3 className="font-bold text-sm mb-3 tracking-wider uppercase text-muted">Additional Information</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedParticipant.customFields).map(([key, value]) => (
                          <div key={key} className="p-3 rounded-lg bg-bg border border-border">
                            <div className="text-xs text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="text-sm font-semibold text-text mt-1">{String(value)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                    >
                      Edit Case
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
                    >
                      Add Note
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
                    >
                      View Timeline
                    </motion.button>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
