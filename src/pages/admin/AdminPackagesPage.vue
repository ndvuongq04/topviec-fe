<template>
  <div class="pkg-page">

    <!-- Page Header -->
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Gói dịch vụ</h2>
        <p class="text-slate-500 text-sm mt-1">Quản lý các gói subscription và cấu hình đặc quyền cho từng cấp độ người dùng</p>
      </div>
    </div>

    <PackageFilters @filter="onFilter" />
    <PackageTable :packages="filtered" @edit="onEdit" />
    <PackageKpiCards />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PackageFilters from '@/components/admin/packages/PackageFilters.vue'
import PackageTable, { type Package } from '@/components/admin/packages/PackageTable.vue'
import PackageKpiCards from '@/components/admin/packages/PackageKpiCards.vue'

const packages = ref<Package[]>([
  { id:1, name:'VIP Package',   priceMonth:'1.299.000 đ', priceYear:'12.990.000 đ', feature:'Hỗ trợ tuyển dụng 1:1, Tiếp cận 100% CV', active:true,  badgeBg:'#FAECE7', badgeColor:'#712B13' },
  { id:2, name:'Premium Tier',  priceMonth:'599.000 đ',   priceYear:'5.990.000 đ',  feature:'Đẩy tin tự động, Lọc ứng viên AI',          active:true,  badgeBg:'#FAEEDA', badgeColor:'#633806' },
  { id:3, name:'Professional',  priceMonth:'299.000 đ',   priceYear:'2.990.000 đ',  feature:'Đăng tin không giới hạn, Top-up Credit',     active:false, badgeBg:'#EEEDFE', badgeColor:'#3C3489' },
  { id:4, name:'Basic Plan',    priceMonth:'149.000 đ',   priceYear:'1.490.000 đ',  feature:'Đăng 10 tin/tháng, Xem 20 CV tiềm năng',    active:true,  badgeBg:'#E1F5EE', badgeColor:'#085041' },
  { id:5, name:'Free Tier',     priceMonth:'Miễn phí',    priceYear:'Miễn phí',     feature:'Đăng 3 tin/tháng, Tính năng cơ bản',        active:true,  badgeBg:'#F1EFE8', badgeColor:'#444441' },
])

const filterState = ref({ search: '', status: '' })
const filtered = computed(() => packages.value.filter(p => {
  const s = filterState.value
  return p.name.toLowerCase().includes(s.search.toLowerCase())
    && (!s.status || (s.status === 'active' ? p.active : !p.active))
}))

const onFilter = (f: typeof filterState.value) => { filterState.value = f }
const onEdit = (pkg: Package) => console.log('edit', pkg)
</script>

<style scoped>
.pkg-page {

  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>