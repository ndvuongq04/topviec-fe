import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        component: () => import('@/layouts/admin/AdminLayout.vue'),
        // meta: { requiresAuth: true, role: 'admin' },
        children: [
            {
                path: '',
                name: 'admin-home',
                component: () => import('@/pages/admin/HomePage.vue'),
            },
        ],
    },
]