<template>
  <div class="sc-card">
    <div class="sc-card__top">
      <div class="sc-card__avatar-wrap">
        <img v-if="candidate.avatar" :alt="candidate.name" :src="candidate.avatar" class="sc-card__avatar" />
        <div v-else class="sc-card__avatar-initials">{{ candidate.initials }}</div>
      </div>
      <div class="sc-card__info">
        <h3 class="sc-card__name">{{ candidate.name }}</h3>
        <p class="sc-card__role">{{ candidate.role }}</p>
      </div>
      <span :class="['sc-card__label', `sc-card__label--${candidate.labelVariant}`]">{{ candidate.label }}</span>
    </div>

    <div class="sc-card__skills">
      <CandidateSkillTag v-for="s in candidate.skills" :key="s" :label="s" variant="primary" />
    </div>

    <div class="sc-card__meta">
      <div class="sc-card__meta-item">
        <span class="material-symbols-outlined">work_history</span>{{ candidate.experience }}
      </div>
      <div class="sc-card__meta-item">
        <span class="material-symbols-outlined">location_on</span>{{ candidate.location }}
      </div>
      <div class="sc-card__meta-item sc-card__meta-item--full">
        <span class="material-symbols-outlined">payments</span>{{ candidate.salary }}
      </div>
    </div>

    <div class="sc-card__footer">
      <span class="sc-card__saved-at">Đã lưu: {{ candidate.savedAt }}</span>
      <div class="sc-card__actions">
        <button class="sc-card__action-btn" title="Xem hồ sơ">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button class="sc-card__action-btn" title="Gửi email">
          <span class="material-symbols-outlined">mail</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CandidateSkillTag from '../shared/CandidateSkillTag.vue'

defineProps<{
  candidate: {
    id: number
    name: string
    role: string
    label: string
    labelVariant: string
    skills: string[]
    experience: string
    location: string
    salary: string
    savedAt: string
    avatar?: string
    initials?: string
  }
}>()
</script>

<style scoped>
.sc-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #f8fafd;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
}

.sc-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.sc-card:hover .sc-card__actions {
  opacity: 1;
}

.sc-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sc-card__avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
}

.sc-card__avatar-initials {
  display: flex;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f1f4f9;
  color: #4b9af6;
  font-size: 1.125rem;
  font-weight: 700;
}

.sc-card__info {
  flex: 1;
  min-width: 0;
}

.sc-card__name {
  color: #0f172a;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
}

.sc-card__role {
  margin-top: 2px;
  color: #64748b;
  font-size: 0.875rem;
}

.sc-card__label {
  margin-left: auto;
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.sc-card__label--priority {
  background: #fef3c7;
  color: #b45309;
}

.sc-card__label--default {
  background: #e9edf5;
  color: #64748b;
}

.sc-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sc-card__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  color: #64748b;
  font-size: 0.875rem;
}

.sc-card__meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sc-card__meta-item .material-symbols-outlined {
  font-size: 0.875rem;
}

.sc-card__meta-item--full {
  grid-column: 1 / -1;
}

.sc-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid rgba(226, 232, 240, 0.5);
}

.sc-card__saved-at {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
}

.sc-card__actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.sc-card__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: #f1f4f9;
  color: #64748b;
  cursor: pointer;
  transition: color 0.15s;
}

.sc-card__action-btn:hover {
  color: #4b9af6;
}

.sc-card__action-btn .material-symbols-outlined {
  font-size: 1rem;
}
</style>
