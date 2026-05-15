import type { 
  ResSuperAdminDashboardDTO, 
  ResContentModeratorDashboardDTO,
  ResSupportAdminDashboardDTO,
  ResFinanceAdminDashboardDTO
} from '@/types/dashboard.types';

// Helper to generate mock dates
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const adminDashboardService = {
  async getSuperAdminDashboard(): Promise<ResSuperAdminDashboardDTO> {
    // Mocking API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      totalActiveUsers: 58420,
      totalActiveCompanies: 1250,
      totalPublishedJobs: 3450,
      monthlyRevenue: 1250000000,
      userGrowth: Array.from({ length: 30 }, (_, i) => ({
        date: getPastDate(29 - i),
        candidateCount: Math.floor(Math.random() * 100) + 200,
        employerCount: Math.floor(Math.random() * 20) + 10,
      })),
      revenueByMonth: [
        { month: '2025-12', totalAmount: 980000000 },
        { month: '2026-01', totalAmount: 1100000000 },
        { month: '2026-02', totalAmount: 1050000000 },
        { month: '2026-03', totalAmount: 1300000000 },
        { month: '2026-04', totalAmount: 1200000000 },
        { month: '2026-05', totalAmount: 1250000000 },
      ],
      recentActivities: [
        { id: 1, adminName: 'Nguyễn Văn A', action: 'Duyệt tin', targetEntity: 'Frontend Developer - FPT', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 2, adminName: 'Trần Thị B', action: 'Khóa công ty', targetEntity: 'Công ty ABC', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 3, adminName: 'Lê Văn C', action: 'Hoàn tiền', targetEntity: 'Order #ORD-123', createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
        { id: 4, adminName: 'Phạm Minh D', action: 'Duyệt xác thực', targetEntity: 'Vingroup JSC', createdAt: new Date(Date.now() - 1000 * 3600 * 5).toISOString() },
        { id: 5, adminName: 'Nguyễn Văn A', action: 'Xóa bình luận', targetEntity: 'Review công ty X', createdAt: new Date(Date.now() - 1000 * 3600 * 24).toISOString() },
      ]
    };
  },

  async getContentModeratorDashboard(): Promise<ResContentModeratorDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      pendingApprovalJobs: 45,
      pendingVerifyCompanies: 12,
      rejectedJobsThisMonth: 128,
      moderationStats: Array.from({ length: 7 }, (_, i) => ({
        date: getPastDate(6 - i),
        approvedCount: Math.floor(Math.random() * 50) + 30,
        rejectedCount: Math.floor(Math.random() * 15) + 5,
      })),
      oldestPendingJobs: [
        { jobId: 101, title: 'Senior Backend Developer', companyName: 'Techcombank', createdAt: getPastDate(3), waitingDays: 3 },
        { jobId: 102, title: 'Project Manager', companyName: 'Momo', createdAt: getPastDate(2), waitingDays: 2 },
        { jobId: 103, title: 'AI Engineer', companyName: 'VNG', createdAt: getPastDate(2), waitingDays: 2 },
      ]
    };
  },

  async getSupportAdminDashboard(): Promise<ResSupportAdminDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      pendingComplaints: 24,
      pendingAppeals: 5,
      restrictedEmployers: 8,
      complaintsByStatus: {
        pending: 12,
        processing: 8,
        waiting_employer: 5,
        resolved: 45,
        rejected: 3,
        auto_closed: 7
      },
      urgentComplaints: [
        { complaintId: 1, reportCode: 'CP-8821', priority: 'urgent', complaintType: 'Lừa đảo', companyName: 'Công ty Ma', waitingHours: 5, createdAt: new Date().toISOString() },
        { complaintId: 2, reportCode: 'CP-8825', priority: 'important', complaintType: 'Nội dung phản cảm', companyName: 'Shop X', waitingHours: 12, createdAt: new Date().toISOString() },
      ]
    };
  },

  async getFinanceAdminDashboard(): Promise<ResFinanceAdminDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      monthlyRevenue: 1250000000,
      pendingOrders: 15,
      refundRequests: 3,
      revenueByMonth: [
        { month: '2025-12', totalAmount: 980000000 },
        { month: '2026-01', totalAmount: 1100000000 },
        { month: '2026-02', totalAmount: 1050000000 },
        { month: '2026-03', totalAmount: 1300000000 },
        { month: '2026-04', totalAmount: 1200000000 },
        { month: '2026-05', totalAmount: 1250000000 },
      ],
      actionableOrders: [
        { orderId: 1, orderCode: 'ORD-5521', companyName: 'FPT Software', totalAmount: 5000000, status: 'PENDING', createdAt: getPastDate(1) },
        { orderId: 2, orderCode: 'ORD-5525', companyName: 'Vingroup', totalAmount: 15000000, status: 'REFUND_REQUESTED', createdAt: getPastDate(0) },
      ]
    };
  }
};
