<script setup lang="ts">
// JobSearchBanner: Banner gradient xanh ở đầu trang
// Bao gồm: tiêu đề, ô tìm kiếm (keyword + location + button), popular tags
import { ref } from "vue";

const keyword = ref("");
const location = ref("Ho Chi Minh City");
</script>

<template>
  <div
    class="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-8 overflow-hidden text-white shadow-xl shadow-blue-500/20"
  >
    <!-- Dot pattern background -->
    <div
      class="absolute inset-0 opacity-10 pointer-events-none"
      style="
        background-image: radial-gradient(#ffffff 1px, transparent 1px);
        background-size: 24px 24px;
      "
    />

    <!-- Decorative skew shape -->
    <div
      class="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-white to-transparent transform skew-x-12 translate-x-12"
    />

    <!-- Content -->
    <div class="relative z-10 flex flex-col gap-6 max-w-2xl">
      <!-- Title + subtitle -->
      <div class="space-y-2">
        <h1 class="text-3xl md:text-4xl font-bold leading-tight">
          Tìm việc làm mơ ước hôm nay
        </h1>
        <p class="text-blue-100 text-sm md:text-base max-w-md">
          Khám phá hàng nghìn cơ hội việc làm từ các công ty và startup hàng
          đầu. Bước ngoặt sự nghiệp của bạn bắt đầu từ đây.
        </p>
      </div>

      <!-- Search bar -->
      <div
        class="bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2"
      >
        <!-- Keyword input -->
        <div
          class="flex-1 flex items-center px-3 gap-2 border-b md:border-b-0 md:border-r border-slate-100"
        >
          <span class="material-symbols-outlined text-gray-400">search</span>
          <input
            v-model="keyword"
            class="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-sm py-2"
            placeholder="Tên việc làm, từ khóa, hoặc công ty"
            type="text"
          />
        </div>

        <!-- Location select -->
        <div class="flex-1 flex items-center px-3 gap-2">
          <span class="material-symbols-outlined text-gray-400"
            >location_on</span
          >
          <select
            v-model="location"
            class="w-full border-none focus:ring-0 text-gray-800 text-sm py-2 bg-transparent cursor-pointer"
          >
            <option>Ho Chi Minh City</option>
            <option>Hanoi</option>
            <option>Da Nang</option>
            <option>Remote</option>
          </select>
        </div>

        <!-- Search button -->
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors md:w-auto w-full"
        >
          Tìm kiếm
        </button>
      </div>

      <!-- Popular tags -->
      <div class="flex flex-wrap gap-2 text-sm text-blue-50">
        <span class="opacity-70">Phổ biến:</span>
        <a
          class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors backdrop-blur-sm"
          href="#"
        >
          UI/UX Design
        </a>
        <a
          class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors backdrop-blur-sm"
          href="#"
        >
          Marketing
        </a>
        <a
          class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors backdrop-blur-sm"
          href="#"
        >
          Frontend Dev
        </a>
      </div>
    </div>
  </div>
</template>
