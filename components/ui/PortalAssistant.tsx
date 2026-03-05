"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./GlowCard";

interface Recommendation {
  id: string;
  type: "course" | "task" | "milestone" | "tip";
  icon: string;
  title: string;
  description: string;
  action: string;
  actionUrl?: string;
  priority: "high" | "medium" | "low";
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "course",
    icon: "🎓",
    title: "Complete Your Resume",
    description: "You've completed the job readiness program. Next: create a professional resume.",
    action: "Start Course",
    actionUrl: "/portal/courses",
    priority: "high",
  },
  {
    id: "2",
    type: "task",
    icon: "✅",
    title: "Review Your Progress",
    description: "You have 3 pending milestones. Complete them to unlock new opportunities.",
    action: "View Tasks",
    actionUrl: "/portal/tasks",
    priority: "high",
  },
  {
    id: "3",
    type: "milestone",
    icon: "🎯",
    title: "4-Week Engagement Milestone",
    description: "You're close! Just 2 more check-ins to complete your first milestone.",
    action: "Continue",
    actionUrl: "/portal/dashboard",
    priority: "medium",
  },
  {
    id: "4",
    type: "tip",
    icon: "💡",
    title: "Pro Tip: Network with Mentors",
    description: "Join our mentorship channel to connect with professionals in your field.",
    action: "Join Channel",
    actionUrl: "/portal/messages",
    priority: "low",
  },
];

export function PortalAssistant() {
  const [selectedFilter, setSelectedFilter] = useState<Recommendation["type"] | "all">("all");
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const filteredRecommendations = mockRecommendations.filter(
    (rec) =>
      !dismissedIds.has(rec.id) && (selectedFilter === "all" || rec.type === selectedFilter)
  );

  const highPriorityCount = filteredRecommendations.filter((r) => r.priority === "high").length;

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set([...prev, id]));
  };

  const filterOptions: Array<{ label: string; value: Recommendation["type"] | "all" }> = [
    { label: "All", value: "all" },
    { label: "Courses", value: "course" },
    { label: "Tasks", value: "task" },
    { label: "Tips", value: "tip" },
  ];

  return (
    <GlowCard className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand to-brand2 flex items-center justify-center text-lg">
              🤖
            </div>
            <h2 className="text-2xl font-extrabold text-text">AI Assistant</h2>
          </div>
          <p className="text-sm text-muted">
            Personalized recommendations based on your progress
          </p>
        </div>
        {highPriorityCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40"
          >
            <p className="text-xs font-semibold text-red-400">
              {highPriorityCount} Action{highPriorityCount > 1 ? "s" : ""} Needed
            </p>
          </motion.div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 pb-6 border-b border-border">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              selectedFilter === option.value
                ? "bg-brand text-white"
                : "bg-panel text-muted hover:text-text hover:bg-panel/80"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border-l-4 transition-all ${
                  rec.priority === "high"
                    ? "bg-red-500/5 border-l-red-500"
                    : rec.priority === "medium"
                    ? "bg-yellow-500/5 border-l-yellow-500"
                    : "bg-panel border-l-brand"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{rec.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-text">{rec.title}</h3>
                      <span
                        className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                          rec.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : rec.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-brand/20 text-brand"
                        }`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{rec.description}</p>
                    <div className="flex items-center gap-2">
                      {rec.actionUrl ? (
                        <a
                          href={rec.actionUrl}
                          className="text-sm font-semibold text-brand hover:text-brand2 transition-colors"
                        >
                          {rec.action} →
                        </a>
                      ) : (
                        <button className="text-sm font-semibold text-brand hover:text-brand2 transition-colors">
                          {rec.action} →
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(rec.id)}
                        className="text-xs text-muted hover:text-text transition-colors ml-auto"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-muted">
                {selectedFilter === "all"
                  ? "You're all caught up! No recommendations right now."
                  : `No ${selectedFilter}s to recommend right now.`}
              </p>
              <button
                onClick={() => setSelectedFilter("all")}
                className="text-sm text-brand hover:text-brand2 transition-colors mt-3"
              >
                View all recommendations
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Box */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted/70">
          💡 <strong>How it works:</strong> Our AI analyzes your progress and learning patterns to suggest
          the best next steps. Dismiss recommendations you're not interested in, and we'll learn your
          preferences.
        </p>
      </div>
    </GlowCard>
  );
}
