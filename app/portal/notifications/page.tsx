"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockNotifications } from "@/lib/data/mockPortalData";
import type { Notification } from "@/lib/types/portal";

export default function NotificationsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(() => 
    // In production, would filter by current user
    mockNotifications
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filteredNotifications = notifications.filter(n => 
    filter === "all" || (filter === "unread" && !n.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationIcons = {
    task_assigned: "📋",
    task_due: "⏰",
    mention: "@",
    message: "💬",
    milestone: "🎯",
    document: "📄",
    system: "ℹ️"
  };

  const priorityColors = {
    low: "border-border",
    medium: "border-brand/30",
    high: "border-yellow-500/30"
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

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
                <h1 className="text-xl font-extrabold tracking-tight text-text">Notifications</h1>
                <p className="text-sm text-muted">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : "All caught up!"}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMarkAllAsRead}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
              >
                Mark all as read
              </motion.button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-bg rounded-lg p-1 border border-border inline-flex">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === "all" ? "bg-brand text-white" : "text-muted hover:text-text"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === "unread" ? "bg-brand text-white" : "text-muted hover:text-text"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-7 pt-8">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-text mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-muted">
              {filter === "unread" 
                ? "You're all caught up!" 
                : "Notifications will appear here when you have updates"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <GlowCard 
                  className={`p-4 transition-colors cursor-pointer ${
                    !notification.read ? "bg-brand/5 border-l-4 " + priorityColors[notification.priority] : "hover:border-brand/30"
                  }`}
                  onClick={() => {
                    if (notification.link) {
                      handleMarkAsRead(notification.id);
                      router.push(notification.link);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0">
                      {notificationIcons[notification.type]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-text">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted mb-2">{notification.message}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span>{formatRelativeTime(notification.createdAt)}</span>
                        {notification.priority !== "low" && (
                          <>
                            <span>•</span>
                            <span className={`capitalize ${
                              notification.priority === "high" ? "text-yellow-400" : "text-brand"
                            }`}>
                              {notification.priority} priority
                            </span>
                          </>
                        )}
                        {notification.link && (
                          <>
                            <span>•</span>
                            <span className="text-brand">View →</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                          className="p-2 rounded hover:bg-white/5 text-muted hover:text-text"
                          title="Mark as read"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="p-2 rounded hover:bg-white/5 text-muted hover:text-red-400"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
