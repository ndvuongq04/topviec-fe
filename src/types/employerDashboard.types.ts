export interface ResOwnerDashboardDTO {
  activeJobs: number;
  newApplicationsThisMonth: number;
  activeMembers: number;
  activeSubscriptions: number;
  weeklyApplications: WeeklyApplicationStat[];
  recentJobs: RecentJobSummary[];
}

export interface WeeklyApplicationStat {
  weekLabel: string;
  count: number;
}

export interface RecentJobSummary {
  jobId: number;
  title: string;
  status: string;
  applicationCount: number;
  createdAt: string;
}

export interface ResManagerDashboardDTO {
  activeJobs: number;
  pendingApplications: number;
  upcomingInterviews: number;
  applicationsByStatus: Record<string, number>;
  pendingCandidates: PendingCandidateDTO[];
}

export interface PendingCandidateDTO {
  applicationId: number;
  candidateName: string;
  jobTitle: string;
  status: string;
  createdAt: string;
}

export interface ResRecruiterDashboardDTO {
  assignedActiveJobs: number;
  pendingApplications: number;
  upcomingInterviews: number;
  applicationsByJob: JobApplicationCount[];
  pendingCandidates: PendingCandidateDTO[];
}

export interface JobApplicationCount {
  jobId: number;
  jobTitle: string;
  applicationCount: number;
}

export interface ResViewerDashboardDTO {
  activeJobs: number;
  totalApplicationsThisMonth: number;
}
