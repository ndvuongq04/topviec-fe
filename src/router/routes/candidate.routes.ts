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
                path: 'jobs/:id',
                name: 'JobDetail',
                component: () => import('@/pages/candidate/JobDetailPage.vue'),
            },
            {
                path: 'companies/:slug',
                name: 'CompanyDetail',
                component: () => import('@/pages/candidate/CompanyDetailPage.vue'),
            },
        ],
    },
]