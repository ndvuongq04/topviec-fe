<script setup lang="ts">
// JobList: Grid hiển thị danh sách JobCard
// Bao gồm: tiêu đề section + link "View All" + grid responsive
import { onMounted, computed } from "vue";
import JobCard from "@/components/candidate/job/JobCard.vue";
import { usePublicJobPostingStore } from "@/stores/publicJobPosting.store";

const jobStore = usePublicJobPostingStore();

// Map dữ liệu từ API sang JobCardProps
const mappedJobs = computed(() => {
  return jobStore.jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company.name,
    logoUrl: job.company.logoUrl || "https://via.placeholder.com/150",
    logoBg: "bg-blue-50", // Mặc định hoặc random theo ID
    logoBorder: "border-blue-100",
    tags: [job.workType, job.level.name],
    salaryMin: job.salaryNegotiable
      ? "Thỏa thuận"
      : `$${job.salaryMin?.toLocaleString()}`,
    salaryMax: job.salaryNegotiable ? "" : `$${job.salaryMax?.toLocaleString()}`,
    location: "Vietnam", // Summary chưa có location, tạm để fix
    postedAt: formatDate(job.publishedAt || job.createdAt),
    isHot: job.isFeatured || job.isUrgent,
  }));
});

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Just now";
  if (diffInDays === 1) return "Yesterday";
  return `${diffInDays} days ago`;
}

onMounted(async () => {
  // Lấy danh sách tin mới nhất cho phần "Gợi ý cho bạn"
  await jobStore.fetchJobs({ size: 6 });
});

function handleBookmark(id: number) {
  // TODO: gọi store action để lưu job
  console.log("Bookmark job:", id);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Header section -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-text-main dark:text-white">
        Gợi ý cho bạn
      </h2>
      <a
        class="text-primary text-sm font-semibold hover:underline flex items-center gap-1"
        href="#"
      >
        Xem tất cả
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </div>

    <!-- Grid job cards: 1 cột mobile, 2 cột tablet, 3 cột desktop -->
    <div
      v-if="jobStore.loading"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
      ></div>
    </div>

    <div
      v-else-if="mappedJobs.length === 0"
      class="py-12 text-center text-text-muted"
    >
      Chưa có tin tuyển dụng nào phù hợp.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <JobCard
        v-for="job in mappedJobs"
        :key="job.id"
        v-bind="job"
        @bookmark="handleBookmark"
      />
    </div>
  </div>
</template>
