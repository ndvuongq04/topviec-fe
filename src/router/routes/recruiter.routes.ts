import type { RouteRecordRaw } from 'vue-router'

export const recruiterRoutes: RouteRecordRaw[] = [
  {
    path: '/recruiter',
    component: () => import('@/layouts/recruiter/RecruiterLayout.vue'),
    meta: { requiresAuth: true, role: 'EMPLOYER' },
    children: [
      {
        path: '',
        name: 'recruiter-dashboard',
        component: () => import('@/pages/recruiter/HomePage.vue'),
      },
      {
        path: 'company-profile',
        name: 'recruiter-company-profile',
        component: () => import('@/pages/recruiter/CompanyProfilePage.vue'),
      },
      {
        path: 'team',
        name: 'recruiter-team',
        component: () => import('@/pages/recruiter/TeamPage.vue'),
      },
      {
        path: 'jobs',
        name: 'recruiter-jobs',
        component: () => import('@/pages/recruiter/JobPostingsPage.vue'),
      },
      {
        path: 'jobs/create',
        name: 'recruiter-jobs-create',
        component: () => import('@/pages/recruiter/CreateJobPage.vue'),
      },
      {
        path: 'jobs/:id',
        name: 'recruiter-jobs-detail',
        component: () => import('@/pages/recruiter/JobDetailPage.vue'),
      },
      {
        path: 'jobs/:id/edit',
        name: 'recruiter-jobs-edit',
        component: () => import('@/pages/recruiter/EditJobPage.vue'),
      },
      {
        path: 'jobs/:id/applications',
        name: 'recruiter-job-applications',
        component: () => import('@/pages/recruiter/JobApplicationsPage.vue'),
      },
      {
        path: 'jobs/:id/applications/:applicationId',
        name: 'recruiter-application-detail',
        component: () => import('@/pages/recruiter/CandidateApplicationDetailPage.vue'),
      },

    ],
  },
]