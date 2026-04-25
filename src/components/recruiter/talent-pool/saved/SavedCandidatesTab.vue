<template>
  <div class="saved-tab">
    <CandidateDetailModal v-model="showModal" :talent-pool-id="selectedTalentPoolId" />

    <EditNoteModal
      :visible="showEditNote"
      :candidate-name="editNoteCandidate?.candidateName"
      :initial-note="editNoteCandidate?.note"
      :loading="savingNote"
      @close="showEditNote = false"
      @confirm="handleSaveNote"
    />

    <SavedCandidatesFilters
      v-model:search="search"
      v-model:source="source"
      @do-search="onSearch"
    />

    <!-- Loading -->
    <div v-if="loading" class="saved-tab__loading">
      <span class="material-symbols-outlined saved-tab__spinner">progress_activity</span>
      <span>Đang tải...</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!loading && candidates.length === 0" class="saved-tab__empty">
      <span class="material-symbols-outlined saved-tab__empty-icon">group_off</span>
      <p>Chưa có ứng viên nào trong TalentPool.</p>
    </div>

    <!-- Grid -->
    <div v-else class="saved-tab__grid">
      <SavedCandidateCard
        v-for="c in candidates"
        :key="c.talentPoolId"
        :candidate="c"
        @view-detail="openDetail"
        @edit-note="openEditNote"
        @delete="openDeleteConfirm"
      />
    </div>

    <CandidatePagination
      v-if="totalPages > 0"
      :current="currentPage"
      :total-pages="totalPages"
      :total="total"
      :page-size="pageSize"
      :show-info="true"
      @change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SavedCandidatesFilters from './SavedCandidatesFilters.vue'
import SavedCandidateCard from './SavedCandidateCard.vue'
import CandidatePagination from '../shared/CandidatePagination.vue'
import CandidateDetailModal from './CandidateDetailModal.vue'
import EditNoteModal from './EditNoteModal.vue'
import { useConfirm } from '@/composables/useConfirm'
import employerTalentPoolService from '@/services/employerTalentPool.service'
import type { ResTalentPoolCandidateDTO } from '@/services/employerTalentPool.service'
import { useToast } from '@/composables/useToast'

const emit = defineEmits<{ 'update:total': [value: number] }>()
const toast = useToast()
const { confirm } = useConfirm()

// ─── Detail modal ────────────────────────────────────────────────────────────
const showModal = ref(false)
const selectedTalentPoolId = ref<number | null>(null)

function openDetail(talentPoolId: number) {
  selectedTalentPoolId.value = talentPoolId
  showModal.value = true
}

// ─── Edit note ───────────────────────────────────────────────────────────────
const showEditNote       = ref(false)
const savingNote         = ref(false)
const editNoteCandidate  = ref<ResTalentPoolCandidateDTO | null>(null)

function openEditNote(talentPoolId: number) {
  editNoteCandidate.value = candidates.value.find(c => c.talentPoolId === talentPoolId) ?? null
  showEditNote.value = true
}

async function handleSaveNote(note: string) {
  if (!editNoteCandidate.value) return
  savingNote.value = true
  try {
    await employerTalentPoolService.updateNote(editNoteCandidate.value.talentPoolId, note)
    const target = candidates.value.find(c => c.talentPoolId === editNoteCandidate.value!.talentPoolId)
    if (target) target.note = note || undefined
    showEditNote.value = false
    toast.success('Đã lưu', 'Ghi chú đã được cập nhật.')
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? 'Lưu ghi chú thất bại, vui lòng thử lại.'
    toast.error('Lỗi', typeof msg === 'string' ? msg : msg?.[0])
  } finally {
    savingNote.value = false
  }
}

// ─── Delete ──────────────────────────────────────────────────────────────────
async function openDeleteConfirm(talentPoolId: number) {
  const candidate = candidates.value.find(c => c.talentPoolId === talentPoolId)
  const ok = await confirm({
    title: 'Xóa ứng viên khỏi Talent Pool?',
    message: `Ứng viên "${candidate?.candidateName ?? ''}" sẽ bị xóa vĩnh viễn khỏi danh sách tiềm năng. Hành động này không thể hoàn tác.`,
    confirmText: 'Xóa vĩnh viễn',
    confirmColor: 'red',
    icon: 'delete_forever',
  })
  if (!ok) return
  try {
    await employerTalentPoolService.removeFromTalentPool(talentPoolId)
    candidates.value = candidates.value.filter(c => c.talentPoolId !== talentPoolId)
    total.value -= 1
    emit('update:total', total.value)
    toast.success('Đã xóa', 'Ứng viên đã được xóa khỏi Talent Pool.')
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? 'Xóa thất bại, vui lòng thử lại.'
    toast.error('Lỗi', typeof msg === 'string' ? msg : msg?.[0])
  }
}

// ─── Fetch ───────────────────────────────────────────────────────────────────
const candidates  = ref<ResTalentPoolCandidateDTO[]>([])
const loading     = ref(false)
const total       = ref(0)
const totalPages  = ref(0)
const currentPage = ref(1)
const pageSize    = 10
const search      = ref('')
const source      = ref('')

async function fetchData(page = 1) {
  loading.value = true
  try {
    const res = await employerTalentPoolService.getTalentPool({
      search: search.value || undefined,
      source: source.value || undefined,
      page:   page - 1,
      size:   pageSize,
    })
    candidates.value  = res.result
    total.value       = res.meta.totals
    totalPages.value  = res.meta.pages
    emit('update:total', res.meta.totals)
    currentPage.value = page
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? 'Không thể tải danh sách TalentPool.'
    toast.error('Lỗi', typeof msg === 'string' ? msg : msg?.[0])
  } finally {
    loading.value = false
  }
}

function onSearch()             { fetchData(1) }
function onPageChange(p: number) { fetchData(p) }

onMounted(() => fetchData(1))
</script>

<style scoped>
.saved-tab { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 1.5rem; }

.saved-tab__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
}
@media (max-width: 1280px) { .saved-tab__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px)  { .saved-tab__grid { grid-template-columns: 1fr; } }

.saved-tab__loading {
  display: flex; align-items: center; justify-content: center;
  gap: 0.75rem; padding: 4rem 0; color: #64748b; font-size: 0.9375rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
.saved-tab__spinner { font-size: 1.75rem !important; color: #4b9af6; animation: spin 0.8s linear infinite; }

.saved-tab__empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.75rem; padding: 4rem 0; color: #94a3b8;
}
.saved-tab__empty-icon { font-size: 3rem !important; }
.saved-tab__empty p { font-size: 0.9375rem; font-weight: 600; }

</style>
