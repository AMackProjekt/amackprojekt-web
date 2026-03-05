"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockActivities, mockParticipants, mockPrograms } from "@/lib/data/mockPortalData";
import type { Activity } from "@/lib/types/portal";

export default function ActivityPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "all">("week");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filterByTimeRange = (activity: Activity) => {
    const activityDate = new Date(activity.timestamp);
    const now = new Date();
    
    switch (timeRange) {
      case "today":
        return activityDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return activityDate >= weekAgo;
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return activityDate >= monthAgo;
      default:
        return true;
    }
  };

  const filteredActivities = mockActivities
    .filter(a => selectedType === "all" || a.type === selectedType)
    .filter(filterByTimeRange)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const activityIcons = {
    task_created: "✏️",
    task_completed: "✅",
    document_uploaded: "📤",
    participant_enrolled: "➕",
    milestone_completed: "🎯",
    message_sent: "💬",
    note_added: "📝"
  };

  const activityColors = {
    task_created: "text-brand",
    task_completed: "text-green-400",
    document_uploaded: "text-brand2",
    participant_enrolled: "text-accent",
    milestone_completed: "text-yellow-400",
    message_sent: "text-brand",
    note_added: "text-muted"
  };

  const activityTypes = Array.from(new Set(mockActivities.map(a => a.type)));
  const activityCounts = activityTypes.reduce((acc, type) => {
    acc[type] = mockActivities.filter(a => a.type === type).length;
    return acc;
  }, {} as Record<string, number>);

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return then.toLocaleDateString();
  };

  const groupActivitiesByDate = (activities: Activity[]) => {
    const grouped: Record<string, Activity[]> = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(activity);
    });

    return grouped;
  };

  const groupedActivities = groupActivitiesByDate(filteredActivities);

  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-container px-7 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push("/portal/dashboard")}
                className="text-muted hover:text-text"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-text">Activity Timeline</h1>
                <p className="text-sm text-muted">Track all platform activities and updates</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:border-brand/50"
            >
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="all">All Time</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:border-brand/50"
            >
              <option value="all">All Activities</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <div className="ml-auto text-sm text-muted">
              {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Activity Types</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedType === "all" 
                      ? "bg-brand/20 text-brand" 
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Activities</span>
                    <span className="text-xs">{mockActivities.length}</span>
                  </div>
                </button>
                
                {activityTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedType === type 
                        ? "bg-brand/20 text-brand" 
                        : "text-muted hover:bg-white/5 hover:text-text"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span>{activityIcons[type as keyof typeof activityIcons]}</span>
                        <span className="capitalize">{type.replace(/_/g, " ")}</span>
                      </span>
                      <span className="text-xs">{activityCounts[type]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="font-bold text-sm mb-4 tracking-wider uppercase text-muted">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-text">
                    {mockActivities.filter(a => {
                      const date = new Date(a.timestamp);
                      const today = new Date();
                      return date.toDateString() === today.toDateString();
                    }).length}
                  </div>
                  <div className="text-xs text-muted">Today's Activities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand">
                    {mockActivities.filter(a => {
                      const date = new Date(a.timestamp);
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                      return date >= weekAgo;
                    }).length}
                  </div>
                  <div className="text-xs text-muted">This Week</div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-6">
            {Object.keys(groupedActivities).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-text mb-2">No activities found</h3>
                <p className="text-muted">Try adjusting your filters</p>
              </div>
            ) : (
              Object.entries(groupedActivities).map(([date, activities]) => (
                <div key={date}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-bold text-muted whitespace-nowrap">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="space-y-3 relative before:absolute before:left-[21px] before:top-4 before:bottom-4 before:w-px before:bg-border">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        <GlowCard className="p-4 ml-12 hover:border-brand/50 transition-colors">
                          {/* Timeline dot */}
                          <div className={`absolute left-[-36px] top-6 w-6 h-6 rounded-full bg-bg border-2 border-border flex items-center justify-center text-sm ${activityColors[activity.type]}`}>
                            {activityIcons[activity.type as keyof typeof activityIcons]}
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-text">{activity.userName}</span>
                                <span className="text-muted">{activity.description}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-sm text-muted mb-2">
                                <span className="capitalize">{activity.entityType}</span>
                                <span>•</span>
                                <span className="font-medium text-text">{activity.entityName}</span>
                              </div>

                              {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                <div className="mt-2 p-2 rounded bg-bg border border-border text-xs text-muted">
                                  {Object.entries(activity.metadata).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="font-semibold">{key}:</span> {String(value)}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="text-right">
                              <div className="text-xs text-muted whitespace-nowrap">
                                {formatRelativeTime(activity.timestamp)}
                              </div>
                              <div className="text-xs text-muted mt-1">
                                {new Date(activity.timestamp).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
