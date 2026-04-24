<template>
  <div class="saved-filters">
    <div class="saved-filters__search-wrap">
      <span class="material-symbols-outlined saved-filters__search-icon">search</span>
      <input class="saved-filters__input" placeholder="Tìm tên, email, kỹ năng..." type="text" />
    </div>
    <div class="saved-filters__selects">
      <select class="saved-filters__select">
        <option value="">Tất cả nhãn</option>
        <option value="tiem-nang">Tiềm năng</option>
        <option value="uu-tien">Ưu tiên</option>
      </select>
      <select class="saved-filters__select">
        <option value="">Ngành nghề</option>
        <option value="it">IT - Phần mềm</option>
        <option value="marketing">Marketing</option>
      </select>
      <button class="saved-filters__filter-btn">
        <span class="material-symbols-outlined">filter_list</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" />

<style scoped>
.saved-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.saved-filters__search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.saved-filters__search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.25rem;
  pointer-events: none;
}

.saved-filters__input {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: none;
  border-radius: 0.5rem;
  background: #f1f4f9;
  color: #0f172a;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  transition: box-shadow 0.2s;
}

.saved-filters__input:focus {
  box-shadow: 0 0 0 2px rgba(75, 154, 246, 0.2);
}

.saved-filters__selects {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.saved-filters__select {
  padding: 8px 12px;
  border: none;
  border-radius: 0.5rem;
  background: #f1f4f9;
  color: #0f172a;
  cursor: pointer;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
}

.saved-filters__filter-btn {
  display: flex;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 0.5rem;
  background: #f1f4f9;
  cursor: pointer;
  transition: background 0.15s;
}

.saved-filters__filter-btn:hover {
  background: #e9edf5;
}

.saved-filters__filter-btn .material-symbols-outlined {
  color: #0f172a;
  font-size: 1.25rem;
}
</style>
