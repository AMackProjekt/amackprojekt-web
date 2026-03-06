"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { mockTasks, mockParticipants, mockPrograms } from "@/lib/data/mockPortalData";
import type { Task } from "@/lib/types/portal";

export default function TasksPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/portal/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filteredTasks = mockTasks.filter(t => {
    const matchesStatus = selectedStatus === "all" || t.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || t.priority === selectedPriority;
    return matchesStatus && matchesPriority;
  });

  const statusColors = {
    todo: "bg-border text-muted",
    "in-progress": "bg-brand/20 text-brand border-brand/30",
    review: "bg-accent/20 text-accent border-accent/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30"
  };

  const priorityColors = {
    low: "text-muted",
    medium: "text-brand",
    high: "text-yellow-400",
    urgent: "text-red-400"
  };

  const priorityIcons = {
    low: "⬇️",
    medium: "➡️",
    high: "⬆️",
    urgent: "🔥"
  };

  const getParticipant = (id: string) => mockParticipants.find(p => p.id === id);
  const getProgram = (id: string) => mockPrograms.find(p => p.id === id);

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === "todo"),
    "in-progress": filteredTasks.filter(t => t.status === "in-progress"),
    review: filteredTasks.filter(t => t.status === "review"),
    completed: filteredTasks.filter(t => t.status === "completed")
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
                <h1 className="text-xl font-extrabold tracking-tight text-text">Tasks & Milestones</h1>
                <p className="text-sm text-muted">Track participant progress and assignments</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-bg rounded-lg p-1 border border-border">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === "list" ? "bg-brand text-white" : "text-muted hover:text-text"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("board")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === "board" ? "bg-brand text-white" : "text-muted hover:text-text"
                  }`}
                >
                  Board
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
              >
                + New Task
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:border-brand/50"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg border border-border text-sm text-text focus:outline-none focus:border-brand/50"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <div className="ml-auto text-sm text-muted">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-container px-7 pt-8">
        {viewMode === "list" ? (
          /* List View */
          <div className="space-y-3">
            {filteredTasks.map((task, index) => {
              const participant = task.participantId ? getParticipant(task.participantId) : null;
              const program = task.programId ? getProgram(task.programId) : null;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedTask(task)}
                  className="cursor-pointer"
                >
                  <GlowCard 
                    className="p-4 hover:border-brand/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          checked={task.status === "completed"}
                          onChange={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded border-2 border-border bg-bg checked:bg-brand checked:border-brand cursor-pointer"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-text mb-1">{task.title}</h3>
                            <p className="text-sm text-muted">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status]}`}>
                              {task.status.replace("-", " ")}
                            </span>
                            <span className={`text-lg ${priorityColors[task.priority]}`}>
                              {priorityIcons[task.priority]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted">
                          {participant && (
                            <div className="flex items-center gap-1">
                              <span>👤</span>
                              <span>{participant.name}</span>
                            </div>
                          )}
                          {program && (
                            <div className="flex items-center gap-1">
                              <span>📚</span>
                              <span>{program.name}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <div className="flex items-center gap-1">
                              <span>📅</span>
                              <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex gap-1">
                              {task.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded bg-brand/10 text-brand">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Board View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status}>
                <div className="mb-4">
                  <h3 className="font-bold text-sm tracking-wider uppercase text-muted mb-1">
                    {status.replace("-", " ")}
                  </h3>
                  <div className="text-xs text-muted">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task, index) => {
                    const participant = task.participantId ? getParticipant(task.participantId) : null;
                    
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedTask(task)}
                        className="cursor-pointer"
                      >
                        <GlowCard 
                          className="p-3 hover:border-brand/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-sm text-text flex-1">{task.title}</h4>
                            <span className={`text-sm ${priorityColors[task.priority]}`}>
                              {priorityIcons[task.priority]}
                            </span>
                          </div>
                          
                          {participant && (
                            <div className="text-xs text-muted mb-2">
                              👤 {participant.name}
                            </div>
                          )}
                          
                          {task.dueDate && (
                            <div className="text-xs text-muted">
                              📅 {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-brand/10 text-brand">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </GlowCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTask(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full"
          >
            <GlowCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-text">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-muted hover:text-text text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[selectedTask.status]}`}>
                  {selectedTask.status.replace("-", " ")}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full bg-${selectedTask.priority === "urgent" ? "red" : selectedTask.priority === "high" ? "yellow" : "brand"}/20 ${priorityColors[selectedTask.priority]}`}>
                  {priorityIcons[selectedTask.priority]} {selectedTask.priority}
                </span>
              </div>

              <p className="text-muted mb-6">{selectedTask.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedTask.participantId && (
                  <div>
                    <div className="text-xs text-muted mb-1">Assigned To</div>
                    <div className="text-sm font-semibold text-text">
                      {getParticipant(selectedTask.participantId)?.name}
                    </div>
                  </div>
                )}
                {selectedTask.programId && (
                  <div>
                    <div className="text-xs text-muted mb-1">Program</div>
                    <div className="text-sm font-semibold text-text">
                      {getProgram(selectedTask.programId)?.name}
                    </div>
                  </div>
                )}
                {selectedTask.dueDate && (
                  <div>
                    <div className="text-xs text-muted mb-1">Due Date</div>
                    <div className="text-sm font-semibold text-text">
                      {new Date(selectedTask.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-muted mb-1">Created</div>
                  <div className="text-sm font-semibold text-text">
                    {new Date(selectedTask.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {selectedTask.tags && selectedTask.tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs text-muted mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-brand/10 text-brand">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  Edit Task
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:bg-white/5"
                >
                  Change Status
                </motion.button>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
