// Shared types for portal features inspired by Huly Platform

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  status: "active" | "completed" | "on-hold" | "archived";
  programIds: string[];
  assignedStaffId: string;
  profileImage?: string;
  notes?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  category: "job-readiness" | "education" | "housing" | "mental-health" | "substance-abuse" | "other";
  status: "active" | "inactive" | "planning";
  startDate: string;
  endDate?: string;
  capacity: number;
  enrolled: number;
  staffIds: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  completedDate?: string;
  order: number;
  required: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string; // user or participant ID
  assignedBy: string;
  participantId?: string;
  programId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags?: string[];
  attachments?: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: "referral" | "certificate" | "assessment" | "report" | "legal" | "medical" | "other";
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  participantId?: string;
  programId?: string;
  size: number; // bytes
  mimeType: string;
  tags?: string[];
  isConfidential: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientIds: string[];
  channelId?: string;
  threadId?: string;
  sentAt: string;
  readBy: string[];
  attachments?: Document[];
  reactions?: { emoji: string; userIds: string[] }[];
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: "public" | "private" | "program" | "staff";
  memberIds: string[];
  createdAt: string;
  createdBy: string;
  lastActivity: string;
  programId?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  views: number;
  helpful: number;
  attachments?: Document[];
}

export interface TimeEntry {
  id: string;
  userId: string;
  participantId?: string;
  programId?: string;
  activity: string;
  description?: string;
  startTime: string;
  endTime?: string;
  duration: number; // minutes
  date: string;
  billable: boolean;
  approved: boolean;
}

export interface Activity {
  id: string;
  type: "task_created" | "task_completed" | "document_uploaded" | "participant_enrolled" | "milestone_completed" | "message_sent" | "note_added";
  userId: string;
  userName: string;
  entityType: "participant" | "program" | "task" | "document" | "message";
  entityId: string;
  entityName: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  type: "task_assigned" | "task_due" | "mention" | "message" | "milestone" | "document" | "system";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export interface DashboardStats {
  totalParticipants: number;
  activeParticipants: number;
  completedPrograms: number;
  pendingTasks: number;
  upcomingMilestones: number;
  recentActivities: Activity[];
  programStats: {
    programId: string;
    programName: string;
    enrolled: number;
    completed: number;
    averageProgress: number;
  }[];
}
