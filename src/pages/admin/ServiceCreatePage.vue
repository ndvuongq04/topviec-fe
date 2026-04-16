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
      @open-create-group="showGroupModal = true"
      @submit="handleSubmit"
    />

    <ServiceListTable
      :items="serviceItems"
      @toggle="handleToggle"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <ServiceTipCards />

    <CreateGroupModal
      v-if="showGroupModal"
      @close="showGroupModal = false"
      @created="handleGroupCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ServiceCreateForm from '@/components/admin/create-services/ServiceCreateForm.vue'
import ServiceListTable from '@/components/admin/create-services/ServiceListTable.vue'
import ServiceTipCards from '@/components/admin/create-services/ServiceTipCards.vue'
import CreateGroupModal from '@/components/admin/create-services/CreateGroupModal.vue'

const showGroupModal = ref(false)

const serviceGroups = ref([
  { value: 'recruitment', icon: 'campaign', label: 'Tin tuyển dụng' },
  { value: 'candidates', icon: 'person_search', label: 'Hồ sơ & Ứng viên' },
  { value: 'branding', icon: 'workspace_premium', label: 'Thương hiệu' },
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

function handleGroupCreated(group: { value: string; icon: string; label: string }) {
  serviceGroups.value.push(group)
  showGroupModal.value = false
}
</script>