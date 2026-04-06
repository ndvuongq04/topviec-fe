<script setup lang="ts">
import { ref } from "vue";
import BannerSelect from "./BannerSelect.vue";

const keyword = ref("");
const location = ref<string | null>(null);
const industry = ref<string | null>(null);

// Filter States
const timeFilter = ref<string | null>(null);
const typeFilter = ref<string | null>(null);
const salaryFilter = ref<string | null>(null);
const levelFilter = ref<string | null>(null);
const experienceFilter = ref<string | null>(null);

// Hardcoded Options
const locations = [
  { id: "hcm", name: "TP. Hồ Chí Minh" },
  { id: "hn", name: "Hà Nội" },
  { id: "dn", name: "Đà Nẵng" },
  { id: "remote", name: "Làm việc từ xa" },
  { id: "other", name: "Tỉnh thành khác" },
];

const industries = [
  { id: "it", name: "IT / Phần mềm" },
  { id: "marketing", name: "Marketing" },
  { id: "design", name: "Thiết kế / UI/UX" },
  { id: "sales", name: "Kinh doanh / Bán hàng" },
  { id: "finance", name: "Tài chính / Kế toán" },
  { id: "hr", name: "Nhân sự / HR" },
  { id: "education", name: "Giáo dục / Đào tạo" },
  { id: "healthcare", name: "Y tế / Sức khỏe" },
];

const times = [
  { id: "24h", name: "24 giờ qua" },
  { id: "3d", name: "3 ngày qua" },
  { id: "1w", name: "1 tuần qua" },
  { id: "2w", name: "2 tuần qua" },
  { id: "1m", name: "1 tháng qua" },
];

const types = [
  { id: "fulltime", name: "Toàn thời gian" },
  { id: "parttime", name: "Bán thời gian" },
  { id: "internship", name: "Thực tập" },
  { id: "remote", name: "Làm việc từ xa" },
  { id: "freelance", name: "Freelance" },
];

const salaries = [
  { id: "1", name: "Dưới 5 triệu" },
  { id: "2", name: "5 - 10 triệu" },
  { id: "3", name: "10 - 20 triệu" },
  { id: "4", name: "20 - 30 triệu" },
  { id: "5", name: "30 - 50 triệu" },
  { id: "6", name: "Trên 50 triệu" },
  { id: "7", name: "Thỏa thuận" },
];

const levels = [
  { id: "intern", name: "Thực tập sinh" },
  { id: "fresher", name: "Mới tốt nghiệp" },
  { id: "junior", name: "Nhân viên" },
  { id: "senior", name: "Trưởng nhóm / Senior" },
  { id: "manager", name: "Trưởng phòng / Manager" },
  { id: "director", name: "Giám đốc / Director" },
];

const experiences = [
  { id: "0", name: "Chưa có kinh nghiệm" },
  { id: "1", name: "Dưới 1 năm" },
  { id: "1-3", name: "1 - 3 năm" },
  { id: "3-5", name: "3 - 5 năm" },
  { id: "5+", name: "Trên 5 năm" },
];

// Computed: has any active filter?
const hasActiveFilters = () =>
  timeFilter.value || typeFilter.value || salaryFilter.value ||
  levelFilter.value || experienceFilter.value;

function clearFilters() {
  timeFilter.value = null;
  typeFilter.value = null;
  salaryFilter.value = null;
  levelFilter.value = null;
  experienceFilter.value = null;
}
</script>

<template>
  <div class="space-y-4">
    <div class="bg-white p-2 rounded-xl shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center gap-1">
      <!-- Keyword -->
      <div class="flex-1 flex items-center px-3 gap-2 py-1 lg:border-r border-slate-100">
        <span class="material-symbols-outlined text-gray-400">search</span>
        <input
          v-model="keyword"
          class="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-base py-2"
          placeholder="Tên công việc, vị trí hoặc công ty..."
          type="text"
        />
      </div>

      <!-- Location -->
      <div class="flex-1 lg:max-w-[240px] flex items-center px-3 gap-1 py-1 lg:border-r border-slate-100">
        <span class="material-symbols-outlined text-gray-400 text-[20px] shrink-0">location_on</span>
        <BannerSelect
          v-model="location"
          :options="locations"
          placeholder="Địa điểm"
          variant="bar"
          class="flex-1"
        />
      </div>

      <!-- Industry -->
      <div class="flex-1 lg:max-w-[240px] flex items-center px-3 gap-1 py-1">
        <span class="material-symbols-outlined text-gray-400 text-[20px] shrink-0">work</span>
        <BannerSelect
          v-model="industry"
          :options="industries"
          placeholder="Ngành nghề"
          variant="bar"
          class="flex-1"
        />
      </div>

      <!-- Search Button -->
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all transform active:scale-95 shadow-md uppercase text-base tracking-wide"
      >
        Tìm việc
      </button>
    </div>

    <!-- Advanced Filter Pills (BannerSelect with search) -->
    <div class="flex flex-wrap items-center gap-2">
      <BannerSelect
        v-model="timeFilter"
        :options="times"
        placeholder="Thời gian"
      />
      <BannerSelect
        v-model="typeFilter"
        :options="types"
        placeholder="Loại hình"
      />
      <BannerSelect
        v-model="salaryFilter"
        :options="salaries"
        placeholder="Mức lương"
      />
      <BannerSelect
        v-model="levelFilter"
        :options="levels"
        placeholder="Cấp bậc"
      />
      <BannerSelect
        v-model="experienceFilter"
        :options="experiences"
        placeholder="Kinh nghiệm"
      />

      <!-- Clear all filters -->
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <button
          v-if="hasActiveFilters()"
          class="flex items-center gap-1.5 px-3 py-2 rounded-full border border-red-300/40 bg-red-500/15 hover:bg-red-500/25 text-red-100 text-sm font-medium transition-all active:scale-95"
          @click="clearFilters"
        >
          <span class="material-symbols-outlined text-[14px]">close</span>
          Xóa lọc
        </button>
        <button
          v-else
          class="ml-auto px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-sm font-medium transition-all active:scale-95 text-white/80"
        >
          Xóa lọc
        </button>
      </Transition>
    </div>
  </div>
</template>
