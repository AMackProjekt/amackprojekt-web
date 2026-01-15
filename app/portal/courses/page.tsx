"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const courses = [
  {
    id: "1",
    title: "Job Readiness Fundamentals",
    description: "Master resume building, interview skills, and workplace communication",
    lessons: 12,
    duration: "4 weeks",
    level: "Beginner",
    thumbnail: "💼",
  },
  {
    id: "2",
    title: "Financial Literacy",
    description: "Learn budgeting, saving, and financial planning essentials",
    lessons: 8,
    duration: "3 weeks",
    level: "Beginner",
    thumbnail: "💰",
  },
  {
    id: "3",
    title: "Personal Development",
    description: "Build confidence, set goals, and develop resilience",
    lessons: 10,
    duration: "5 weeks",
    level: "Intermediate",
    thumbnail: "🌱",
  },
  {
    id: "4",
    title: "Digital Skills",
    description: "Master essential computer and internet skills for the modern workplace",
    lessons: 15,
    duration: "6 weeks",
    level: "Beginner",
    thumbnail: "💻",
  },
];

export default function CoursesPage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const enrollCourse = (courseId: string) => {
    if (!user.enrolledCourses.includes(courseId)) {
      updateProfile({
        enrolledCourses: [...user.enrolledCourses, courseId],
      });
    }
    setSelectedCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />

      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-xl">
        <div className="mx-auto max-w-container px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/portal/dashboard")} className="text-brand hover:text-brand2">
              ← Back to Dashboard
            </button>
          </div>
          <button
            onClick={logout}
            className="text-sm font-semibold text-muted hover:text-text transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-text mb-2">
            Interactive Courses
          </h1>
          <p className="text-muted">Choose a course to begin your learning journey</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => {
            const isEnrolled = user.enrolledCourses.includes(course.id);
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard className="p-6 h-full flex flex-col">
                  <div className="text-5xl mb-4">{course.thumbnail}</div>
                  
                  <h3 className="text-xl font-extrabold tracking-tight text-text mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-semibold uppercase">
                      {course.level}
                    </span>
                  </div>

                  <button
                    onClick={() => enrollCourse(course.id)}
                    className={
                      isEnrolled
                        ? "w-full px-4 py-3 rounded-lg font-semibold text-sm bg-brand/20 text-brand border border-brand/30"
                        : "w-full px-4 py-3 rounded-lg font-semibold text-sm bg-gradient-to-br from-brand to-brand2 text-[#02131a] hover:shadow-glow transition-shadow"
                    }
                  >
                    {isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                  </button>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
