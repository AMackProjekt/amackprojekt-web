// Mock data for portal features (replace with API calls in production)
import type { Participant, Program, Task, Document, Message, Channel, KnowledgeArticle, TimeEntry, Activity, Notification, DashboardStats } from "@/lib/types/portal";

export const mockParticipants: Participant[] = [
  {
    id: "p1",
    name: "James Rodriguez",
    email: "james.r@example.com",
    phone: "(555) 123-4567",
    joinDate: "2025-12-15",
    status: "active",
    programIds: ["prog1", "prog2"],
    assignedStaffId: "staff1",
    profileImage: undefined,
    notes: "Making excellent progress in job readiness program",
    tags: ["high-priority", "job-seeker"],
    customFields: { releaseDate: "2025-12-01", housingStatus: "stable" }
  },
  {
    id: "p2",
    name: "Maria Santos",
    email: "maria.s@example.com",
    phone: "(555) 234-5678",
    joinDate: "2026-01-08",
    status: "active",
    programIds: ["prog1", "prog3"],
    assignedStaffId: "staff1",
    tags: ["education", "single-parent"],
    customFields: { releaseDate: "2025-11-15", housingStatus: "temporary" }
  },
  {
    id: "p3",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    joinDate: "2025-11-20",
    status: "completed",
    programIds: ["prog1"],
    assignedStaffId: "staff2",
    notes: "Successfully completed program and secured employment",
    tags: ["success-story", "employed"],
    customFields: { releaseDate: "2025-10-01", housingStatus: "permanent", employmentStatus: "full-time" }
  },
  {
    id: "p4",
    name: "Aisha Williams",
    email: "aisha.w@example.com",
    phone: "(555) 345-6789",
    joinDate: "2026-02-01",
    status: "active",
    programIds: ["prog2", "prog4"],
    assignedStaffId: "staff1",
    tags: ["mental-health", "job-seeker"],
    customFields: { releaseDate: "2026-01-15", housingStatus: "stable" }
  }
];

export const mockPrograms: Program[] = [
  {
    id: "prog1",
    name: "Job Readiness Accelerator",
    description: "Comprehensive employment preparation program including resume building, interview skills, and job placement assistance.",
    category: "job-readiness",
    status: "active",
    startDate: "2025-12-01",
    capacity: 25,
    enrolled: 15,
    staffIds: ["staff1", "staff2"],
    milestones: [
      { id: "m1", title: "Initial Assessment", description: "Complete skills and interest assessment", completed: true, order: 1, required: true },
      { id: "m2", title: "Resume Creation", description: "Build professional resume", dueDate: "2026-03-15", completed: false, order: 2, required: true },
      { id: "m3", title: "Mock Interview", description: "Complete practice interview session", completed: false, order: 3, required: true },
      { id: "m4", title: "Job Application", description: "Apply to at least 5 positions", completed: false, order: 4, required: true },
      { id: "m5", title: "Employment Secured", description: "Obtain full or part-time employment", completed: false, order: 5, required: true }
    ]
  },
  {
    id: "prog2",
    name: "Educational Pathways",
    description: "GED preparation, college readiness, and lifelong learning opportunities.",
    category: "education",
    status: "active",
    startDate: "2025-11-15",
    capacity: 20,
    enrolled: 12,
    staffIds: ["staff1"],
    milestones: [
      { id: "m6", title: "Enrollment", description: "Complete program enrollment", completed: true, order: 1, required: true },
      { id: "m7", title: "Assessment Testing", description: "Complete baseline educational assessment", completed: true, order: 2, required: true },
      { id: "m8", title: "Study Plan", description: "Develop personalized study plan", completed: false, order: 3, required: true },
      { id: "m9", title: "GED Practice Test", description: "Complete practice GED exam", completed: false, order: 4, required: false }
    ]
  },
  {
    id: "prog3",
    name: "Housing Support Services",
    description: "Assistance with housing applications, landlord mediation, and long-term housing stability.",
    category: "housing",
    status: "active",
    startDate: "2026-01-01",
    capacity: 30,
    enrolled: 18,
    staffIds: ["staff2", "staff3"],
    milestones: [
      { id: "m10", title: "Housing Assessment", description: "Evaluate housing needs and options", completed: false, order: 1, required: true },
      { id: "m11", title: "Application Assistance", description: "Complete housing applications", completed: false, order: 2, required: true },
      { id: "m12", title: "Placement", description: "Secure stable housing", completed: false, order: 3, required: true }
    ]
  },
  {
    id: "prog4",
    name: "Mental Health & Wellness",
    description: "Counseling, support groups, and mental health resources for successful reentry.",
    category: "mental-health",
    status: "active",
    startDate: "2025-12-10",
    capacity: 15,
    enrolled: 8,
    staffIds: ["staff3"],
    milestones: [
      { id: "m13", title: "Initial Consultation", description: "Meet with mental health professional", completed: false, order: 1, required: true },
      { id: "m14", title: "Treatment Plan", description: "Develop personalized treatment approach", completed: false, order: 2, required: true },
      { id: "m15", title: "Support Group", description: "Attend at least 4 group sessions", completed: false, order: 3, required: false }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Complete Resume Revision",
    description: "Review and update resume with recent work experience",
    status: "in-progress",
    priority: "high",
    assignedTo: "p1",
    assignedBy: "staff1",
    participantId: "p1",
    programId: "prog1",
    dueDate: "2026-03-10",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-03T14:30:00Z",
    tags: ["employment", "documentation"]
  },
  {
    id: "t2",
    title: "Schedule Mock Interview",
    description: "Set up practice interview session with staff member",
    status: "todo",
    priority: "medium",
    assignedTo: "p1",
    assignedBy: "staff1",
    participantId: "p1",
    programId: "prog1",
    dueDate: "2026-03-15",
    createdAt: "2026-03-02T09:00:00Z",
    updatedAt: "2026-03-02T09:00:00Z",
    tags: ["employment", "training"]
  },
  {
    id: "t3",
    title: "GED Math Practice Test",
    description: "Complete online math practice test and review results",
    status: "todo",
    priority: "high",
    assignedTo: "p2",
    assignedBy: "staff1",
    participantId: "p2",
    programId: "prog2",
    dueDate: "2026-03-08",
    createdAt: "2026-03-01T11:00:00Z",
    updatedAt: "2026-03-01T11:00:00Z",
    tags: ["education", "assessment"]
  },
  {
    id: "t4",
    title: "Submit Housing Application",
    description: "Complete and submit application for transitional housing program",
    status: "review",
    priority: "urgent",
    assignedTo: "p4",
    assignedBy: "staff2",
    participantId: "p4",
    programId: "prog3",
    dueDate: "2026-03-05",
    createdAt: "2026-02-28T13:00:00Z",
    updatedAt: "2026-03-04T10:00:00Z",
    tags: ["housing", "application"]
  },
  {
    id: "t5",
    title: "Attend Job Fair",
    description: "Participate in community job fair at workforce center",
    status: "completed",
    priority: "medium",
    assignedTo: "p1",
    assignedBy: "staff1",
    participantId: "p1",
    programId: "prog1",
    dueDate: "2026-03-03",
    createdAt: "2026-02-25T10:00:00Z",
    updatedAt: "2026-03-03T16:00:00Z",
    completedAt: "2026-03-03T16:00:00Z",
    tags: ["employment", "networking"]
  }
];

export const mockDocuments: Document[] = [
  {
    id: "d1",
    name: "Referral Form - James Rodriguez.pdf",
    type: "referral",
    url: "/documents/referral-james-r.pdf",
    uploadedBy: "staff1",
    uploadedAt: "2025-12-15T09:00:00Z",
    participantId: "p1",
    size: 245000,
    mimeType: "application/pdf",
    tags: ["intake", "2025"],
    isConfidential: true
  },
  {
    id: "d2",
    name: "Job Readiness Certificate.pdf",
    type: "certificate",
    url: "/documents/cert-marcus-j.pdf",
    uploadedBy: "staff1",
    uploadedAt: "2026-02-20T14:30:00Z",
    participantId: "p3",
    programId: "prog1",
    size: 180000,
    mimeType: "application/pdf",
    tags: ["certificate", "completed"],
    isConfidential: false
  },
  {
    id: "d3",
    name: "Skills Assessment Report.pdf",
    type: "assessment",
    url: "/documents/assessment-maria-s.pdf",
    uploadedBy: "staff1",
    uploadedAt: "2026-01-10T11:00:00Z",
    participantId: "p2",
    programId: "prog2",
    size: 320000,
    mimeType: "application/pdf",
    tags: ["education", "assessment"],
    isConfidential: true
  }
];

export const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "General Staff",
    description: "General discussion for all staff members",
    type: "staff",
    memberIds: ["staff1", "staff2", "staff3"],
    createdAt: "2025-11-01T00:00:00Z",
    createdBy: "staff1",
    lastActivity: "2026-03-04T09:30:00Z"
  },
  {
    id: "ch2",
    name: "Job Readiness Team",
    description: "Coordination for job readiness program",
    type: "program",
    memberIds: ["staff1", "staff2", "p1", "p3"],
    createdAt: "2025-12-01T00:00:00Z",
    createdBy: "staff1",
    lastActivity: "2026-03-03T15:00:00Z",
    programId: "prog1"
  },
  {
    id: "ch3",
    name: "Success Stories",
    description: "Share participant successes and celebrate wins",
    type: "public",
    memberIds: ["staff1", "staff2", "staff3"],
    createdAt: "2025-11-15T00:00:00Z",
    createdBy: "staff2",
    lastActivity: "2026-03-02T11:00:00Z"
  }
];

export const mockMessages: Message[] = [
  {
    id: "msg1",
    content: "Great job on the resume, James! Let's schedule your mock interview for next week.",
    senderId: "staff1",
    senderName: "Sarah Johnson",
    recipientIds: ["p1"],
    channelId: "ch2",
    sentAt: "2026-03-03T15:00:00Z",
    readBy: ["staff1", "p1"],
    reactions: [{ emoji: "👍", userIds: ["p1"] }]
  },
  {
    id: "msg2",
    content: "Reminder: Job fair tomorrow at 10 AM. Looking forward to seeing everyone there!",
    senderId: "staff1",
    senderName: "Sarah Johnson",
    recipientIds: ["staff2", "p1", "p3"],
    channelId: "ch2",
    sentAt: "2026-03-02T16:00:00Z",
    readBy: ["staff1", "staff2", "p1", "p3"]
  }
];

export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: "ka1",
    title: "How to Prepare for Your First Job Interview",
    content: "# Interview Preparation Guide\n\nPreparing for a job interview can be nerve-wracking, but with the right preparation, you can feel confident...",
    category: "Employment",
    tags: ["interview", "job-search", "career"],
    authorId: "staff1",
    createdAt: "2025-12-05T10:00:00Z",
    updatedAt: "2026-01-15T14:00:00Z",
    published: true,
    views: 127,
    helpful: 45
  },
  {
    id: "ka2",
    title: "Understanding Your Rights as a Tenant",
    content: "# Tenant Rights Guide\n\nKnowing your rights as a tenant is crucial for maintaining stable housing...",
    category: "Housing",
    tags: ["housing", "legal", "rights"],
    authorId: "staff2",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-02-01T11:00:00Z",
    published: true,
    views: 89,
    helpful: 32
  },
  {
    id: "ka3",
    title: "GED Study Tips and Resources",
    content: "# GED Success Guide\n\nEarning your GED opens doors to better employment and educational opportunities...",
    category: "Education",
    tags: ["education", "GED", "study-tips"],
    authorId: "staff1",
    createdAt: "2025-11-20T13:00:00Z",
    updatedAt: "2025-12-10T10:00:00Z",
    published: true,
    views: 203,
    helpful: 78
  }
];

export const mockTimeEntries: TimeEntry[] = [
  {
    id: "te1",
    userId: "staff1",
    participantId: "p1",
    programId: "prog1",
    activity: "Resume Review Session",
    description: "One-on-one session reviewing and updating resume",
    startTime: "2026-03-03T14:00:00Z",
    endTime: "2026-03-03T15:30:00Z",
    duration: 90,
    date: "2026-03-03",
    billable: true,
    approved: true
  },
  {
    id: "te2",
    userId: "staff1",
    participantId: "p2",
    programId: "prog2",
    activity: "Educational Assessment",
    description: "Initial educational level assessment and goal setting",
    startTime: "2026-03-02T10:00:00Z",
    endTime: "2026-03-02T11:45:00Z",
    duration: 105,
    date: "2026-03-02",
    billable: true,
    approved: true
  },
  {
    id: "te3",
    userId: "staff2",
    activity: "Team Meeting",
    description: "Weekly staff coordination meeting",
    startTime: "2026-03-04T09:00:00Z",
    endTime: "2026-03-04T10:00:00Z",
    duration: 60,
    date: "2026-03-04",
    billable: false,
    approved: false
  }
];

export const mockActivities: Activity[] = [
  {
    id: "a1",
    type: "task_completed",
    userId: "p1",
    userName: "James Rodriguez",
    entityType: "task",
    entityId: "t5",
    entityName: "Attend Job Fair",
    description: "completed task",
    timestamp: "2026-03-03T16:00:00Z"
  },
  {
    id: "a2",
    type: "document_uploaded",
    userId: "staff1",
    userName: "Sarah Johnson",
    entityType: "document",
    entityId: "d3",
    entityName: "Skills Assessment Report",
    description: "uploaded document for Maria Santos",
    timestamp: "2026-01-10T11:00:00Z"
  },
  {
    id: "a3",
    type: "milestone_completed",
    userId: "p1",
    userName: "James Rodriguez",
    entityType: "participant",
    entityId: "p1",
    entityName: "Initial Assessment",
    description: "completed milestone in Job Readiness Accelerator",
    timestamp: "2025-12-20T14:00:00Z"
  },
  {
    id: "a4",
    type: "participant_enrolled",
    userId: "staff1",
    userName: "Sarah Johnson",
    entityType: "participant",
    entityId: "p4",
    entityName: "Aisha Williams",
    description: "enrolled in Mental Health & Wellness program",
    timestamp: "2026-02-01T10:00:00Z"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "p1",
    type: "task_due",
    title: "Task Due Soon",
    message: "Complete Resume Revision is due in 6 days",
    link: "/portal/tasks",
    read: false,
    createdAt: "2026-03-04T08:00:00Z",
    priority: "medium"
  },
  {
    id: "n2",
    userId: "p1",
    type: "message",
    title: "New Message",
    message: "Sarah Johnson sent you a message in Job Readiness Team",
    link: "/portal/messages",
    read: false,
    createdAt: "2026-03-03T15:00:00Z",
    priority: "low"
  },
  {
    id: "n3",
    userId: "staff1",
    type: "task_assigned",
    title: "Task Review Needed",
    message: "Aisha Williams submitted Housing Application for review",
    link: "/portal/tasks",
    read: true,
    createdAt: "2026-03-04T10:00:00Z",
    priority: "high"
  }
];

export const mockDashboardStats: DashboardStats = {
  totalParticipants: 42,
  activeParticipants: 35,
  completedPrograms: 18,
  pendingTasks: 23,
  upcomingMilestones: 12,
  recentActivities: mockActivities.slice(0, 5),
  programStats: [
    {
      programId: "prog1",
      programName: "Job Readiness Accelerator",
      enrolled: 15,
      completed: 8,
      averageProgress: 68
    },
    {
      programId: "prog2",
      programName: "Educational Pathways",
      enrolled: 12,
      completed: 5,
      averageProgress: 52
    },
    {
      programId: "prog3",
      programName: "Housing Support Services",
      enrolled: 18,
      completed: 3,
      averageProgress: 45
    },
    {
      programId: "prog4",
      programName: "Mental Health & Wellness",
      enrolled: 8,
      completed: 2,
      averageProgress: 71
    }
  ]
};
