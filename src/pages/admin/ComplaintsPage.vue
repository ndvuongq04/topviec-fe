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
import ComplaintKpiCards   from '@/components/admin/complaints/ComplaintKpiCards.vue'
import ComplaintFilters    from '@/components/admin/complaints/ComplaintFilters.vue'
import ComplaintTable, { type Complaint } from '@/components/admin/complaints/ComplaintTable.vue'
import ComplaintPagination from '@/components/admin/complaints/ComplaintPagination.vue'

const page = ref(1)
const filterState = ref({ search: '', type: '', priority: '', status: '' })

const allComplaints: Complaint[] = [
  {
    id: '#CN-2931', highlighted: true,
    sender: { name: 'Nguyễn Văn A', type: 'UV', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAElV9zpTLptafsPIcKeMYcnwpaqdvX6BjriNrAYyNc6q8Y0acdTALBUtj7rZYwGUuiLVKslWMZYJBPxWa7aqL-LdXjRzc13eIR8w1IgjDJHAXVHqbGbpJaeMbNGhFs3s4Y3y08dRb6T3Sg-rNWY7ocf9yHpIGTxaJXM97vU6y_aEghIC5ogsezJ51_2l0L8qn64sjvWuGN6l6DqHJUT0VjvN6IwKw4KJa-qg9okm1Na69wDuwOCKHEFvpNOoaKujey8LeQM-TAIwMy' },
    type: 'Tin lừa đảo', priority: 'urgent', date: 'Oct 24, 2023', status: 'processing',
  },
  {
    id: '#CN-2930',
    sender: { name: 'Công ty XYZ', type: 'NTT', initials: 'XY', initials_bg: '#1e5e4e' },
    type: 'Vấn đề thanh toán', priority: 'urgent', date: 'Oct 23, 2023', status: 'sent',
  },
  {
    id: '#CN-2929',
    sender: { name: 'Trần Thị B', type: 'UV', initials: 'TB', initials_bg: '#963131' },
    type: 'Tin lừa đảo', priority: 'important', date: 'Oct 22, 2023', status: 'pending',
  },
  {
    id: '#CN-2928',
    sender: { name: 'Công ty ABC', type: 'NTT', initials: 'AB', initials_bg: '#633806' },
    type: 'Vấn đề thanh toán', priority: 'normal', date: 'Oct 21, 2023', status: 'resolved',
  },
]

const filtered = computed(() => {
  const { search, type, priority, status } = filterState.value
  return allComplaints.filter(c => {
    const matchSearch   = !search   || c.id.includes(search) || c.sender.name.toLowerCase().includes(search.toLowerCase())
    const matchType     = !type     || (type === 'fraud' ? c.type === 'Tin lừa đảo' : c.type === 'Vấn đề thanh toán')
    const matchPriority = !priority || c.priority === priority
    const matchStatus   = !status   || c.status === status
    return matchSearch && matchType && matchPriority && matchStatus
  })
})

const onFilter = (f: typeof filterState.value) => { filterState.value = f; page.value = 1 }
const onSelect = (c: Complaint) => console.log('selected', c)
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