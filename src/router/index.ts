// src/router/index.ts
// Cấu hình Vue Router 4: routes, beforeEach guard kiểm tra auth. Chỉ đọc Store, không gọi Service.

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ─── Candidate ───────────────────────────────────────────────
    {
      path: '/',
      component: () => import('@/layouts/candidate/CandidateLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/home/HomePage.vue'),
          // meta: { requiresAuth: true, role: 'candidate' },
        },
      ],
    },
    {
      path: '/register',
      name: 'candidate-register',
      component: () => import('@/pages/CandidateRegisterPage.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/verify-email',
      name: 'email-verification',
      component: () => import('@/pages/EmailVerification.vue'),
    },
    {
      path: '/verify-email/callback',
      name: 'email-verify-callback',
      component: () => import('@/pages/EmailVerifyCallback.vue'),
    },

    // ─── Employer ────────────────────────────────────────────────
    // {
    //   path: '/recruiter',
    //   component: () => import('@/layouts/employer/EmployerLayout.vue'),
    //   children: [
    //     {
    //       path: '',
    //       name: 'employer-home',
    //       component: () => import('@/pages/employer/HomePage.vue'),
    //       // meta: { requiresAuth: true, role: 'employer' },
    //     },
    //   ],
    // },
    // {
    //   path: '/recruiter/register',
    //   name: 'employer-register',
    //   component: () => import('@/pages/auth/employer/RegisterPage.vue'),
    //   meta: { requiresGuest: true },
    // },
    // {
    //   path: '/recruiter/login',
    //   name: 'employer-login',
    //   component: () => import('@/pages/auth/employer/LoginPage.vue'),
    //   meta: { requiresGuest: true },
    // },

    // // ─── Admin ───────────────────────────────────────────────────
    // {
    //   path: '/admin',
    //   component: () => import('@/layouts/admin/AdminLayout.vue'),
    //   // meta: { requiresAuth: true, role: 'admin' },
    //   children: [
    //     {
    //       path: '',
    //       name: 'admin-home',
    //       component: () => import('@/pages/admin/HomePage.vue'),
    //     },
    //   ],
    // },

    // ─── Fallback ────────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/error/NotFoundPage.vue'),
    },
  ],
})

// Guard chạy trước mỗi lần chuyển route
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Route yêu cầu đăng nhập mà chưa login → redirect về login, lưu lại đường dẫn để redirect sau
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Route chỉ dành cho khách mà đã login → về trang chủ
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'home' }
  }

  // TODO: kiểm tra role khi to.meta.role được bật
  // if (to.meta.role && authStore.userRole !== to.meta.role) {
  //   return { name: 'not-found' }
  // }
})

export default router