<template>
  <div class="cop-page">
    <div class="cop-welcome">
      <h1 class="cop-title">Tổng quan</h1>
      <p class="cop-desc">Quản lý và xử lý khiếu nại của người dùng hiệu quả.</p>
    </div>

    <ComplaintKpiCards />

    <ComplaintFilters @filter="onFilter" />

    <div class="cop-card">
      <ComplaintTable :complaints="filtered" @select="onSelect" />
      <ComplaintPagination :current="page" :total="128" @change="page = $event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ComplaintKpiCards   from '@/components/admin/complaints/ComplaintKpiCards.vue'
import ComplaintFilters    from '@/components/admin/complaints/ComplaintFilters.vue'
import ComplaintTable, { type Complaint } from '@/components/admin/complaints/ComplaintTable.vue'
import ComplaintPagination from '@/components/admin/complaints/ComplaintPagination.vue'

const router = useRouter()
const page = ref(1)
const filterState = ref({ search: '', category: '', group: '', status: '' })

const allComplaints: Complaint[] = [
  {
    id: '#BC-2931', highlighted: true,
    reporter: { name: 'Nguyễn Văn A', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAElV9zpTLptafsPIcKeMYcnwpaqdvX6BjriNrAYyNc6q8Y0acdTALBUtj7rZYwGUuiLVKslWMZYJBPxWa7aqL-LdXjRzc13eIR8w1IgjDJHAXVHqbGbpJaeMbNGhFs3s4Y3y08dRb6T3Sg-rNWY7ocf9yHpIGTxaJXM97vU6y_aEghIC5ogsezJ51_2l0L8qn64sjvWuGN6l6DqHJUT0VjvN6IwKw4KJa-qg9okm1Na69wDuwOCKHEFvpNOoaKujey8LeQM-TAIwMy' },
    target: { jobTitle: 'Senior Frontend Developer', employerName: 'Công ty ABC Tech' },
    category: 'fraud', group: 'B',
    status: 'processing', date: '24/10/2023', deadlineHours: 2, hasEvidence: true,
  },
  {
    id: '#BC-2930',
    reporter: { name: 'Trần Thị B', initials: 'TB', initials_bg: '#963131' },
    target: { jobTitle: 'Kế toán tổng hợp', employerName: 'Công ty XYZ Finance' },
    category: 'fee-abuse', group: 'B',
    status: 'pending', date: '23/10/2023', deadlineHours: 18, hasEvidence: true,
  },
  {
    id: '#BC-2929',
    reporter: { name: 'Lê Văn C', initials: 'LC', initials_bg: '#1e5e4e' },
    target: { jobTitle: 'Marketing Executive', employerName: 'Công ty DEF Media' },
    category: 'missing-info', group: 'A',
    status: 'pending', date: '22/10/2023', deadlineHours: 36, hasEvidence: false,
  },
  {
    id: '#BC-2928',
    reporter: { name: 'Phạm Thị D', initials: 'PD', initials_bg: '#633806' },
    target: { jobTitle: 'Java Backend Developer', employerName: 'Công ty GHI Solutions' },
    category: 'duplicate', group: 'A',
    status: 'auto-closed', date: '21/10/2023', deadlineHours: 0, hasEvidence: false,
  },
  {
    id: '#BC-2927',
    reporter: { name: 'Hoàng Văn E', initials: 'HE', initials_bg: '#2c4a8e' },
    target: { jobTitle: 'HR Manager', employerName: 'Công ty JKL Group' },
    category: 'company-mismatch', group: 'A',
    status: 'resolved', date: '20/10/2023', deadlineHours: 0, hasEvidence: false,
  },
  {
    id: '#BC-2926',
    reporter: { name: 'Vũ Thị F', initials: 'VF', initials_bg: '#4a2c8e' },
    target: { jobTitle: 'Business Analyst', employerName: 'Công ty MNO Consulting' },
    category: 'fraud', group: 'B',
    status: 'pending', date: '19/10/2023', deadlineHours: -2, hasEvidence: true,
  },
]

const filtered = computed(() => {
  const { search, category, group, status } = filterState.value
  return allComplaints.filter(c => {
    const matchSearch   = !search   || c.id.includes(search) || c.reporter.name.toLowerCase().includes(search.toLowerCase()) || c.target.employerName.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !category || c.category === category
    const matchGroup    = !group    || c.group === group
    const matchStatus   = !status   || c.status === status
    return matchSearch && matchCategory && matchGroup && matchStatus
  })
})

const onFilter = (f: typeof filterState.value) => { filterState.value = f; page.value = 1 }
const onSelect = (c: Complaint) => {
  router.push({
    name: 'admin-complaint-detail',
    params: { id: c.id.replace('#', '') },
  })
}
</script>

<style scoped>
.cop-page {
  
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.cop-title {
  font-size: 1.875rem; font-weight: 900; font-family: 'Manrope', sans-serif;
  letter-spacing: -0.02em; color: #1b1c18; margin-bottom: 4px;
}
.cop-desc { font-size: 0.875rem; color: #574240; font-family: 'Manrope', sans-serif; }
.cop-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}
</style>
