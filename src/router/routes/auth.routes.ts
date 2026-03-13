import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        // meta: { requiresGuest: true },
    },
    {
        path: '/register',
        name: 'candidate-register',
        component: () => import('@/pages/candidate/CandidateRegisterPage.vue'),
        // meta: { requiresGuest: true },
    },
    // {
    //     path: '/employer/register',
    //     name: 'employer-register',
    //     component: () => import('@/pages/employer/EmployerRegisterPage.vue'),
    //     meta: { requiresGuest: true },
    // },
    {
        path: '/verify-email',
        name: 'email-verification',
        component: () => import('@/pages/auth/EmailVerification.vue'),
    },
    {
        path: '/verify-email/callback',
        name: 'email-verify-callback',
        component: () => import('@/pages/auth/EmailVerifyCallback.vue'),
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('@/pages/auth/ResetPasswordPage.vue'),

    }
]