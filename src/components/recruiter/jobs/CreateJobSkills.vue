<template>
  <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        <span class="material-symbols-outlined">psychology</span>
      </div>
      <h3 class="text-xl font-bold">Kỹ năng &amp; Kinh nghiệm</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Kỹ năng tags -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Kỹ năng yêu cầu (Tags)</label>
        <div class="flex flex-wrap gap-2 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <span
            v-for="(skill, i) in modelValue.skills"
            :key="i"
            class="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
          >
            {{ skill.name }}
            <span class="material-symbols-outlined text-sm cursor-pointer" @click="removeSkill(i)">close</span>
          </span>
          <SearchableSelect
            v-model="selectedSkillId"
            :options="skillOptions"
            placeholder="-- Chọn thêm kỹ năng --"
            class="flex-1 min-w-[200px]"
            @change="addSkill"
          />
        </div>
      </div>

      <!-- Số năm kinh nghiệm -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Số năm kinh nghiệm</label>
        <div class="flex items-center gap-3">
          <div class="relative flex-1">
            <input
              :value="modelValue.expMin"
              class="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
              placeholder="Tối thiểu"
              type="number"
              @input="emit('update:modelValue', { ...modelValue, expMin: Number(($event.target as HTMLInputElement).value) })"
            />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">Năm</span>
          </div>
          <span class="text-slate-500">-</span>
          <div class="relative flex-1">
            <input
              :value="modelValue.expMax"
              class="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none"
              placeholder="Tối đa"
              type="number"
              @input="emit('update:modelValue', { ...modelValue, expMax: Number(($event.target as HTMLInputElement).value) })"
            />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">Năm</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSkillStore } from '@/stores/skill.store'
import SearchableSelect from '@/components/ui/SearchableSelect.vue'

export interface SkillItem {
  id: number
  name: string
}

export interface SkillsData {
  skills: SkillItem[]
  expMin: number | null
  expMax: number | null
}

const props = defineProps<{
  modelValue: SkillsData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SkillsData]
}>()

const skillStore = useSkillStore()

const skillOptions = computed(() => {
  return skillStore.skills.map(s => ({ id: s.id.toString(), name: s.name }))
})

onMounted(() => {
  if (skillStore.skills.length === 0) {
    skillStore.fetchSkills({ size: 100 })
  }
})

const selectedSkillId = ref('')

function addSkill(option?: { id: string | number, name: string }) {
  if (!option) return
  const id = parseInt(option.id.toString())
  
  if (!props.modelValue.skills.some(s => s.id === id)) {
    emit('update:modelValue', {
      ...props.modelValue,
      skills: [...props.modelValue.skills, { id, name: option.name }],
    })
  }
  
  // Try to reset selection after a small tick so the SearchableSelect UI clears
  setTimeout(() => {
    selectedSkillId.value = ''
  }, 10)
}

function removeSkill(index: number) {
  const updated = [...props.modelValue.skills]
  updated.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, skills: updated })
}
</script>
