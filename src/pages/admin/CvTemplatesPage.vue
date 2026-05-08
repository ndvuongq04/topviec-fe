<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-[1.875rem] font-black text-slate-900 dark:text-slate-100 tracking-tight">Quản lý mẫu CV</h2>
        <p class="text-slate-500 text-[1rem] mt-1">Quản lý và tùy chỉnh danh sách các mẫu CV cung cấp cho người dùng trên hệ thống</p>
      </div>
      <div class="flex gap-3 items-center shrink-0">
        <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[1rem] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">file_download</span>
          Xuất danh sách
        </button>
        <button 
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[1rem] font-bold bg-[#963131] hover:bg-[#963131]/90 text-white transition-all shadow-sm cursor-pointer"
          @click="handleAdd"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
          Thêm mẫu CV
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <CvTemplateKpiCards :stats="kpiStats" />
    
    <!-- Filter -->
    <CvTemplateFilters v-model="filters" class="mt-14" />
    
    <!-- Table Container -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div class="relative">
        <CvTemplateTable 
          :templates="filteredTemplates"
          @preview="handlePreview"
          @edit="handleEdit"
          @archive="handleArchive"
        />

        <CvTemplatePagination 
          :current="currentPage" 
          :total="totalTemplates" 
          :per-page="perPage"
          @change="currentPage = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CvTemplateKpiCards from '@/components/admin/cv-templates/CvTemplateKpiCards.vue'
import CvTemplateFilters from '@/components/admin/cv-templates/CvTemplateFilters.vue'
import CvTemplateTable from '@/components/admin/cv-templates/CvTemplateTable.vue'
import CvTemplatePagination from '@/components/admin/cv-templates/CvTemplatePagination.vue'

const router = useRouter()
const currentPage = ref(1)
const perPage = ref(10)
const totalTemplates = ref(48)

const kpiStats = ref([
  { label: 'Tổng số mẫu CV', value: '48', icon: 'folder_copy', iconBg: '#e4e2dc', iconColor: '#574240', trend: 'Hoạt động: 32', trendVariant: 'up' },
  { label: 'Bản nháp', value: '10', icon: 'edit_document', iconBg: '#faeeda', iconColor: '#633806', trend: 'Cần hoàn thiện', trendVariant: 'warn' },
  { label: 'Mẫu Premium', value: '25', icon: 'workspace_premium', iconBg: '#eeedfe', iconColor: '#3c3489', trend: 'Tỉ lệ: 52%', trendVariant: 'neutral' },
  { label: 'Lượt sử dụng', value: '124.5K', icon: 'trending_up', iconBg: '#ffdad6', iconColor: '#ba1a1a', trend: '+12% tháng này', trendVariant: 'up' },
])

const filters = ref({ search: '', status: '', tier: '' })

const templates = ref([
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-631533a3c947?w=800&auto=format&fit=crop&q=60',
    name: 'Minimalist Executive',
    code: 'CV-MIN-01',
    categories: 'Marketing, Quản lý',
    features: ['ATS', '1-Page'],
    tier: 'premium', tierLabel: 'Premium',
    status: 'active', statusLabel: 'Đang hoạt động',
    usageCount: 12450,
    isDraft: false,
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop&q=60',
    name: 'Creative Developer',
    code: 'CV-DEV-04',
    categories: 'IT, Design',
    features: ['Image', 'Custom Color'],
    tier: 'free', tierLabel: 'Free',
    status: 'active', statusLabel: 'Đang hoạt động',
    usageCount: 45120,
    isDraft: false,
  },
  {
    id: 3,
    thumbnail: '',
    name: 'Finance Pro (Draft)',
    code: 'CV-FIN-02',
    categories: 'Tài chính, Kế toán',
    features: ['ATS'],
    tier: 'pro', tierLabel: 'Pro',
    status: 'draft', statusLabel: 'Bản nháp',
    usageCount: 0,
    isDraft: true,
  },
])

const filteredTemplates = computed(() => {
  return templates.value.filter(t => {
    const matchSearch = !filters.value.search ||
      t.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      t.code.toLowerCase().includes(filters.value.search.toLowerCase())
    const matchStatus = !filters.value.status || t.status === filters.value.status
    const matchTier = !filters.value.tier || t.tier === filters.value.tier
    return matchSearch && matchStatus && matchTier
  })
})

function handleAdd() {
  router.push({ name: 'admin-cv-template-create' })
}
function handlePreview(_id: number) { /* open preview modal */ }
function handleEdit(_id: number) { /* navigate to edit page */ }
function handleArchive(id: number) {
  templates.value = templates.value.filter(t => t.id !== id)
}
</script>

<style scoped>
/* Page layout is handled by Tailwind utility classes */
</style>
