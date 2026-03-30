<template>
  <section class="section-card">
    <div class="section-header">
      <div class="icon-wrap icon-indigo">
        <span class="material-symbols-outlined">psychology</span>
      </div>
      <h3 class="section-title">Kỹ năng &amp; Kinh nghiệm</h3>
    </div>

    <div class="grid-2col">
      <!-- Skill tags -->
      <div>
        <label class="field-label">Kỹ năng yêu cầu</label>
        <div class="tags-input" @click="focusInput">
          <span
            v-for="(skill, i) in skills"
            :key="i"
            class="skill-tag"
          >
            {{ skill }}
            <button type="button" @click.stop="removeSkill(i)">
              <span class="material-symbols-outlined">close</span>
            </button>
          </span>
          <input
            ref="skillInput"
            v-model="newSkill"
            class="tag-input"
            placeholder="Thêm kỹ năng..."
            type="text"
            @keydown.enter.prevent="addSkill"
            @keydown.comma.prevent="addSkill"
          />
        </div>
        <p class="hint">Nhấn Enter để thêm từng kỹ năng</p>
      </div>

      <!-- Experience range -->
      <div>
        <label class="field-label">Số năm kinh nghiệm</label>
        <div class="exp-range">
          <div class="exp-field">
            <input
              v-model.number="form.expMin"
              class="field-input"
              placeholder="Tối thiểu"
              min="0"
              type="number"
            />
            <span class="exp-unit">Năm</span>
          </div>
          <span class="exp-dash">—</span>
          <div class="exp-field">
            <input
              v-model.number="form.expMax"
              class="field-input"
              placeholder="Tối đa"
              min="0"
              type="number"
            />
            <span class="exp-unit">Năm</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const skills = ref<string[]>(['ReactJS', 'TailwindCSS'])
const newSkill = ref('')
const skillInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  expMin: null as number | null,
  expMax: null as number | null,
})

function addSkill() {
  const val = newSkill.value.trim().replace(/,$/, '')
  if (val && !skills.value.includes(val)) {
    skills.value.push(val)
  }
  newSkill.value = ''
}

function removeSkill(index: number) {
  skills.value.splice(index, 1)
}

function focusInput() {
  skillInput.value?.focus()
}
</script>

<style scoped>
.section-card {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  border: 1px solid #f1f5f9;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.icon-wrap {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-indigo { background: #eef2ff; color: #4f46e5; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #0f172a; }

.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

/* Tags */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #fff;
  min-height: 3.25rem;
  cursor: text;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.tags-input:focus-within {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: rgba(75,154,246,.1);
  color: #4B9AF6;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
}
.skill-tag button {
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  padding: 0;
  line-height: 1;
}
.skill-tag button .material-symbols-outlined { font-size: 0.875rem; }
.tag-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  background: transparent;
  min-width: 7.5rem;
  padding: 0.25rem;
}
.tag-input::placeholder { color: #94a3b8; }
.hint { font-size: 0.75rem; color: #94a3b8; margin-top: 0.375rem; }

/* Experience range */
.exp-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.exp-field { position: relative; flex: 1; }
.field-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field-input:focus {
  border-color: #4B9AF6;
  box-shadow: 0 0 0 4px rgba(75,154,246,.1);
}
.exp-unit {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  pointer-events: none;
}
.exp-dash { color: #94a3b8; font-weight: 700; }

@media (max-width: 768px) {
  .grid-2col { grid-template-columns: 1fr; }
}
</style>
