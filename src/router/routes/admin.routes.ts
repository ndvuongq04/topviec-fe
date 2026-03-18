import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        component: () => import('@/layouts/admin/AdminLayout.vue'),
        meta: { requiresAuth: true, role: 'ADMIN' },
        children: [
            {
                path: '',
                name: 'admin-home',
                component: () => import('@/pages/admin/HomePage.vue'),
            },
            {
                path: 'employers',
                name: 'admin-employers',
                component: () => import('@/pages/admin/EmployersPage.vue'),
            },
            {
                path: 'employers/:id',
                name: 'admin-employer-detail',
                component: () => import('@/pages/admin/EmployerDetailPage.vue'),
            },
            {
                path: 'admins',
                name: 'admin-manage-admins',
                component: () => import('@/pages/admin/AdminsPage.vue'),
            },
            {
                path: 'admins/:id',
                name: 'admin-detail',
                component: () => import('@/pages/admin/AdminDetailPage.vue'),
            },
            {
                path: 'admins/:id/edit',
                name: 'admin-edit',
                component: () => import('@/pages/admin/AdminEditPage.vue'),
            },
        ],
    },
]