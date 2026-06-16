<template>
  <div class="cd-content">
    <h2 class="cd-content__title">Nội dung khiếu nại</h2>

    <!-- Description -->
    <div class="cd-content__section">
      <p class="cd-content__label">Mô tả của người dùng</p>
      <div class="cd-content__desc">{{ content.description }}</div>
    </div>

    <!-- Evidence -->
    <div class="cd-content__section">
      <p class="cd-content__label">Bằng chứng đính kèm</p>
      <div v-if="content.evidences.length" class="cd-content__evidences">
        <a
          v-for="(src, i) in content.evidences" :key="i"
          :href="src"
          target="_blank"
          class="cd-content__evidence-img"
        >
          <img :alt="`Bang chung ${i + 1}`" :src="src" />
        </a>
      </div>
      <p v-else class="cd-content__no-evidence">Không có bằng chứng đính kèm.</p>
    </div>

    <!-- Auto-check -->
    <div class="cd-content__section">
      <p class="cd-content__label">Kết quả kiểm tra tự động</p>
      <div class="cd-content__auto-checks">
        <div
          v-for="check in content.autoCheck" :key="check.label"
          :class="['cd-content__check-item', `cd-content__check-item--${check.variant}`]"
        >
          <span class="cd-content__check-label">{{ check.label }}</span>
          <span class="cd-content__check-value">{{ check.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: {
    description: string
    evidences: string[]
    autoCheck: { label: string; value: string; variant: string }[]
  }
}>()
</script>

<style scoped>
.cd-content {
  background: #fff; border-radius: 0.75rem; padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.cd-content__title { font-size: 1.125rem; font-weight: 700; color: #1b1c18; margin-bottom: 1.5rem; }

.cd-content__section { margin-bottom: 1.5rem; }
.cd-content__section:last-child { margin-bottom: 0; }

.cd-content__label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.07em; color: #574240; margin-bottom: 10px;
}

.cd-content__desc {
  background: #f6f4ec; border-radius: 0.5rem;
  padding: 1rem; font-size: 0.8125rem; line-height: 1.7; color: #1b1c18;
}

/* Evidence */
.cd-content__evidences { display: flex; gap: 12px; flex-wrap: wrap; }
.cd-content__evidence-img {
  width: 96px; height: 96px; border-radius: 0.5rem;
  border: 1px solid #e4e2dc; overflow: hidden;
  cursor: pointer; transition: opacity 0.15s;
}
.cd-content__evidence-img {
  display: block;
}
.cd-content__evidence-img:hover { opacity: 0.9; }
.cd-content__evidence-img img { width: 100%; height: 100%; object-fit: cover; }

.cd-content__no-evidence {
  font-size: 0.875rem;
  color: #94a3b8;
  font-style: italic;
}

/* Auto check */
.cd-content__auto-checks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 640px) { .cd-content__auto-checks { grid-template-columns: 1fr; } }

.cd-content__check-item {
  display: flex; flex-direction: column; gap: 4px;
  padding: 12px; border-radius: 0.5rem;
}
.cd-content__check-item--default { background: #f6f4ec; }
.cd-content__check-item--success { background: #f6f4ec; }
.cd-content__check-item--error   { background: #ffdad6; }

.cd-content__check-label { font-size: 11px; color: #574240; }
.cd-content__check-item--error .cd-content__check-label { color: #93000a; }

.cd-content__check-value { font-size: 0.8125rem; font-weight: 700; color: #1b1c18; }
.cd-content__check-item--success .cd-content__check-value { color: #085041; }
.cd-content__check-item--error   .cd-content__check-value { color: #93000a; }
</style>
