<template>
  <div class="space-y-8">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Dịch vụ lẻ</h2>
        <p class="text-slate-500 text-sm mt-1">Quản lý các dịch vụ bán lẻ theo nhóm phân loại.</p>
      </div>
      <button
        class="bg-[#963131] hover:bg-[#963131]/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#963131]/20 transition-all"
        @click="showCreateModal = true"
      >
        <span class="material-symbols-outlined text-lg">add</span>
        Thêm dịch vụ lẻ
      </button>
    </div>

    <!-- Filter -->
    <RetailServiceFilters :groups="groups" @filter="onFilter" />

    <!-- Groups Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

      <!-- Loading -->
      <div v-if="addonStore.loading" class="flex items-center justify-center py-20">
        <div class="text-slate-400 text-sm flex items-center gap-2">
          <span class="material-symbols-outlined animate-spin">progress_activity</span>
          Đang tải dữ liệu...
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="fetchError" class="flex flex-col items-center justify-center py-20 text-red-500 gap-2">
        <span class="material-symbols-outlined text-4xl">error</span>
        <p class="text-sm font-semibold">{{ fetchError }}</p>
        <button
          class="mt-2 text-xs text-slate-500 hover:text-slate-700 underline"
          @click="loadAddonPackages"
        >
          Thử lại
        </button>
      </div>

      <!-- Content -->
      <div v-else class="p-6 flex flex-col gap-10">
        <RetailServiceGroup
          v-for="group in filteredGroups"
          :key="group.key"
          :group="group"
          :toggling-id="togglingId"
          @add="onAdd"
          @edit="onEdit"
          @toggle="onToggle"
        />
        <div v-if="filteredGroups.length === 0" class="flex flex-col items-center justify-center py-16 text-slate-400">
          <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
          <p class="text-sm">Không tìm thấy dịch vụ phù hợp</p>
        </div>
      </div>

    </div>

    <!-- Create Modal -->
    <AddonPackageCreateModal
      :visible="showCreateModal"
      :submitting="creating"
      :default-group="createGroup"
      @close="showCreateModal = false; createGroup = ''"
      @submit="onCreateSubmit"
    />

    <!-- Edit Modal -->
    <AddonPackageEditModal
      :visible="showEditModal"
      :submitting="editing"
      :addon="selectedAddon"
      @close="showEditModal = false"
      @submit="onEditSubmit"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import RetailServiceFilters from '@/components/admin/retail-services/RetailServiceFilters.vue'
import RetailServiceGroup, { type ServiceGroup } from '@/components/admin/retail-services/RetailServiceGroup.vue'
import AddonPackageCreateModal from '@/components/admin/retail-services/AddonPackageCreateModal.vue'
import AddonPackageEditModal from '@/components/admin/retail-services/AddonPackageEditModal.vue'
import type { RetailService } from '@/components/admin/retail-services/RetailServiceTable.vue'
import { useAddonPackageStore } from '@/stores/addonPackage.store'
import { useToast } from '@/composables/useToast'
import type { ReqAddonPackageDTO, ResAddonPackageDTO } from '@/types/servicePackage.types'
import type { AddonPackageGroup } from '@/constants/servicePackage.constants'

const addonStore = useAddonPackageStore()
const { addonPackages } = storeToRefs(addonStore)
const toast = useToast()

const showCreateModal = ref(false)
const creating        = ref(false)
const createGroup     = ref<AddonPackageGroup | ''>('')
const showEditModal   = ref(false)
const editing         = ref(false)
const selectedAddon   = ref<ResAddonPackageDTO | null>(null)
const togglingId      = ref<number | null>(null)
const fetchError      = ref<string | null>(null)
const filterState     = ref({ search: '', group: '', status: '' })

// ─── Map API data → ServiceGroup ─────────────────────────────────────────────
const groups = computed<ServiceGroup[]>(() => {
  const map = new Map<string, ServiceGroup>()

  for (const pkg of addonPackages.value) {
    if (!map.has(pkg.groupCode)) {
      map.set(pkg.groupCode, {
        key:        pkg.groupCode,
        label:      pkg.groupName,
        badgeBg:    '#E1F5EE',
        badgeColor: '#085041',
        services:   [],
      })
    }

    const group = map.get(pkg.groupCode)!
    const service: RetailService = {
      id:          pkg.id,
      name:        pkg.name,
      description: pkg.description ?? '',
      price:       pkg.price.toLocaleString('vi-VN') + ' đ',
      duration:    pkg.durationDays != null ? `${pkg.durationDays} ngày` : 'Vô thời hạn',
      unit:        'Theo lần',
      active:      pkg.isActive,
    }
    group.services.push(service)
  }

  return Array.from(map.values())
})

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

// ─── Fetch ────────────────────────────────────────────────────────────────────
async function loadAddonPackages() {
  fetchError.value = null
  await addonStore.fetchAddonPackages()
  if (addonStore.error) fetchError.value = addonStore.error
}

onMounted(loadAddonPackages)

// ─── Handlers ────────────────────────────────────────────────────────────────
const onFilter = (f: typeof filterState.value) => { filterState.value = f }

function onAdd(groupKey: string) {
  createGroup.value     = groupKey as AddonPackageGroup
  showCreateModal.value = true
}

function onEdit(svc: RetailService) {
  const found = addonPackages.value.find(p => p.id === svc.id)
  if (found) {
    selectedAddon.value = found
    showEditModal.value = true
  }
}

async function onCreateSubmit(payload: ReqAddonPackageDTO) {
  creating.value = true
  try {
    await addonStore.createAddonPackage(payload)
    showCreateModal.value = false
    createGroup.value     = ''
    toast.success('Thành công!', `Đã tạo dịch vụ "${payload.name}"`)
  } catch {
    toast.error('Lỗi!', addonStore.error || 'Không thể tạo dịch vụ lẻ')
  } finally {
    creating.value = false
  }
}

async function onToggle(svc: RetailService) {
  const pkg = addonPackages.value.find(p => p.id === svc.id)
  if (!pkg) return
  togglingId.value = pkg.id
  try {
    await addonStore.updateAddonPackage(pkg.id, {
      groupCode:    pkg.groupCode,
      name:         pkg.name,
      code:         pkg.code,
      price:        pkg.price,
      durationDays: pkg.durationDays,
      description:  pkg.description,
      isActive:     !pkg.isActive,
    })
    toast.success('Thành công!', `Đã ${!pkg.isActive ? 'bật' : 'tắt'} dịch vụ "${pkg.name}"`)
  } catch {
    toast.error('Lỗi!', addonStore.error || 'Không thể cập nhật trạng thái')
  } finally {
    togglingId.value = null
  }
}

async function onEditSubmit(id: number, payload: ReqAddonPackageDTO) {
  editing.value = true
  try {
    await addonStore.updateAddonPackage(id, payload)
    showEditModal.value = false
    toast.success('Thành công!', `Đã cập nhật dịch vụ "${payload.name}"`)
  } catch {
    toast.error('Lỗi!', addonStore.error || 'Không thể cập nhật dịch vụ lẻ')
  } finally {
    editing.value = false
  }
}
</script>
