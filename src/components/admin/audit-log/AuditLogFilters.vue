<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#963131]/5 overflow-hidden mb-8">
    <div class="p-4 flex flex-wrap gap-3 items-center">
      
      <!-- Search -->
      <div class="flex-1 min-w-64 flex items-center bg-slate-50 dark:bg-white/5 rounded-lg px-4 border border-[#963131]/5 focus-within:ring-2 focus-within:ring-[#963131]/20 transition-all">
        <span class="material-symbols-outlined text-slate-400 text-xl">search</span>
        <input 
          type="text" 
          class="bg-transparent border-none focus:ring-0 text-base w-full py-3 outline-none ml-2" 
          placeholder="Tìm kiếm theo Admin, IP, Trace ID..."
        />
      </div>

      <!-- Vai trò -->
      <select class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300">
        <option value="" disabled selected>Vai trò (Role)</option>
        <option value="superadmin">Super Admin</option>
        <option value="moderator">Moderator</option>
        <option value="support">Support</option>
      </select>

      <!-- Danh mục -->
      <select class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300">
        <option value="" disabled selected>Danh mục</option>
        <option value="auth">Authentication</option>
        <option value="user">User Management</option>
        <option value="billing">Billing</option>
      </select>
      
      <!-- Hành động -->
      <select class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300">
        <option value="" disabled selected>Hành động</option>
        <option value="login">Login</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      <!-- Mức độ -->
      <select class="shrink-0 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg text-base pl-4 pr-8 py-2.5 focus:ring-2 focus:ring-[#963131]/20 outline-none cursor-pointer text-slate-700 dark:text-slate-300">
        <option value="" disabled selected>Mức độ</option>
        <option value="low">LOW</option>
        <option value="medium">MEDIUM</option>
        <option value="high">HIGH</option>
        <option value="critical">CRITICAL</option>
      </select>

      <!-- Date range -->
      <div class="flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-[#963131]/5 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#963131]/20 transition-all">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Từ</span>
        <input type="date" class="bg-transparent border-none text-base text-slate-700 dark:text-slate-300 outline-none" />
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Đến</span>
        <input type="date" class="bg-transparent border-none text-base text-slate-700 dark:text-slate-300 outline-none" />
      </div>

      <!-- Actions -->
      <button class="shrink-0 bg-[#963131] hover:bg-[#963131]/90 text-white px-5 py-2.5 rounded-lg text-base font-bold transition-all shadow-sm cursor-pointer">
        Lọc
      </button>
      <button class="shrink-0 text-base font-medium text-slate-500 hover:text-[#963131] transition-colors cursor-pointer">
        Xoá bộ lọc
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
// Filters state will be implemented when connecting to API
</script>