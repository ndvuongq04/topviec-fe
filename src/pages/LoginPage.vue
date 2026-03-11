<script setup lang="ts">
// LoginPage: xử lý UI đăng nhập, chỉ gọi store action
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import LoginIllustration from "@/components/login/LoginIllustration.vue";
import LoginForm from "@/components/login/LoginForm.vue";

const authStore = useAuthStore();

const error = ref<string | null>(null);
const loading = ref(false);

async function handleLogin(payload: { email: string; password: string }) {
  try {
    loading.value = true;
    error.value = null;
    // Store tự redirect sau khi login xong
    await authStore.login(payload);
  } catch (err: any) {
    error.value =
      err.response?.data?.message ?? "Email hoặc mật khẩu không đúng";
  } finally {
    loading.value = false;
  }
}

function handleGoogleLogin() {
  // TODO: implement Google OAuth flow
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-background-light p-4 dark:bg-background-dark lg:p-0"
  >
    <div
      class="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900 lg:min-h-[600px]"
    >
      <!-- Left: Illustration -->
      <LoginIllustration />

      <!-- Right: Form -->
      <LoginForm
        :loading="loading"
        :error="error"
        @submit="handleLogin"
        @google-login="handleGoogleLogin"
      />
    </div>
  </div>
</template>
