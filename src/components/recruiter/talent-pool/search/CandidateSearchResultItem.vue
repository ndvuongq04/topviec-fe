<template>
  <div class="cs-item">
    <img :alt="candidate.name" :src="candidate.avatar" class="cs-item__avatar" />

    <div class="cs-item__body">
      <div class="cs-item__header">
        <div>
          <h4 class="cs-item__name">{{ candidate.name }}</h4>
          <p class="cs-item__role">{{ candidate.role }}</p>
        </div>
        <span :class="['cs-item__status', `cs-item__status--${candidate.status}`]">
          {{ candidate.statusLabel }}
        </span>
      </div>

      <div class="cs-item__skills">
        <CandidateSkillTag v-for="s in candidate.skills" :key="s" :label="s" variant="neutral" />
      </div>

      <div class="cs-item__meta">
        <span class="cs-item__meta-item">
          <span class="material-symbols-outlined">work</span>{{ candidate.experience }}
        </span>
        <span class="cs-item__meta-item">
          <span class="material-symbols-outlined">location_on</span>{{ candidate.location }}
        </span>
        <span class="cs-item__meta-item">
          <span class="material-symbols-outlined">payments</span>{{ candidate.salary }}
        </span>
        <span class="cs-item__meta-item">
          <span class="material-symbols-outlined">school</span>{{ candidate.education }}
        </span>
      </div>
    </div>

    <div class="cs-item__actions">
      <button class="cs-item__btn cs-item__btn--ghost">Xem CV</button>
      <button class="cs-item__btn cs-item__btn--primary">
        <span class="material-symbols-outlined">bookmark_add</span>
        Lưu Pool
      </button>
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
    status: string
    statusLabel: string
    skills: string[]
    experience: string
    location: string
    salary: string
    education: string
    avatar: string
  }
}>()
</script>

<style scoped>
.cs-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.3);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
}

.cs-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.cs-item__avatar {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #f1f4f9;
}

.cs-item__body {
  flex: 1;
  min-width: 0;
}

.cs-item__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.cs-item__name {
  color: #0f172a;
  font-size: 1.125rem;
  font-weight: 700;
}

.cs-item__role {
  margin-top: 2px;
  color: #64748b;
  font-size: 0.875rem;
}

.cs-item__status {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.cs-item__status--open {
  background: #dbeafe;
  color: #2563eb;
}

.cs-item__status--seeking {
  background: #d1fae5;
  color: #065f46;
}

.cs-item__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
}

.cs-item__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #64748b;
  font-size: 0.875rem;
}

.cs-item__meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 1rem;
  padding-right: 1rem;
  border-right: 1px solid rgba(226, 232, 240, 0.5);
}

.cs-item__meta-item:last-child {
  margin-right: 0;
  border-right: none;
}

.cs-item__meta-item .material-symbols-outlined {
  font-size: 1.125rem;
}

.cs-item__actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: 8px;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(226, 232, 240, 0.3);
}

.cs-item__btn {
  display: flex;
  width: 128px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.15s;
}

.cs-item__btn--ghost {
  border: 1px solid #cbd5e1;
  background: none;
  color: #0f172a;
}

.cs-item__btn--ghost:hover {
  background: #f1f4f9;
}

.cs-item__btn--primary {
  border: none;
  background: #4b9af6;
  box-shadow: 0 1px 4px rgba(75, 154, 246, 0.25);
  color: #fff;
}

.cs-item__btn--primary:hover {
  background: #2563eb;
}

.cs-item__btn .material-symbols-outlined {
  font-size: 1.125rem;
}
</style>
