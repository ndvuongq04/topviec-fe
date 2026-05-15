import type { 
  ResOwnerDashboardDTO, 
  ResManagerDashboardDTO,
  ResRecruiterDashboardDTO,
  ResViewerDashboardDTO
} from '@/types/employerDashboard.types';

export const employerDashboardService = {
  async getOwnerDashboard(): Promise<ResOwnerDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      activeJobs: 12,
      newApplicationsThisMonth: 158,
      activeMembers: 8,
      activeSubscriptions: 2,
      weeklyApplications: [
        { weekLabel: 'Tuần 1', count: 45 },
        { weekLabel: 'Tuần 2', count: 32 },
        { weekLabel: 'Tuần 3', count: 56 },
        { weekLabel: 'Tuần 4', count: 25 },
      ],
      recentJobs: [
        { jobId: 1, title: 'Frontend Developer (VueJS)', status: 'published', applicationCount: 24, createdAt: new Date().toISOString() },
        { jobId: 2, title: 'Backend Developer (Java)', status: 'interviewing', applicationCount: 15, createdAt: new Date().toISOString() },
        { jobId: 3, title: 'UI/UX Designer', status: 'published', applicationCount: 8, createdAt: new Date().toISOString() },
        { jobId: 4, title: 'QA Engineer', status: 'published', applicationCount: 12, createdAt: new Date().toISOString() },
        { jobId: 5, title: 'Project Manager', status: 'closed', applicationCount: 45, createdAt: new Date().toISOString() },
      ]
    };
  },

  async getManagerDashboard(): Promise<ResManagerDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      activeJobs: 12,
      pendingApplications: 45,
      upcomingInterviews: 8,
      applicationsByStatus: {
        pending: 45,
        seen: 30,
        cv_passed: 20,
        interviewing: 15,
        hired: 5,
        rejected: 10
      },
      pendingCandidates: Array.from({ length: 10 }, (_, i) => ({
        applicationId: i + 1,
        candidateName: `Ứng viên ${i + 1}`,
        jobTitle: 'Frontend Developer',
        status: i % 2 === 0 ? 'pending' : 'seen',
        createdAt: new Date().toISOString()
      }))
    };
  },

  async getRecruiterDashboard(): Promise<ResRecruiterDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      assignedActiveJobs: 5,
      pendingApplications: 12,
      upcomingInterviews: 3,
      applicationsByJob: [
        { jobId: 1, jobTitle: 'Frontend Developer', applicationCount: 24 },
        { jobId: 2, jobTitle: 'UI/UX Designer', applicationCount: 8 },
      ],
      pendingCandidates: Array.from({ length: 5 }, (_, i) => ({
        applicationId: i + 100,
        candidateName: `Candidate ${i + 1}`,
        jobTitle: 'Frontend Developer',
        status: 'pending',
        createdAt: new Date().toISOString()
      }))
    };
  },

  async getViewerDashboard(): Promise<ResViewerDashboardDTO> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      activeJobs: 12,
      totalApplicationsThisMonth: 158
    };
  }
};
