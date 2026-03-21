<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useCandidateCompanyFollowStore } from "@/stores/candidateCompanyFollow.store";
import { useToast } from "@/composables/useToast";

const followStore = useCandidateCompanyFollowStore();
const toast = useToast();

interface Props {
  id: number | string;
}
const props = defineProps<Props>();

// Hardcode data - sẽ thay bằng API sau
const job = {
  id: props.id,
  title: "Senior UX/UI Designer",
  companyName: "Google",
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
  location: "Mountain View, CA",
  postedAt: "2 ngày trước",
  type: "Toàn thời gian",
  workMode: "Tại văn phòng",
  salaryRange: "$120k - $150k / năm",
  level: "Senior Level",
  description: `<p>Chúng tôi đang tìm kiếm một <strong>Senior UX/UI Designer</strong> tài năng để gia nhập đội ngũ tại Google. Bạn sẽ chịu trách nhiệm tạo ra các thiết kế lấy người dùng làm trung tâm cho bộ công cụ năng suất mới của chúng tôi.</p>
<p>Bạn sẽ phối hợp chặt chẽ với các nhà quản lý sản phẩm, kỹ sư và các nhà thiết kế khác để cung cấp sản phẩm chất lượng cao, đáp ứng nhu cầu người dùng và mục tiêu kinh doanh.</p>
<p>Trong vai trò này, bạn sẽ dẫn dắt quy trình thiết kế từ khái niệm đến ra mắt. Bạn sẽ thực hiện nghiên cứu người dùng, tạo wireframe, prototype và thiết kế giao diện độ trung thực cao.</p>`,
  responsibilities: [
    "Dẫn dắt thiết kế các tính năng lớn và sáng kiến sản phẩm từ khái niệm đến ra mắt.",
    "Thực hiện nghiên cứu người dùng và kiểm tra khả năng sử dụng để đưa ra quyết định thiết kế.",
    "Tạo wireframe, prototype và thiết kế hình ảnh độ chính xác cao.",
    "Phối hợp với bộ phận kỹ thuật để đảm bảo triển khai chất lượng cao.",
    "Hướng dẫn các nhà thiết kế junior và đóng góp vào văn hóa thiết kế.",
  ],
  requirements: [
    "5+ năm kinh nghiệm thiết kế UX/UI cho ứng dụng web và di động.",
    "Portfolio mạnh thể hiện quy trình thiết kế và kỹ năng giải quyết vấn đề.",
    "Thành thạo Figma, Sketch hoặc Adobe XD.",
    "Kinh nghiệm làm việc với design system.",
    "Kỹ năng giao tiếp và cộng tác xuất sắc.",
  ],
  benefits: [
    {
      icon: "health_and_safety",
      colorBg: "bg-blue-100",
      colorText: "text-blue-600",
      title: "Bảo hiểm sức khỏe",
      desc: "Bảo hiểm toàn diện",
    },
    {
      icon: "savings",
      colorBg: "bg-green-100",
      colorText: "text-green-600",
      title: "401(k) Matching",
      desc: "Đóng góp lên đến 5%",
    },
    {
      icon: "flight_takeoff",
      colorBg: "bg-purple-100",
      colorText: "text-purple-600",
      title: "Nghỉ phép linh hoạt",
      desc: "Không giới hạn ngày phép",
    },
    {
      icon: "lunch_dining",
      colorBg: "bg-orange-100",
      colorText: "text-orange-600",
      title: "Bữa ăn miễn phí",
      desc: "Phục vụ bữa ăn hàng ngày",
    },
  ],
  similarJobs: [
    {
      id: 10,
      title: "Product Designer",
      company: "Airbnb",
      location: "San Francisco, CA",
      salary: "$130k - $160k",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png",
    },
    {
      id: 11,
      title: "Senior UI Designer",
      company: "Spotify",
      location: "New York, NY",
      salary: "$115k - $145k",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png",
    },
    {
      id: 12,
      title: "UX Researcher",
      company: "Slack",
      location: "Remote",
      salary: "$110k - $140k",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
    },
    {
      id: 13,
      title: "Lead Product Designer",
      company: "Notion",
      location: "San Francisco, CA",
      salary: "$150k - $190k",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    },
  ],
  company: {
    id: 1,
    name: "Google",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    industry: "Công nghệ",
    size: "10,000+ nhân viên",
    headquarters: "Mountain View, CA",
    founded: "1998",
  },
};

const isSaved = ref(false);

function toggleSave() {
  isSaved.value = !isSaved.value;
}

onMounted(() => {
  if (job.company.id) {
    followStore.checkFollowStatus(job.company.id);
  }
});

const isCompanyFollowing = computed(() => {
  return followStore.followMap[job.company.id] || false;
});

async function toggleCompanyFollow() {
  try {
    if (isCompanyFollowing.value) {
      await followStore.unfollowCompany(job.company.id);
      toast.success("Đã bỏ theo dõi công ty");
    } else {
      await followStore.followCompany(job.company.id);
      toast.success("Đã theo dõi công ty");
    }
  } catch (err) {
    toast.error(followStore.error || "Thao tác thất bại");
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 pb-16 lg:pb-0">
    <!-- Breadcrumbs -->
    <nav class="flex flex-wrap gap-1.5 items-center text-sm">
      <RouterLink
        to="/"
        class="text-text-secondary hover:text-primary transition-colors"
        >Trang chủ</RouterLink
      >
      <span class="text-slate-300 material-symbols-outlined text-base"
        >chevron_right</span
      >
      <span class="text-text-secondary">Việc làm</span>
      <span class="text-slate-300 material-symbols-outlined text-base"
        >chevron_right</span
      >
      <span class="text-text-secondary">Thiết kế</span>
      <span class="text-slate-300 material-symbols-outlined text-base"
        >chevron_right</span
      >
      <span class="text-primary font-medium">{{ job.title }}</span>
    </nav>

    <!-- Header Card -->
    <div
      class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden"
    >
      <!-- Decorative gradient -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none"
      />

      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10"
      >
        <!-- Company + Title -->
        <div class="flex gap-5 items-start">
          <div
            class="w-20 h-20 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-3 shrink-0"
          >
            <img
              :alt="job.companyName"
              :src="job.logoUrl"
              class="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 class="text-text-main text-2xl md:text-3xl font-bold leading-tight mb-2">
              {{ job.title }}
            </h1>
            <div
              class="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-text-secondary text-sm md:text-base"
            >
              <span class="font-semibold text-text-main">{{ job.company.name ?? job.companyName }}</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[18px]">location_on</span>
                {{ job.location }}
              </div>
              <span class="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[18px]">schedule</span>
                {{ job.postedAt }}
              </div>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 w-full md:w-auto shrink-0">
          <button
            class="flex-1 md:flex-none h-12 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-text-main font-bold flex items-center justify-center gap-2 transition-all"
            :class="{ 'border-primary text-primary bg-primary/5': isSaved }"
            @click="toggleSave"
          >
            <span class="material-symbols-outlined" :style="isSaved ? 'font-variation-settings: \'FILL\' 1' : ''">bookmark</span>
            <span>{{ isSaved ? "Đã lưu" : "Lưu" }}</span>
          </button>
          <button
            class="flex-1 md:flex-none h-12 px-8 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <span>Ứng tuyển ngay</span>
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Tags row -->
      <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
        <div
          class="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-primary text-[20px]">work</span>
          {{ job.type }}
        </div>
        <div
          class="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-primary text-[20px]">apartment</span>
          {{ job.workMode }}
        </div>
        <div
          class="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-green-500 text-[20px]">payments</span>
          {{ job.salaryRange }}
        </div>
        <div
          class="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-orange-500 text-[20px]">stars</span>
          {{ job.level }}
        </div>
      </div>
    </div>

    <!-- 2-column grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: Job content -->
      <div class="lg:col-span-8 flex flex-col gap-6">
        <!-- Description -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
            <span
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"
            >
              <span class="material-symbols-outlined text-[20px]">description</span>
            </span>
            Mô tả công việc
          </h2>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="text-text-secondary leading-relaxed space-y-3 text-sm md:text-base"
            v-html="job.description"
          />

          <!-- Key Responsibilities -->
          <h3 class="text-lg font-bold text-text-main mt-8 mb-4">
            Trách nhiệm chính
          </h3>
          <ul class="space-y-3">
            <li
              v-for="item in job.responsibilities"
              :key="item"
              class="flex items-start gap-3 text-text-secondary text-sm md:text-base"
            >
              <span
                class="material-symbols-outlined text-primary mt-0.5 text-[20px] shrink-0"
                >check_circle</span
              >
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Requirements -->
          <h3 class="text-lg font-bold text-text-main mt-8 mb-4">
            Yêu cầu ứng viên
          </h3>
          <ul class="space-y-3">
            <li
              v-for="req in job.requirements"
              :key="req"
              class="flex items-start gap-3 text-text-secondary text-sm md:text-base"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"
              />
              <span>{{ req }}</span>
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 class="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
            <span
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"
            >
              <span class="material-symbols-outlined text-[20px]">card_giftcard</span>
            </span>
            Phúc lợi &amp; Đãi ngộ
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="benefit in job.benefits"
              :key="benefit.title"
              class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4"
            >
              <div
                :class="`w-10 h-10 rounded-full ${benefit.colorBg} ${benefit.colorText} flex items-center justify-center shrink-0`"
              >
                <span class="material-symbols-outlined">{{ benefit.icon }}</span>
              </div>
              <div>
                <h4 class="font-bold text-text-main text-sm">{{ benefit.title }}</h4>
                <p class="text-xs text-text-secondary mt-0.5">{{ benefit.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Sidebar -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Company info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-text-main mb-4">Về công ty</h3>
          <div class="flex items-start justify-between mb-5">
            <div class="flex items-center gap-4">
              <img
                :alt="job.company.name"
                :src="job.company.logoUrl"
                class="w-12 h-12 rounded-lg object-contain border border-slate-100 p-1"
              />
              <div>
                <h4 class="font-bold text-text-main">{{ job.company.name }}</h4>
                <a href="#" class="text-primary text-sm font-medium hover:underline"
                  >Xem hồ sơ</a
                >
              </div>
            </div>
            <button
              @click="toggleCompanyFollow"
              class="h-8 px-3 rounded-md text-xs font-bold transition-colors shrink-0"
              :class="isCompanyFollowing ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'"
            >
              {{ isCompanyFollowing ? 'Đang theo dõi' : '+ Theo dõi' }}
            </button>
          </div>
          <div class="space-y-3 text-sm">
            <div
              class="flex justify-between items-center py-2 border-b border-slate-50"
            >
              <span class="text-text-secondary">Ngành nghề</span>
              <span class="font-medium text-text-main">{{ job.company.industry }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-slate-50"
            >
              <span class="text-text-secondary">Quy mô</span>
              <span class="font-medium text-text-main">{{ job.company.size }}</span>
            </div>
            <div
              class="flex justify-between items-center py-2 border-b border-slate-50"
            >
              <span class="text-text-secondary">Trụ sở</span>
              <span class="font-medium text-text-main">{{ job.company.headquarters }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-text-secondary">Thành lập</span>
              <span class="font-medium text-text-main">{{ job.company.founded }}</span>
            </div>
          </div>
        </div>

        <!-- Similar jobs -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-text-main mb-4">Việc làm tương tự</h3>
          <div class="flex flex-col gap-4">
            <RouterLink
              v-for="similar in job.similarJobs"
              :key="similar.id"
              :to="`/jobs/${similar.id}`"
              class="flex gap-3 group"
            >
              <div
                class="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0"
              >
                <img
                  :alt="similar.company"
                  :src="similar.logoUrl"
                  class="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4
                  class="font-bold text-text-main text-sm group-hover:text-primary transition-colors line-clamp-1"
                >
                  {{ similar.title }}
                </h4>
                <p class="text-xs text-text-secondary mt-0.5">
                  {{ similar.company }} • {{ similar.location }}
                </p>
                <p class="text-xs font-medium text-green-600 mt-1">
                  {{ similar.salary }}
                </p>
              </div>
            </RouterLink>
          </div>
          <button
            class="w-full mt-5 py-2.5 rounded-xl border border-slate-200 text-text-main text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Xem tất cả việc làm tương tự
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile sticky apply bar -->
    <div
      class="lg:hidden fixed bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-2xl border border-slate-200 z-50 flex gap-3 items-center"
    >
      <div class="flex-1 min-w-0">
        <p class="font-bold text-text-main truncate text-sm">{{ job.title }}</p>
        <p class="text-xs text-text-secondary">{{ job.company.name }}</p>
      </div>
      <button
        class="h-10 px-5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md shrink-0 transition-colors"
      >
        Ứng tuyển
      </button>
    </div>
  </div>
</template>
