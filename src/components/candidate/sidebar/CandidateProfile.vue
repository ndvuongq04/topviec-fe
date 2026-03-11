<script setup lang="ts">
// SidebarProfile: Hiển thị avatar, tên, role và progress bar hoàn thiện profile
// Props: có thể truyền vào từ auth store sau này
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
</script>

<template>
  <div
    class="flex flex-col gap-4 bg-white dark:bg-surface-dark p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
  >
    <!-- Avatar + tên + role -->
    <div class="flex gap-3 items-center">
      <div
        class="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border border-slate-100 dark:border-slate-700 shrink-0"
        style="
          background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBauwug1k4YzsanpU4ayfdzX7pWz4X2mD94izZAzMDk9U46a09O4ttcwLGg4F6O5i8piR2LPJhqDT6QLkDmnOuO3znOcyh2l2yq8K3RyeBiFYb3x43fkQWuHs_thxSOMY97nRCJ23oXMk6zl3bYM8wlxQw4rBYOadovYby8hPiO0R0PqmOI-41J-6KPMXAwdvscPcXR02bxM4Sb35KTrCxqPShq3f0AxcJDmc8ccTcAUxVoWbCaQHyOp6oaF8MCPfXNNwtE2J3NDGjR&quot;);
        "
      />
      <div class="flex flex-col">
        <!-- Hiển thị email từ store tạm thời, sau này thay bằng fullName -->
        <h1
          class="text-text-main dark:text-white text-base font-bold leading-tight"
        >
          Hello, {{ authStore.user?.email?.split("@")[0] ?? "User" }}!
        </h1>
        <p class="text-text-muted dark:text-gray-400 text-xs font-normal">
          {{ authStore.userRole ?? "Candidate" }}
        </p>
      </div>
    </div>

    <!-- Progress bar hoàn thiện profile -->
    <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-1">
      <div
        class="bg-primary h-2 rounded-full transition-all duration-500"
        style="width: 70%"
      />
    </div>
    <p class="text-xs text-text-muted dark:text-gray-400">
      Hồ sơ hoàn thiện 70%
    </p>
  </div>
</template>
