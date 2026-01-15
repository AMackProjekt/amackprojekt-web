"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const stats = [
    { label: "Courses Enrolled", value: user.enrolledCourses.length, icon: "📚" },
    { label: "Lessons Completed", value: user.completedLessons.length, icon: "✅" },
    { label: "Certificates", value: "0", icon: "🏆" },
    { label: "Progress", value: "45%", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-extrabold tracking-tight text-text">
              T.O.O.L.S Inc
            </a>
            <span className="text-muted">|</span>
            <span className="text-sm text-muted">Learning Portal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button type="button" className="relative" aria-label="View notifications">
              <svg className="h-6 w-6 text-muted hover:text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-brand"></span>
            </button>
            <button
              onClick={logout}
              className="text-sm font-semibold text-muted hover:text-text transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-text">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-muted">Continue your learning journey</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-extrabold tracking-tight text-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => router.push("/portal/courses")} className="cursor-pointer">
            <GlowCard className="p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-extrabold tracking-tight text-text">My Courses</h3>
              <p className="mt-2 text-sm text-muted">Access your enrolled courses and continue learning</p>
            </GlowCard>
          </div>

          <div onClick={() => router.push("/portal/profile")} className="cursor-pointer">
            <GlowCard className="p-6">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-lg font-extrabold tracking-tight text-text">Profile Settings</h3>
              <p className="mt-2 text-sm text-muted">Manage your account and preferences</p>
            </GlowCard>
          </div>

          <GlowCard className="p-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-extrabold tracking-tight text-text">Certificates</h3>
            <p className="mt-2 text-sm text-muted">View and download your achievements</p>
          </GlowCard>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-extrabold tracking-tight text-text mb-4">
            Recent Activity
          </h2>
          <GlowCard className="p-6">
            <div className="text-center py-8 text-muted">
              <p>No recent activity yet. Start a course to see your progress here!</p>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
