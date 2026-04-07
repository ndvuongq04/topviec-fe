<template>
  <span class="badge" :class="`badge--${status.toLowerCase()}`">
    {{ statusText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ status: string }>()

const statusText = computed(() => {
  const map: Record<string, string> = {
    COMPLETED: 'ĐÃ HOÀN THÀNH',
    PENDING_CONFIRMATION: 'CHỜ XÁC NHẬN',
    LOCKED: 'CHƯA MỞ',
    CANCELLED: 'ĐÃ HỦY',
  }
  return map[props.status] ?? props.status
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.badge--completed {
  background: rgba(0, 109, 50, 0.1);
  color: #006d32;
}

.badge--pending_confirmation {
  background: rgba(0, 96, 168, 0.1);
  color: #005ea4;
}

.badge--locked {
  background: rgba(192, 199, 212, 0.2);
  color: #707783;
}

.badge--cancelled {
  background: rgba(186, 26, 26, 0.1);
  color: #ba1a1a;
}
</style>