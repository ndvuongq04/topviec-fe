<template>
  <div class="space-y-8">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Dịch vụ lẻ</h2>
        <p class="text-slate-500 text-sm mt-1">Quản lý các dịch vụ bán lẻ theo nhóm phân loại.</p>
      </div>
    </div>

    <!-- Filter -->
    <RetailServiceFilters :groups="groups" @filter="onFilter" />

    <!-- Groups Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div class="p-6 flex flex-col gap-10">
        <RetailServiceGroup
          v-for="group in filteredGroups"
          :key="group.key"
          :group="group"
          @add="onAdd"
          @edit="onEdit"
        />
        <div v-if="filteredGroups.length === 0" class="flex flex-col items-center justify-center py-16 text-slate-400">
          <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
          <p class="text-sm">Không tìm thấy dịch vụ phù hợp</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RetailServiceFilters from '@/components/admin/retail-services/RetailServiceFilters.vue'
import RetailServiceGroup, { type ServiceGroup } from '@/components/admin/retail-services/RetailServiceGroup.vue'
import type { RetailService } from '@/components/admin/retail-services/RetailServiceTable.vue'

const groups = ref<ServiceGroup[]>([
  {
    key: 'job', label: 'Nhóm tin tuyển dụng', badgeBg: '#E1F5EE', badgeColor: '#085041',
    services: [
      { id:1, name:'Đăng tin Tuyển dụng cơ bản', description:'Hiển thị tin ở mục tin thường',      price:'99.000 đ/7 ngày',       duration:'7 ngày',       unit:'Theo lần',      active:true  },
      { id:2, name:'Tin Tuyển dụng Hot',          description:'Đẩy tin lên đầu trang chuyên mục',  price:'250.000 đ/7 ngày',      duration:'7 ngày',       unit:'Theo lần',      active:true  },
    ]
  },
  {
    key: 'profile', label: 'Nhóm hồ sơ & ứng viên', badgeBg: '#EEEDFE', badgeColor: '#3C3489',
    services: [
      { id:3, name:'Mở khóa hồ sơ ứng viên', description:'Xem thông tin liên hệ của 01 ứng viên', price:'50.000 đ/lượt', duration:'Vô thời hạn', unit:'Theo hồ sơ', active:true },
    ]
  },
  {
    key: 'brand', label: 'Nhóm thương hiệu', badgeBg: '#FAEEDA', badgeColor: '#633806',
    services: [
      { id:4, name:'Top Employer Banner',          description:'Banner thương hiệu tại trang chủ',  price:'5.000.000 đ/tháng', duration:'30 ngày',      unit:'Theo vị trí',   active:true  },
      { id:5, name:'Bài viết quảng bá doanh nghiệp', description:'01 bài viết PR trên blog & fanpage', price:'2.000.000 đ/bài', duration:'Vô thời hạn', unit:'Theo bài viết', active:false },
    ]
  },
])

const filterState = ref({ search: '', group: '', status: '' })

const filteredGroups = computed(() => {
  const { search, group, status } = filterState.value
  return groups.value
    .filter(g => !group || g.key === group)
    .map(g => ({
      ...g,
      services: g.services.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
        const matchStatus = !status || (status === 'active' ? s.active : !s.active)
        return matchSearch && matchStatus
      })
    }))
    .filter(g => g.services.length > 0)
})

const onFilter = (f: typeof filterState.value) => { filterState.value = f }
const onAdd = (key: string) => console.log('add to group', key)
const onEdit = (svc: RetailService) => console.log('edit', svc)
</script>
