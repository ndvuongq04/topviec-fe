// src/router/guards.ts
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export function setupGuards(router: Router) {
    router.beforeEach((to) => {
        const authStore = useAuthStore()

        if (to.meta.requiresAuth && !authStore.isAuthenticated) {
            return { name: 'login', query: { redirect: to.fullPath } }
        }

        // check quyền nếu trang yêu cầu guest nhưng user đã đăng nhập thì chuyển hướng về trang home tương ứng với role
        // if (to.meta.requiresGuest && authStore.isAuthenticated) {
        //     const roleHome: Record<string, string> = {
        //         admin: 'admin-home',
        //         employer: 'employer-dashboard',
        //         candidate: 'home',
        //     }
        //     const role = authStore.userRole ?? 'candidate'
        //     return { name: roleHome[role] ?? 'home' }
        // }

        // if (to.meta.role && authStore.userRole !== to.meta.role) {
        //     return { name: 'not-found' }
        // }
    })
}