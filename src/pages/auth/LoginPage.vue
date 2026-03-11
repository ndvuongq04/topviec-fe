<script setup lang="ts">
// LoginPage: xử lý UI đăng nhập, chỉ gọi store action
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import type { ReqLoginDTO } from "@/types/auth.types";

const authStore = useAuthStore();

const form = ref<ReqLoginDTO>({
  email: "",
  password: "",
});

const error = ref<string | null>(null);
const loading = ref(false);
const showPassword = ref(false);

async function handleLogin() {
  try {
    loading.value = true;
    error.value = null;
    // Store tự redirect sau khi login xong
    await authStore.login(form.value);
  } catch (err: any) {
    error.value =
      err.response?.data?.message ?? "Email hoặc mật khẩu không đúng";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">
          Đăng nhập
        </h1>
        <p class="text-sm text-gray-400 mt-1">Chào mừng bạn quay trở lại</p>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
        <!-- Error -->
        <div
          v-if="error"
          class="mb-4 px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-full"
        >
          {{ error }}
        </div>

        <div class="space-y-4">
          <!-- Email -->
          <div>
            <label
              class="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="example@email.com"
              @keyup.enter="handleLogin"
              class="w-full px-3.5 py-2.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              class="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
            >
              Mật khẩu
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                @keyup.enter="handleLogin"
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all pr-16"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {{ showPassword ? "Ẩn" : "Hiện" }}
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            @click="handleLogin"
            :disabled="loading || !form.email || !form.password"
            class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-full transition-all mt-1"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Đang đăng nhập...
            </span>
            <span v-else>Đăng nhập</span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-400 mt-5">
        Chưa có tài khoản?
        <router-link
          to="/register"
          class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Đăng ký ngay
        </router-link>
      </p>
    </div>
  </div>
</template>
