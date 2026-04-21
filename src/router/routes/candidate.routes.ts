import type { RouteRecordRaw } from 'vue-router'

export const candidateRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/candidate/CandidateLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/candidate/HomePage.vue'),
            },
            {
                path: 'profile',
                name: 'CandidateProfile',
                component: () => import('@/pages/candidate/ProfilePage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
            {
                path: 'applied-jobs',
                name: 'AppliedJobs',
                component: () => import('@/pages/candidate/AppliedJobsPage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
            {
                path: 'saved-jobs',
                name: 'SavedJobs',
                component: () => import('@/pages/candidate/SavedJobsPage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
            {
                path: 'search',
                name: 'JobSearch',
                component: () => import('@/pages/candidate/SearchPage.vue'),
            },
            {
                path: 'jobs/:id',
                name: 'JobDetail',
                component: () => import('@/pages/candidate/JobDetailPage.vue'),
            },
            {
                path: 'companies/:slug',
                name: 'CompanyDetail',
                component: () => import('@/pages/candidate/CompanyDetailPage.vue'),
            },
            {
                path: 'interviews',
                name: 'CandidateInterviews',
                component: () => import('@/pages/candidate/InterviewsPage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
            {
                path: 'interviews/detail/:id',
                name: 'CandidateInterviewDetail',
                component: () => import('@/pages/candidate/InterviewDetailPage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
            {
                path: 'messages',
                name: 'CandidateMessages',
                component: () => import('@/pages/candidate/MessagingPage.vue'),
                meta: { requiresAuth: true, role: 'CANDIDATE' },
            },
        ],
    },
]