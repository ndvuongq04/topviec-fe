<script setup lang="ts">
// JobList: Grid hiển thị danh sách JobCard
// Bao gồm: tiêu đề section + link "View All" + grid responsive
import JobCard from "@/components/candidate/job/JobCard.vue";

// Dữ liệu tạm (sau này thay bằng API call từ store/service)
const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Shopee Vietnam",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbv5UoTkk7bNaOkqwb82yNLvv9LnYnyhsQa86lCBQr2lPoUS1Gx3_UnfiA0F-PfarFev8ZDr6M4OyKaojjSi7LMwoz53Ha5uXg1g2RaVikGHTjrKnqmSUe6_POc9CIg9VSqt1-t49OmH1BRxI8Da3jinrKda-7wcA2hAzyXwTK4T-Urtd7hdfjDM1qLKqWjovzEj_w0ijuYiD9SIAze_jLzwDI-l8SQjoblKq0NSrcs2k7IdPNV5SZxzl2CJ4DfwDmFkOljapgcYwd",
    logoBg: "bg-orange-100",
    logoBorder: "border-orange-200",
    tags: ["Full-time", "Senior Level"],
    salaryMin: "$2,000",
    salaryMax: "$3,500",
    location: "Ho Chi Minh City",
    postedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer (React)",
    company: "Grab",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwRc6CcpnKRHBzSRJ2NWpp4nCTzJk1x6VTPPkJ2Oz7CDmtL42KYfn7T8F9W3ozOkDLMvaGEcwWzSY8L59olG1XQnHwBD3fI44DzPnZPoOV35fUj5yr-UAaqU7eSzHtLVZvU-kK44BYiPwMmPCgYK4o7lwzBysO55Le5QNIqXWVfhI34e2oy6t-sACKfm0EMXV-aziiElptOlHtzu_85PUTmKpQDzzJjgaJ7D7FqJkgUSoGgw8hdZH0FrYKaAI_aMdp5iMEu8buoI8o",
    logoBg: "bg-blue-100",
    logoBorder: "border-blue-200",
    tags: ["Remote", "Mid Level"],
    salaryMin: "$1,500",
    salaryMax: "$2,500",
    location: "Remote / HCMC",
    postedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Spotify",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZq6Sl3W6czrZ8TzdkGmaFdrKtF9837jz9u0oEqnbZ5tV76kazkKsUr4JfGrljS1ks2pACsrCwmH8XSvW7L9PTmgITsQJjE2WVY0ySNQLAnlSBDa-hQ2-d6rP6vt8LzCxKYIhf3IgNCVcXxgU5OvtbOo-wrjNREUu5hHQlTYpoipcaKLFdL19w4gNgMDXsqimzo89ZiOhDl6a5yePDqtGs004rdLyw4TuUEPKSEyHHL-BM_Wr1TSaTL_8timVOHa4KUCJ7sPpu_rQg",
    logoBg: "bg-green-100",
    logoBorder: "border-green-200",
    tags: ["Contract", "Manager"],
    salaryMin: "$2,500",
    salaryMax: "$4,000",
    location: "Hanoi",
    postedAt: "1 day ago",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "MoMo",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANq6VgrXnFHLLw_WO2dI4iNq-x-oSXlxfg_7D0KZv5I-ztafWhYns3dEqajpnQVN4Vv8v95ZJHTpvYTqnEMvMl7lAl3ogwB_SPbPTxtl3uDMY2HJ1H6_LF-HnrsmDksV9BW7bWIPUp-zYHzWjtwdcOp2nU_uMd-CpL3M8mi8bBHRnRLyZPt0Wnq8888Y2zP3z_yk8VZt_Ae-QJTpoCscEHheSD2-dzPaUUQARbvTfUMYgukMMKW2zS7MrasKxzm9FwMmk0-UAZAzt0",
    logoBg: "bg-purple-100",
    logoBorder: "border-purple-200",
    tags: ["Full-time", "Junior"],
    salaryMin: "$800",
    salaryMax: "$1,500",
    location: "Ho Chi Minh City",
    postedAt: "",
    isHot: true,
  },
  {
    id: 5,
    title: "Content Strategist",
    company: "Netflix",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkKTcEXRhr8naEYK_Z328Tw3vsqoAHfrmLJflFvDI4XT_XMa0K-eZkAq07nFhAwiFFNXPYhJZEeufy9ocuGgUxKLksL3YwXP3PWZLO88KagbWc_FHoEMkMOa3lJenBDAUYf2KcQClr5jo9UtCTypWmqaKhW7M-c31Nxity3EcJk5hggaBlfyMjTNaXn2rAdHiFuzoxpbKSCBuOORUWRKmKP73RgAxyNlyN7JXz2PCpCMzeLGtzsW340Vy4VLItXgm_wYRl7vUGIoYl",
    logoBg: "bg-red-100",
    logoBorder: "border-red-200",
    tags: ["Remote", "Mid Level"],
    salaryMin: "$1,800",
    salaryMax: "$3,000",
    location: "Remote",
    postedAt: "3 days ago",
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Stripe",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpWtirWjFq-VRC9OLXuMYmTa4uBFMaqmXt0lZ3U-VGGV4IuQq-8Ag5hppZMd52OHNJ4zgzFWxVt7jLRnG4kLvvfvS7QE7sIC9rXTUp4jZ6sfO1P4CXu_pJjEVmGojIFuqwCu2o4r0NHXmDcAowZu8ZnZCXMOjlBA4hsee_6gQ39Rzv5P_qo8PaKc4pv54cLooCvuVHKHKoXLvwdTvFnciFCHNj57Jk6E1ZpEzhrSH0zqSqOeH4Uku9JooqAAioYWenhp8-Vn2HJS0Q",
    logoBg: "bg-indigo-100",
    logoBorder: "border-indigo-200",
    tags: ["Full-time", "Expert"],
    salaryMin: "$4,000",
    salaryMax: "$6,000",
    location: "Singapore / Remote",
    postedAt: "Just now",
  },
];

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
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <JobCard
        v-for="job in jobs"
        :key="job.id"
        v-bind="job"
        @bookmark="handleBookmark"
      />
    </div>
  </div>
</template>
