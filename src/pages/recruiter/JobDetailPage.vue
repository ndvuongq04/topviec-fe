<template>
  <div class="page-wrapper">
    <div class="page-inner">

      <!-- Header: breadcrumb + title + actions -->
      <JobDetailHeader
        title="Senior Frontend Engineer"
        location="Hồ Chí Minh, Quận 1"
      />

      <!-- 4 stat bento cards -->
      <JobDetailStats />

      <!-- Two-column body -->
      <div class="body-grid">
        <!-- Left: 3 content sections -->
        <div class="col-main">
          <JobDetailContent />
        </div>

        <!-- Right: sidebar info -->
        <div class="col-side">
          <JobDetailSideInfo />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import JobDetailHeader   from '@/components/recruiter/jobs/JobDetailHeader.vue'
import JobDetailStats    from '@/components/recruiter/jobs/JobDetailStats.vue'
import JobDetailContent  from '@/components/recruiter/jobs/JobDetailContent.vue'
import JobDetailSideInfo from '@/components/recruiter/jobs/JobDetailSideInfo.vue'
</script>

<style scoped>
.page-wrapper {
  /* Bỏ padding hoàn toàn vì RecruiterLayout parent đã có px-8 pb-8 */
  width: 100%;
}

.page-inner {
  width: 100%;
  /* Bỏ max-width để full màn hình tĩnh 100% giống JobPostingsPage */
}

/* Two-col body */
.body-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
@media (min-width: 1024px) {
  .body-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.col-main { min-width: 0; }
.col-side  { min-width: 0; }
</style>
