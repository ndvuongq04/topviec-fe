<script setup lang="ts">
// CompanyList: Danh sách công ty scroll ngang
import { ref } from "vue";
import CompanyCard from "@/components/candidate/company/CompanyCard.vue";

const companies = ref([
  {
    id: 1,
    name: "VNG Corporation",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0bnx4_ReIbmoOq3HYCqBm34cYvS9n-72MKOPP9z4bRF8ZfReXWnMWJsL05TsgWnM8EOiDzZie501oLzAlmwPM-s2Jw2bstu1FhlPRUSiX2RW0IzDow8N3HUzWzSFoAvQuOSVgF1SxxJsmS1bYfDJ0UptTGnESkf6s-aSmzdGQHzY2bBi_UqSrW3ZgRj8QKpBSMzhsOjAR9coohQKTMFJQAboAAbClmwQrXKZA4_rVKV1Din8KkamiZX9_Odo767uaYv3EMy-Xk-XQ",
    openJobs: 12,
    isFollowing: false,
  },
  {
    id: 2,
    name: "FPT Software",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoPcAmUjwVs4kWAMrbjkEEDBLIqdlvEmyDaSMZwPgOPgWi52mRp44PG9HX9IuI1VaAazp2kvL943l59EkYRLvKbdeqo789Yprizyv0GaKe1fvm9pGKn7RPDKMILUMKR-k5hZeNU4LmPlrYi3GfLGbs6kl-l-yEuhhrr-IkJEwoxFkrmrbznlaYTMgJNeeKIsGAYSa9VWHKWoCoCMEyjbngLGHyTF9lnRQoqY3zuEquCI9KHsZ90tkHde9LbIZI___sVu0_TIDKbSdx",
    openJobs: 45,
    isFollowing: false,
  },
  {
    id: 3,
    name: "Tiki",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBc-vGtR0aV0TWvyrsQTwdrY_f6-Umq6G7Sbom44ceEuTbaif5RTUlCx6ndPLM7yPqhh62m2v0X2dhC8PNYmkAp6fLRx0JRf53eZM437WH4v0MtJhbZCeH-YxqXhyepIqt7QHdtCG-dDbRSWpcbofCanSPS57Bl5Ii7hzA6XCUMQTvhiRXxcPOMNg3nhpbP8Lo-dMoecoPMvqgyX38VSFgh7ykmTxpzHL7aAHYrrrtZkDnN-q7dgUTIXpZJx52d1WruzqacHCev45rX",
    openJobs: 8,
    isFollowing: false,
  },
  {
    id: 4,
    name: "Mobile World",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXe_2mcJZTPbdTlokD7X__xmIFY8DtaIwy1nJLbp3doqBc6o-jpOEN1BnukWAiz1NfxxjzZiqdel6PsS_II2NXnGw4sxTq1p7uOQ_UiA0Ztp54KE4aLX8XhHDG4Aab_fL9hIWIX0quESjlhUYemu3RfyebyVH1cpjF4Tuuh8lqB5634Lrb_6cDisI00b-O5ltw69t-gKL2L1L1RkLfvA6lXNARtietpioGtHZTQ_SIeR_nR-Z8XcqnSIVEmYq6UiqPmm8ZiazvfiIS",
    openJobs: 21,
    isFollowing: false,
  },
]);

function handleFollow(id: number) {
  const company = companies.value.find((c) => c.id === id);
  if (company) company.isFollowing = !company.isFollowing;
}
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <!-- Header -->
    <h2 class="text-xl font-bold text-text-main dark:text-white">
      Công ty đang tuyển dụng
    </h2>

    <!-- Scroll ngang -->
    <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      <CompanyCard
        v-for="company in companies"
        :key="company.id"
        v-bind="company"
        @follow="handleFollow"
      />
    </div>
  </div>
</template>
