<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const authStore = useAuthStore();
const router = useRouter();

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdown() {
  isDropdownOpen.value = false;
}

// Click ra ngoài thì đóng dropdown
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

async function handleLogout() {
  closeDropdown();
  await authStore.logout();
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark px-10 py-3 shadow-sm"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2 text-primary">
      <span class="material-symbols-outlined text-3xl">work_history</span>
      <h2
        class="text-text-main dark:text-white text-xl font-bold leading-tight tracking-tight"
      >
        TopViec
      </h2>
    </div>

    <!-- Right side: nav + actions -->
    <div class="flex flex-1 justify-end gap-8 items-center">
      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-9">
        <router-link
          to="/"
          class="text-text-main dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
        >
          Tìm việc
        </router-link>
        <router-link
          to="/companies"
          class="text-text-muted dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors"
        >
          Công ty
        </router-link>
        <router-link
          to="/my-cvs"
          class="text-text-muted dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors"
        >
          CV của tôi
        </router-link>
      </nav>

      <!-- Action buttons -->
      <div class="flex gap-3 items-center">
        <!-- Post CV button -->
        <button
          class="flex items-center justify-center rounded-3xl h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-wide transition-colors shadow-lg shadow-blue-500/30"
          @click="router.push('/my-cvs')"
        >
          <span class="truncate">Đăng CV</span>
        </button>

        <!-- Notification button -->
        <button
          class="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 dark:bg-slate-800 text-text-main dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span class="material-symbols-outlined text-xl">notifications</span>
        </button>

        <!-- Avatar + dropdown -->
        <div class="relative" ref="dropdownRef">
          <!-- Avatar: click để toggle -->
          <div
            class="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-slate-200 dark:border-slate-700 cursor-pointer"
            style="
              background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuAUMf5jhzgfycMQc9RC_fwMLK5Bu4D8XAL7dymhVlIxZ1jx5E0bqG051yH_B6kjghR9qM8TnIyTzeE7CshRVIPXf4LNRlV4g9vrj87PKW4hz4gx_kq7-VLba5hLvJQNDyg4c_bwcQHMxlaYHfdausES5bNIm7a1_PouZIKdlsCRyxyJ9pmELkRb5ebQeP53_loDQVZQt44eYlxPdLRCCTYEeBPRaNt1nh0sVqlMToYfpKegdWFjxrCRhWmQMo0mI-VjpHLoAftYlYQH&quot;);
            "
            @click="toggleDropdown"
          />

          <!-- Dropdown menu -->
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-[60]"
            >
              <router-link
                to="/profile"
                class="flex items-center gap-3 px-4 py-2 text-sm text-text-main dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                @click="closeDropdown"
              >
                <span class="material-symbols-outlined text-lg opacity-70"
                  >person</span
                >
                Thông tin cá nhân
              </router-link>

              <router-link
                to="/change-password"
                class="flex items-center gap-3 px-4 py-2 text-sm text-text-main dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                @click="closeDropdown"
              >
                <span class="material-symbols-outlined text-lg opacity-70"
                  >lock</span
                >
                Đổi mật khẩu
              </router-link>

              <router-link
                to="/notification-settings"
                class="flex items-center gap-3 px-4 py-2 text-sm text-text-main dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                @click="closeDropdown"
              >
                <span class="material-symbols-outlined text-lg opacity-70"
                  >notifications_active</span
                >
                Cài đặt thông báo
              </router-link>

              <div class="h-px bg-slate-100 dark:bg-slate-800 my-1" />

              <button
                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium cursor-pointer"
                @click="handleLogout"
              >
                <span class="material-symbols-outlined text-lg">logout</span>
                Đăng xuất
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>
