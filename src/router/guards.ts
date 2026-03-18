// src/router/guards.ts
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export function setupGuards(router: Router) {
    router.beforeEach((to) => {
        const authStore = useAuthStore()

        // 1. Check Auth
        if (to.meta.requiresAuth && !authStore.isAuthenticated) {
            return { name: 'login', query: { redirect: to.fullPath } }
        }

        // 2. Check Guest (Redirect if already logged in)
        if (to.meta.requiresGuest && authStore.isAuthenticated) {
            const roleHome: Record<string, string> = {
                ADMIN: 'admin-home',
                EMPLOYER: 'recruiter-dashboard',
                CANDIDATE: 'home',
            }
            const role = authStore.userRole ?? 'CANDIDATE'
            return { name: roleHome[role] ?? 'home' }
        }

        // 3. Check Role Permission
        if (to.meta.role && authStore.isAuthenticated && authStore.userRole !== to.meta.role) {
            return { name: 'forbidden' }
        }
    })
}