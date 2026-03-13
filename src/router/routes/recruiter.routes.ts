import type { RouteRecordRaw } from 'vue-router'

export const recruiterRoutes: RouteRecordRaw[] = [
  {
    path: '/recruiter',
    component: () => import('@/layouts/recruiter/RecruiterLayout.vue'),
    // meta: { requiresAuth: true, role: 'recruiter' },
    children: [
      {
        path: '',
        name: 'recruiter-dashboard',
        component: () => import('@/pages/recruiter/HomePage.vue'),
      },
    ],
  },
]