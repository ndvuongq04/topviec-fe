<template>
  <div class="tab-card">
    <div class="timeline">
      <div
        v-for="app in applications"
        :key="app.id"
        class="timeline-item"
      >
        <div class="timeline-dot" :class="app.status === 'interview' ? 'dot-active' : 'dot-inactive'"></div>
        <div class="timeline-body">
          <p class="app-date">{{ app.date }}</p>
          <h4 class="app-position">{{ app.position }}</h4>
          <p class="app-company">{{ app.company }}</p>
          <span class="app-status" :class="`status-${app.status}`">
            {{ app.statusLabel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  applications: Array<{
    id: number; date: string; position: string
    company: string; status: string; statusLabel: string
  }>
}>()
</script>

<style scoped>
.tab-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px -4px rgba(87, 66, 64, 0.05);
}
.timeline {
  position: relative;
  border-left: 1px solid #e4e2dc;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.timeline-item { position: relative; padding-left: 28px; }
.timeline-dot {
  position: absolute;
  left: -6px; top: 4px;
  width: 12px; height: 12px;
  border-radius: 50%;
  border: 3px solid #fff;
}
.dot-active { background: #004638; box-shadow: 0 0 0 2px #004638; }
.dot-inactive { background: #dcdad3; box-shadow: 0 0 0 2px #dcdad3; }

.app-date {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #574240; margin: 0 0 4px;
}
.app-position { font-size: 14px; font-weight: 700; color: #1b1c18; margin: 0 0 2px; }
.app-company { font-size: 13px; color: #574240; margin: 0 0 8px; }

.app-status {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px; font-weight: 700;
  border-radius: 4px;
}
.status-interview { background: #e4e2dc; color: #574240; }
.status-rejected { background: #ffdad6; color: #93000a; }
</style>