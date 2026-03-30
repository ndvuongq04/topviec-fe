<template>
  <section>
    <div class="stage-header">
      <h3 class="stage-title">
        <span class="stage-dot"></span>
        Tiến độ phỏng vấn
      </h3>
      <span class="stage-hint">Chọn vòng phỏng vấn để xem chi tiết</span>
    </div>

    <div class="stage-grid">
      <button
        v-for="stage in stages"
        :key="stage.id"
        class="stage-card"
        :class="{ 'stage-card--active': stage.id === activeStageId }"
        @click="$emit('select', stage.id)"
      >
        <div class="stage-card__top">
          <div>
            <p class="stage-card__round">{{ stage.label }}</p>
            <h4 class="stage-card__name">{{ stage.name }}</h4>
          </div>
          <div
            class="stage-card__count"
            :class="stage.id === activeStageId ? 'stage-card__count--active' : ''"
          >
            {{ String(stage.count).padStart(2, '0') }}
          </div>
        </div>
        <div class="stage-card__progress">
          <div class="stage-card__bar">
            <div
              class="stage-card__bar-fill"
              :class="{ 'stage-card__bar-fill--active': stage.id === activeStageId }"
              :style="{ width: stage.id === activeStageId ? '100%' : '0%' }"
            ></div>
          </div>
          <span
            class="stage-card__status"
            :class="stage.id === activeStageId ? 'stage-card__status--active' : ''"
          >
            {{ stage.id === activeStageId ? 'ACTIVE' : 'CHỜ' }}
          </span>
        </div>
      </button>

      <!-- Total summary -->
      <div class="stage-total">
        <p class="stage-total__label">Tổng cộng ứng viên</p>
        <div class="stage-total__value">
          {{ totalCandidates }}
          <span class="stage-total__unit">Hồ sơ</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stage {
  id: number
  label: string
  name: string
  count: number
}

defineProps<{
  stages: Stage[]
  activeStageId: number
  totalCandidates: number
}>()

defineEmits<{
  select: [stageId: number]
}>()
</script>

<style scoped>
/* ============================================
   Font Size Scale (skill-font.md):
   1.875rem (30px) = Page title, stats lớn
   1.125rem (18px) = Tên item chính
   1rem     (16px) = Body, button cấp 1
   0.875rem (14px) = Data cells, metadata, chip
   0.75rem  (12px) = th, badge, label nhỏ (bold + uppercase)
   ============================================ */

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stage-title {
  font-size: 0.875rem;            /* 14px – metadata/label cấp section */
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #4b9af6;
  border-radius: 9999px;
  display: inline-block;
}

.stage-hint {
  font-size: 0.75rem;             /* 12px – label phụ nhỏ */
  font-weight: 500;
  color: #94a3b8;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .stage-grid {
    grid-template-columns: 1fr;
  }
}

/* --- Stage Card --- */
.stage-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  text-align: left;
  cursor: pointer;
}

.stage-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border-color: rgba(75, 154, 246, 0.5);
}

.stage-card--active {
  border: 2px solid #4b9af6;
}

.stage-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stage-card__round {
  font-size: 0.75rem;             /* 12px – label nhỏ, bold + uppercase */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
  color: #94a3b8;
}

.stage-card--active .stage-card__round {
  color: #4b9af6;
}

.stage-card__name {
  font-size: 0.875rem;            /* 14px – data cell / tên vòng */
  font-weight: 800;
  color: #0f172a;
}

.stage-card__count {
  background: #f1f5f9;
  color: #94a3b8;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 1.125rem;            /* 18px – số nổi bật item chính */
  font-weight: 900;
}

.stage-card__count--active {
  background: rgba(75, 154, 246, 0.1);
  color: #4b9af6;
}

.stage-card__progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-card__bar {
  flex: 1;
  height: 0.375rem;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
}

.stage-card__bar-fill {
  height: 100%;
  background: #e2e8f0;
  transition: width 0.5s;
}

.stage-card__bar-fill--active {
  background: #4b9af6;
}

.stage-card__status {
  font-size: 0.75rem;             /* 12px – badge trạng thái, bold + uppercase */
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
}

.stage-card__status--active {
  color: #4b9af6;
}

/* --- Total Card --- */
.stage-total {
  background: #0f172a;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stage-total__label {
  font-size: 0.75rem;             /* 12px – label nhỏ, bold + uppercase */
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.stage-total__value {
  font-size: 1.875rem;            /* 30px – số thống kê lớn nhất */
  font-weight: 900;
  color: #fff;
}

.stage-total__unit {
  font-size: 0.875rem;            /* 14px – metadata đi kèm */
  font-weight: 400;
  color: #64748b;
  margin-left: 0.25rem;
}
</style>