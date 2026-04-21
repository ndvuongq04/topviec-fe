<template>
  <div class="brand-card">
    <div class="brand-card__top">
      <div class="brand-card__logo" :style="{ background: company.bgColor }">
        <span
          v-for="(line, i) in logoLines" :key="i"
          class="brand-card__logo-line"
          :style="{ color: i === 0 ? company.logoColor : company.logoSubColor || company.logoColor }"
        >{{ line }}</span>
      </div>
      <div class="brand-card__info">
        <h3 class="brand-card__name">{{ company.name }}</h3>
        <p class="brand-card__industry">{{ company.industry }}</p>
      </div>
    </div>
    <div class="brand-card__footer">
      <span class="material-symbols-outlined brand-card__work-icon">work</span>
      <span class="brand-card__job-count">{{ company.jobCount }} việc làm</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  company: {
    id: number; logoText: string; logoSubText?: string
    logoColor: string; logoSubColor?: string; bgColor: string
    name: string; industry: string; jobCount: number
  }
}>()

const logoLines = computed(() => props.company.logoText.split('\n'))
</script>

<style scoped>
.brand-card {
  background: #fff;
  border-radius: 0.75rem; padding: 1rem;
  display: flex; flex-direction: column;
  border: 1px solid rgba(192,199,212,0.3);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}
.brand-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,94,164,0.08);
  border-color: #005ea4;
}

.brand-card__top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }

.brand-card__logo {
  width: 56px; height: 56px; flex-shrink: 0;
  border-radius: 0.5rem;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border: 1px solid rgba(192,199,212,0.2);
  padding: 4px;
}
.brand-card__logo-line {
  font-size: 0.75rem; font-weight: 700;
  line-height: 1.2; text-align: center; display: block;
}

.brand-card__info { flex: 1; min-width: 0; }
.brand-card__name {
  font-size: 0.875rem; font-weight: 700; color: #071b3b;
  text-transform: uppercase; margin-bottom: 4px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden; line-height: 1.3;
}
.brand-card__industry { font-size: 0.75rem; color: #404752; }

.brand-card__footer {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.75rem; font-weight: 500; color: #404752;
  margin-top: auto; padding-top: 8px;
}
.brand-card__work-icon { font-size: 16px; }
</style>