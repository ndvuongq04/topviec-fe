<script setup lang="ts">
// RegisterPage: xử lý UI đăng ký, validate confirm password phía client
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import type { ReqRegisterDTO } from "@/types/auth.types";

const authStore = useAuthStore();

// Thêm confirmPassword để validate phía client, không gửi lên API
const form = ref<ReqRegisterDTO & { confirmPassword: string }>({
  email: "",
  password: "",
  confirmPassword: "",
});

const error = ref<string | null>(null);
const success = ref<string | null>(null);
const loading = ref(false);
const showPassword = ref(false);

// Computed: kiểm tra mật khẩu khớp (chỉ hiện khi đã nhập confirmPassword)
const passwordMismatch = computed(
  () =>
    form.value.confirmPassword !== "" &&
    form.value.password !== form.value.confirmPassword,
);

// Computed: disable button khi chưa đủ điều kiện
const canSubmit = computed(
  () =>
    !loading.value &&
    !passwordMismatch.value &&
    form.value.email !== "" &&
    form.value.password !== "" &&
    form.value.confirmPassword !== "",
);

async function handleRegister() {
  if (passwordMismatch.value) {
    error.value = "Mật khẩu xác nhận không khớp";
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    // Tách confirmPassword ra, chỉ gửi ReqRegisterDTO lên backend
    const { confirmPassword, ...payload } = form.value;
    await authStore.register(payload);

    // Store sẽ redirect về /login sau khi đăng ký xong
  } catch (err: any) {
    error.value =
      err.response?.data?.message ?? "Đăng ký thất bại, thử lại sau";
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
          Tạo tài khoản
        </h1>
        <p class="text-sm text-gray-400 mt-1">Điền thông tin để bắt đầu</p>
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
                placeholder="Tối thiểu 6 ký tự"
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

          <!-- Confirm Password -->
          <div>
            <label
              class="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
            >
              Xác nhận mật khẩu
            </label>
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nhập lại mật khẩu"
              :class="[
                'w-full px-3.5 py-2.5 border rounded-full text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all',
                passwordMismatch
                  ? 'border-red-300 focus:ring-red-400/30'
                  : 'border-gray-200 focus:ring-blue-500/30 focus:border-blue-400',
              ]"
            />
            <!-- Lỗi inline ngay dưới field -->
            <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1.5">
              Mật khẩu xác nhận không khớp
            </p>
          </div>

          <!-- Submit -->
          <button
            @click="handleRegister"
            :disabled="!canSubmit"
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
              Đang đăng ký...
            </span>
            <span v-else>Đăng ký</span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-400 mt-5">
        Đã có tài khoản?
        <router-link
          to="/login"
          class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Đăng nhập
        </router-link>
      </p>
    </div>
  </div>
</template>
