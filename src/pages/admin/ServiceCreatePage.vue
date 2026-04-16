<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Chi tiết dịch vụ</h2>
        <p class="text-slate-500 text-sm mt-1">Điền thông tin chi tiết để cấu hình gói dịch vụ lẻ mới trong hệ thống.</p>
      </div>
    </div>

    <ServiceCreateForm
      :groups="serviceGroups"
      @submit="handleSubmit"
    />

    <ServiceListTable
      :items="serviceItems"
      @toggle="handleToggle"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <ServiceTipCards />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ServiceCreateForm from '@/components/admin/create-services/ServiceCreateForm.vue'
import ServiceListTable from '@/components/admin/create-services/ServiceListTable.vue'
import ServiceTipCards from '@/components/admin/create-services/ServiceTipCards.vue'
import {
  AddonPackageGroup,
  ADDON_PACKAGE_GROUP_LABELS,
  ADDON_GROUP_ICON_MAP
} from '@/constants/servicePackage.constants'

const serviceGroups = ref([
  {
    value: AddonPackageGroup.JOB_POSTING,
    icon: ADDON_GROUP_ICON_MAP[AddonPackageGroup.JOB_POSTING].icon,
    label: ADDON_PACKAGE_GROUP_LABELS[AddonPackageGroup.JOB_POSTING]
  },
  {
    value: AddonPackageGroup.CANDIDATE,
    icon: ADDON_GROUP_ICON_MAP[AddonPackageGroup.CANDIDATE].icon,
    label: ADDON_PACKAGE_GROUP_LABELS[AddonPackageGroup.CANDIDATE]
  },
  {
    value: AddonPackageGroup.BRANDING,
    icon: ADDON_GROUP_ICON_MAP[AddonPackageGroup.BRANDING].icon,
    label: ADDON_PACKAGE_GROUP_LABELS[AddonPackageGroup.BRANDING]
  },
  {
    value: AddonPackageGroup.ADDON_PACKAGE_GROUP,
    icon: ADDON_GROUP_ICON_MAP[AddonPackageGroup.ADDON_PACKAGE_GROUP].icon,
    label: ADDON_PACKAGE_GROUP_LABELS[AddonPackageGroup.ADDON_PACKAGE_GROUP]
  }
])

const serviceItems = ref([
  { id: 1, name: 'Tin khẩn cấp', group: 'Tin tuyển dụng', groupIcon: 'campaign', active: true },
  { id: 2, name: 'Gia hạn tin 14 ngày', group: 'Tin tuyển dụng', groupIcon: 'campaign', active: true },
  { id: 3, name: 'Đẩy tin tự động', group: 'Tin tuyển dụng', groupIcon: 'campaign', active: false },
])

function handleSubmit(payload: { group: string; name: string }) {
  // gọi API tạo dịch vụ
  console.log('Create service:', payload)
}

function handleToggle(id: number) {
  const item = serviceItems.value.find(i => i.id === id)
  if (item) item.active = !item.active
}

function handleEdit(id: number) {
  // mở edit
}

function handleDelete(id: number) {
  serviceItems.value = serviceItems.value.filter(i => i.id !== id)
}
</script>