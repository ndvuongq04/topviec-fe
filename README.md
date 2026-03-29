<!DOCTYPE html>

<html class="light" lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Azure Horizon - Tin Tuyển Dụng</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#ef4444",
                        "on-error": "#ffffff",
                        "tertiary-container": "#fef3c7",
                        "surface-variant": "#f1f5f9",
                        "primary-container": "#e0f2fe",
                        "on-primary-fixed-variant": "#1d4ed8",
                        "on-tertiary": "#ffffff",
                        "on-secondary-fixed-variant": "#334155",
                        "inverse-surface": "#1e293b",
                        "on-tertiary-fixed-variant": "#9a3412",
                        "on-secondary-container": "#334155",
                        "error-container": "#fee2e2",
                        "on-primary": "#ffffff",
                        "on-error-container": "#b91c1c",
                        "on-secondary": "#ffffff",
                        "outline": "#cbd5e1",
                        "on-primary-container": "#0369a1",
                        "inverse-on-surface": "#f8fafc",
                        "background": "#f6f6f8",
                        "tertiary": "#f59e0b",
                        "on-background": "#0f172a",
                        "surface-tint": "#4B9AF6",
                        "on-secondary-fixed": "#0f172a",
                        "secondary": "#64748b",
                        "primary-fixed": "#dbeafe",
                        "primary-fixed-dim": "#bfdbfe",
                        "outline-variant": "#e2e8f0",
                        "on-surface": "#0f172a",
                        "on-tertiary-fixed": "#7c2d12",
                        "secondary-container": "#f1f5f9",
                        "surface-dim": "#f6f6f8",
                        "surface-container": "#f1f4f9",
                        "primary": "#4B9AF6",
                        "surface-bright": "#ffffff",
                        "tertiary-fixed": "#ffedd5",
                        "surface-container-low": "#f8fafd",
                        "surface-container-highest": "#e2e7f0",
                        "surface-container-high": "#e9edf5",
                        "inverse-primary": "#bae6fd",
                        "secondary-fixed-dim": "#e2e8f0",
                        "on-surface-variant": "#64748b",
                        "secondary-fixed": "#f1f5f9",
                        "on-primary-fixed": "#1e40af",
                        "tertiary-fixed-dim": "#fed7aa",
                        "on-tertiary-container": "#b45309",
                        "surface": "#ffffff",
                        "surface-container-lowest": "#ffffff"
                    },
                    fontFamily: {
                        "headline": ["Manrope"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    </style>
</head>
<body class="bg-background text-on-background">
<!-- SideNavBar Integration -->
<aside class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-40 flex flex-col shadow-sm">
<div class="p-6">
<h1 class="text-xl font-extrabold text-primary dark:text-blue-400 tracking-tight">Azure Horizon</h1>
<p class="text-xs text-secondary font-medium uppercase tracking-wider mt-1">Recruiter Studio</p>
</div>
<nav class="flex-1 px-3 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-medium text-sm">Bảng điều khiển</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">calendar_month</span>
<span class="font-medium text-sm">Lịch phỏng vấn</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-primary dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 font-bold border-r-4 border-primary rounded-r-none rounded-l-lg" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">work</span>
<span class="font-medium text-sm">Tin tuyển dụng</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">groups</span>
<span class="font-medium text-sm">Ứng viên</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-medium text-sm">Cài đặt</span>
</a>
</nav>
<div class="p-4 border-t border-slate-100 dark:border-slate-800">
<a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-medium text-sm">Trợ giúp</span>
</a>
</div>
</aside>
<main class="ml-64 min-h-screen">
<!-- TopAppBar Integration -->
<header class="sticky top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-8 py-4 z-30 flex justify-between items-center">
<div class="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20">
<span class="material-symbols-outlined text-slate-400">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400" placeholder="Tìm kiếm tin tuyển dụng..." type="text"/>
</div>
<div class="flex items-center gap-6">
<div class="flex gap-4 text-slate-500">
<button class="hover:text-primary transition-colors"><span class="material-symbols-outlined">notifications</span></button>
<button class="hover:text-primary transition-colors"><span class="material-symbols-outlined">mail</span></button>
</div>
<div class="flex items-center gap-3 pl-6 border-l border-slate-200">
<div class="text-right">
<p class="text-sm font-bold text-on-background">Admin Profile</p>
<p class="text-[10px] text-secondary uppercase font-bold tracking-tighter">Hiring Manager</p>
</div>
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
<img alt="Admin Profile" class="w-full h-full object-cover" data-alt="professional portrait of a confident male hiring manager in a modern office environment, warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSrz_3xoncZAwx0kRJ7JkhmtOjByQcDq-OldPKpS1VcOuJ6y8HJyRlETp_hmFz_5TkDp8RqiSzVmNYBehW_BdtcvsYabIzOWqEXXEga5AQ4JrHY98V8Ha9fnWO4qzRsglCnKMKHbiYRTiN-ogYE8CGYQyN_vdSfyLYFZyHp5BNHm0gXMq5m3aKy3K6W9ukvQNhdvPDtAqtDJbYoMIWM5liYohXeXdKBkEmBWy9o5ZUO3oygoMql0z5hH0o0rx6aJL2vm_5Brd0mA"/>
</div>
</div>
</div>
</header>
<!-- Main Content Area -->
<div class="p-8 max-w-7xl mx-auto space-y-8">
<!-- Header Section -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 class="text-3xl font-extrabold text-on-background tracking-tight">Quản lý Tin tuyển dụng</h2>
<p class="text-secondary mt-1">Theo dõi các vị trí đang tuyển dụng và lượng ứng viên tương ứng.</p>
</div>
<div class="flex gap-4">
<button class="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-lg">add</span>
                        Tạo tin mới
                    </button>
</div>
</div>
<!-- Stats Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
<div class="flex justify-between items-start">
<div>
<p class="text-xs font-bold text-secondary uppercase tracking-wider">Tổng tin tuyển dụng</p>
<h3 class="text-3xl font-extrabold mt-2">24</h3>
</div>
<div class="p-3 bg-blue-50 text-primary rounded-lg">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">work</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
<span class="material-symbols-outlined text-sm">trending_up</span>
<span>+12% so với tháng trước</span>
</div>
</div>
<div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
<div class="flex justify-between items-start">
<div>
<p class="text-xs font-bold text-secondary uppercase tracking-wider">Chờ duyệt tin</p>
<h3 class="text-3xl font-extrabold mt-2">08</h3>
</div>
<div class="p-3 bg-amber-50 text-amber-600 rounded-lg">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pending_actions</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600">
<span class="material-symbols-outlined text-sm">schedule</span>
<span>Cần xử lý trong 24h tới</span>
</div>
</div>
<div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
<div class="flex justify-between items-start">
<div>
<p class="text-xs font-bold text-secondary uppercase tracking-wider">Tin sắp hết hạn</p>
<h3 class="text-3xl font-extrabold mt-2">02</h3>
</div>
<div class="p-3 bg-red-50 text-red-600 rounded-lg">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-xs font-medium text-red-600">
<span class="material-symbols-outlined text-sm">priority_high</span>
<span>Vui lòng kiểm tra lại</span>
</div>
</div>
</div>
<!-- Job Postings List View -->
<div class="space-y-4">
<div class="flex items-center justify-between">
<h4 class="text-lg font-bold text-on-background">Tin tuyển dụng đang hoạt động</h4>
<button class="text-sm font-bold text-primary hover:underline">Xem tất cả</button>
</div>
<div class="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
<!-- Row 1 -->
<div class="group flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
<div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-2xl text-primary">terminal</span>
</div>
<div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
<div class="md:col-span-4">
<h5 class="text-sm font-bold text-on-background truncate group-hover:text-primary transition-colors">Tin tuyển dụng Java Developer</h5>
<p class="text-xs text-secondary truncate">Phòng phát triển phần mềm • Senior Level</p>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">groups</span>
                                    12 ứng viên
                                </span>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">event_available</span>
                                    04 phỏng vấn/tuần
                                </span>
</div>
<div class="md:col-span-2">
<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full inline-block">Đang tuyển</span>
</div>
<div class="md:col-span-2 flex justify-end">
<button class="px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all">
                                    Xem chi tiết
                                </button>
</div>
</div>
</div>
<!-- Row 2 -->
<div class="group flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer bg-blue-50/20">
<div class="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-2xl text-white">javascript</span>
</div>
<div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
<div class="md:col-span-4">
<h5 class="text-sm font-bold text-primary truncate">Tin tuyển dụng React JS Developer</h5>
<p class="text-xs text-secondary truncate">Đội ngũ Frontend • Middle Level</p>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">groups</span>
                                    08 ứng viên
                                </span>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">event_available</span>
                                    03 phỏng vấn/tuần
                                </span>
</div>
<div class="md:col-span-2">
<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full inline-block">Đang tuyển</span>
</div>
<div class="md:col-span-2 flex justify-end">
<button class="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg shadow-sm hover:scale-105 transition-all">
                                    Xem chi tiết
                                </button>
</div>
</div>
</div>
<!-- Row 3 -->
<div class="group flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
<div class="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-2xl text-orange-600">palette</span>
</div>
<div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
<div class="md:col-span-4">
<h5 class="text-sm font-bold text-on-background truncate group-hover:text-primary transition-colors">UI/UX Designer</h5>
<p class="text-xs text-secondary truncate">Đội ngũ Design • Junior/Middle</p>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">groups</span>
                                    15 ứng viên
                                </span>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">event_available</span>
                                    05 phỏng vấn/tuần
                                </span>
</div>
<div class="md:col-span-2">
<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full inline-block">Đang tuyển</span>
</div>
<div class="md:col-span-2 flex justify-end">
<button class="px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all">
                                    Xem chi tiết
                                </button>
</div>
</div>
</div>
<!-- Row 4 -->
<div class="group flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
<div class="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-2xl text-purple-600">psychology</span>
</div>
<div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
<div class="md:col-span-4">
<h5 class="text-sm font-bold text-on-background truncate group-hover:text-primary transition-colors">AI Engineer</h5>
<p class="text-xs text-secondary truncate">Phòng R&amp;D • Expert Level</p>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">groups</span>
                                    04 ứng viên
                                </span>
</div>
<div class="md:col-span-2">
<span class="text-xs font-semibold text-on-background flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-slate-400">event_available</span>
                                    01 phỏng vấn/tuần
                                </span>
</div>
<div class="md:col-span-2">
<span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full inline-block">Đang tuyển</span>
</div>
<div class="md:col-span-2 flex justify-end">
<button class="px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all">
                                    Xem chi tiết
                                </button>
</div>
</div>
</div>
</div>
</div>
<!-- Floating Action Focus -->
<div class="flex justify-end gap-4 mt-8">
<button class="px-8 py-3 bg-white border-2 border-primary text-primary font-extrabold rounded-lg hover:bg-blue-50 transition-all">
                    Xuất báo cáo tuyển dụng
                </button>
<button class="px-8 py-3 bg-primary text-white font-extrabold rounded-lg shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                    Mời ứng viên mới
                </button>
</div>
</div>
</main>
<!-- Simple Backdrop for Mobile (Logic Only) -->
<div class="fixed inset-0 bg-slate-900/50 z-30 hidden backdrop-blur-sm md:hidden"></div>
</body></html>