export interface ResSuperAdminDashboardDTO {
  totalActiveUsers: number;
  totalActiveCompanies: number;
  totalPublishedJobs: number;
  monthlyRevenue: number;
  userGrowth: DailyUserGrowth[];
  revenueByMonth: MonthlyRevenue[];
  recentActivities: RecentAdminActivity[];
}

export interface DailyUserGrowth {
  date: string;
  candidateCount: number;
  employerCount: number;
}

export interface MonthlyRevenue {
  month: string; // YYYY-MM
  totalAmount: number;
}

export interface RecentAdminActivity {
  id: number;
  adminName: string;
  action: string;
  targetEntity: string;
  createdAt: string;
}

export interface ResContentModeratorDashboardDTO {
  pendingApprovalJobs: number;
  pendingVerifyCompanies: number;
  rejectedJobsThisMonth: number;
  moderationStats: DailyModerationStat[];
  oldestPendingJobs: OldestPendingJob[];
}

export interface DailyModerationStat {
  date: string;
  approvedCount: number;
  rejectedCount: number;
}

export interface OldestPendingJob {
  jobId: number;
  title: string;
  companyName: string;
  createdAt: string;
  waitingDays: number;
}

export interface ResSupportAdminDashboardDTO {
  pendingComplaints: number;
  pendingAppeals: number;
  restrictedEmployers: number;
  complaintsByStatus: Record<string, number>;
  urgentComplaints: UrgentComplaint[];
}

export interface UrgentComplaint {
  complaintId: number;
  reportCode: string;
  priority: 'urgent' | 'important' | 'normal';
  complaintType: string;
  companyName: string;
  waitingHours: number;
  createdAt: string;
}

export interface ResFinanceAdminDashboardDTO {
  monthlyRevenue: number;
  pendingOrders: number;
  refundRequests: number;
  revenueByMonth: MonthlyRevenue[];
  actionableOrders: ActionableOrder[];
}

export interface ActionableOrder {
  orderId: number;
  orderCode: string;
  companyName: string;
  totalAmount: number;
  status: 'PENDING' | 'REFUND_REQUESTED' | 'PAID' | 'REFUNDED' | 'CANCELLED';
  createdAt: string;
}
