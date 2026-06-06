<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const props = defineProps<{ orderCode: string }>()

const breadcrumbs = computed(() => [
  { label: 'Đơn hàng', to: '/admin/orders' },
  { label: props.orderCode },
])
</script>

<template>
  <div class="detail-nav">
    <Breadcrumb :items="breadcrumbs" :hide-home="true" />
  </div>
</template>

<style scoped>
.detail-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}
</style>
