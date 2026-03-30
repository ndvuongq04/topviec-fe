<template>
  <section class="cv-preview-panel">
    <!-- Breadcrumb & Actions -->
    <div class="panel-header">
      <div class="breadcrumb">
        <span class="breadcrumb__parent">Ứng viên</span>
        <span class="material-symbols-outlined breadcrumb__sep">chevron_right</span>
        <span class="breadcrumb__current">{{ candidateName }}</span>
      </div>
      <div class="panel-actions">
        <button class="btn-action" @click="$emit('download')">
          <span class="material-symbols-outlined">download</span>
          Tải CV
        </button>
        <button class="btn-action" @click="$emit('print')">
          <span class="material-symbols-outlined">print</span>
          In
        </button>
      </div>
    </div>

    <!-- CV Preview -->
    <div class="cv-viewport" @mouseenter="showOverlay = true" @mouseleave="showOverlay = false">
      <Transition name="fade">
        <div v-if="showOverlay" class="cv-overlay">
          <button class="btn-fullscreen" @click="$emit('fullscreen')">
            <span class="material-symbols-outlined">fullscreen</span>
            Xem toàn màn hình
          </button>
        </div>
      </Transition>

      <!-- CV Document -->
      <div class="cv-doc">
        <!-- CV Header -->
        <div class="cv-doc__header">
          <div class="cv-doc__identity">
            <h2 class="cv-doc__name">{{ candidateName.toUpperCase() }}</h2>
            <p class="cv-doc__title">{{ candidateTitle }}</p>
          </div>
          <div class="cv-doc__avatar">
            <img :src="avatarUrl" :alt="`Ảnh ${candidateName}`" />
          </div>
        </div>

        <!-- CV Body -->
        <div class="cv-doc__body">
          <!-- Left column -->
          <div class="cv-doc__col">
            <div class="cv-section">
              <h3 class="cv-section__heading">Thông tin liên hệ</h3>
              <ul class="cv-contact">
                <li>
                  <span class="material-symbols-outlined">mail</span>
                  {{ contactEmail }}
                </li>
                <li>
                  <span class="material-symbols-outlined">call</span>
                  {{ contactPhone }}
                </li>
                <li>
                  <span class="material-symbols-outlined">location_on</span>
                  {{ contactLocation }}
                </li>
              </ul>
            </div>

            <div class="cv-section">
              <h3 class="cv-section__heading">Kỹ năng</h3>
              <div class="cv-skills">
                <span
                  v-for="skill in skills"
                  :key="skill"
                  class="cv-skill-tag"
                >{{ skill }}</span>
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="cv-doc__col">
            <div class="cv-section">
              <h3 class="cv-section__heading">Kinh nghiệm</h3>
              <div class="cv-experience">
                <div
                  v-for="exp in experiences"
                  :key="exp.company"
                  class="cv-exp-item"
                >
                  <p class="cv-exp-item__company">{{ exp.company }}</p>
                  <p class="cv-exp-item__period">{{ exp.period }}</p>
                  <p class="cv-exp-item__desc">{{ exp.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Experience {
  company: string
  period: string
  description: string
}

interface Props {
  candidateName: string
  candidateTitle: string
  avatarUrl: string
  contactEmail: string
  contactPhone: string
  contactLocation: string
  skills: string[]
  experiences: Experience[]
}

defineProps<Props>()
defineEmits<{
  download: []
  print: []
  fullscreen: []
}>()

const showOverlay = ref(false)
</script>

<style scoped>
/* ── Panel layout ── */
.cv-preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Breadcrumb & header ── */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem; /* 14px – metadata */
}
.breadcrumb__parent { color: #64748b; }
.breadcrumb__sep { font-size: 1rem; color: #94a3b8; }
.breadcrumb__current { font-weight: 700; color: #4B9AF6; }

.panel-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-action {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 0.875rem; /* 14px */
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-action:hover { background: #f8fafc; }
.btn-action .material-symbols-outlined { font-size: 1.125rem; }

/* ── CV Viewport ── */
.cv-viewport {
  position: relative;
  flex: 1;
  min-height: 480px;
  border-radius: 0.75rem;
  border: 1px solid #e2e7f0;
  background: #e2e7f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cv-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.btn-fullscreen {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: 9999px;
  background: #4B9AF6;
  color: #fff;
  font-size: 0.875rem; /* 14px */
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(75, 154, 246, 0.35);
  transition: transform 0.15s;
}
.btn-fullscreen:hover { transform: scale(1.05); }

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── CV Document ── */
.cv-doc {
  width: 85%;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 8px 40px rgba(15, 23, 42, 0.15);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cv-doc__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.cv-doc__name {
  font-size: 1.875rem; /* 30px – page title level */
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}
.cv-doc__title {
  font-size: 1.125rem; /* 18px – item title */
  font-weight: 700;
  color: #4B9AF6;
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cv-doc__avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #f1f5f9;
  flex-shrink: 0;
}
.cv-doc__avatar img { width: 100%; height: 100%; object-fit: cover; }

.cv-doc__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* ── CV Sections ── */
.cv-section { display: flex; flex-direction: column; gap: 0.75rem; }

.cv-section__heading {
  font-size: 0.75rem; /* 12px – label */
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.5rem;
}

.cv-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.cv-contact li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem; /* 14px */
  color: #475569;
}
.cv-contact .material-symbols-outlined {
  font-size: 1rem;
  color: #4B9AF6;
}

.cv-skills { display: flex; flex-wrap: wrap; gap: 0.375rem; }
.cv-skill-tag {
  padding: 0.25rem 0.5rem;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  border-radius: 0.25rem;
}

.cv-experience { display: flex; flex-direction: column; gap: 1rem; }
.cv-exp-item__company {
  font-size: 0.875rem; /* 14px */
  font-weight: 700;
  color: #1e293b;
}
.cv-exp-item__period {
  font-size: 0.75rem; /* 12px */
  color: #94a3b8;
  font-style: italic;
  margin-top: 0.125rem;
}
.cv-exp-item__desc {
  font-size: 0.75rem; /* 12px */
  color: #475569;
  margin-top: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>