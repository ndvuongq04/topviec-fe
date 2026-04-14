<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div v-for="card in cards" :key="card.label" :class="['kpi-card', card.highlight ? 'kpi-highlight' : '']">
      <div class="kpi-top">
        <span :class="['kpi-label', card.highlight ? 'kpi-label--light' : '']">{{ card.label }}</span>
        <span :class="['material-symbols-outlined kpi-icon', card.highlight ? 'text-white' : 'text-[#76191d]']">
          {{ card.icon }}
        </span>
      </div>
      <div class="kpi-bottom">
        <span :class="['kpi-value', card.highlight ? 'text-white' : 'text-[#1b1c18]']">{{ card.value }}</span>
        <span :class="['kpi-sub', card.highlight ? 'kpi-sub--light' : card.subClass]">{{ card.sub }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { label: 'Tổng số gói',        icon: 'inventory_2',  value: '05',    sub: '+1 New',  subClass: 'text-[#004638] font-bold' },
  { label: 'Doanh thu trung bình',icon: 'payments',     value: '450k',  sub: '/ user',  subClass: 'text-[#574240]' },
  { label: 'Conversion Rate',     icon: 'trending_up',  value: '12.5%', sub: 'Optimal', highlight: true },
]
</script>

<style scoped>
.kpi-card {
  background: #f6f4ec;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.kpi-highlight { background: #963131; }
.kpi-top { display: flex; align-items: center; justify-content: space-between; }
.kpi-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #574240;
}
.kpi-label--light { color: rgba(255,255,255,0.7); }
.kpi-bottom { display: flex; align-items: baseline; gap: 8px; }
.kpi-value { font-size: 30px; font-weight: 900; }
.kpi-sub { font-size: 12px; }
.kpi-sub--light { color: rgba(255,255,255,0.7); }
</style>