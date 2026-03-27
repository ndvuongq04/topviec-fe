<!DOCTYPE html>

<html class="light" lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {},
                    fontFamily: {
                        "headline": ["Public Sans"],
                        "body": ["Public Sans"],
                        "label": ["Public Sans"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Public Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
<!-- TopNavBar -->
<nav class="bg-white dark:bg-slate-900 fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-6 h-16 w-full font-sans antialiased">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold text-blue-600 dark:text-blue-400">TopViec</span>
<div class="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 gap-2 w-80">
<span class="material-symbols-outlined text-slate-400 text-sm">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" placeholder="Tìm kiếm công việc..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:opacity-80 rounded-full">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer">
<img alt="User profile avatar" class="h-full w-full object-cover" data-alt="Close up portrait of a young professional smiling against a neutral studio background with soft overhead lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_WIe3t_DK9sYkWi00_YZKXN_pdyMX3ngPS8B78kDr7RRM5Xk5I-qAcRiqdUs_0heWdvEvWljb2KfzN-CjN3IVumlj_qinvxaRI9w9HRiMaBpKJyCnaBYMFwPBpQZZCgaIiKnmNicpwx-HEcIUa0fuxo1BEPXUmbzrjrl3Ds4_jy1vAsbRiJJjtBhuEuZjaF_fi11EI5pr65q2aqWB4kf_uw2cMVHsVHvGXzx1Rs3A1QL0ptXe0affqajUdeJuebz1odsXoUH3_uc"/>
</div>
</div>
</nav>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 h-full w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col pt-8 pb-24 px-4 gap-2 text-sm font-medium font-sans">
<div class="px-4 mb-6">
<p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Welcome back</p>
<p class="text-slate-900 dark:text-white font-bold">Manage your career</p>
</div>
<a class="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">work</span>
<span>Jobs</span>
</a>
<a class="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">bookmark</span>
<span>Saved</span>
</a>
<a class="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">assignment_turned_in</span>
<span>Applications</span>
</a>
<a class="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">settings</span>
<span>Settings</span>
</a>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 pt-16 min-h-screen">
<div class="max-w-6xl mx-auto px-8 py-8">
<!-- Header Section -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Đơn ứng tuyển</h1>
<p class="text-slate-500 dark:text-slate-400 mt-1">Bạn có <span class="font-semibold text-blue-600 dark:text-blue-400">24 Đơn đã nộp</span> trong 30 ngày qua.</p>
</div>
<div class="flex gap-2">
<button class="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
<span class="material-symbols-outlined text-lg">download</span>
                        Xuất báo cáo
                    </button>
</div>
</div>
<!-- Filters/Tabs -->
<div class="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
<button class="px-4 py-3 text-sm font-semibold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Tất cả đơn</button>
<button class="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">Đã gửi</button>
<button class="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">Đã xem</button>
<button class="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap flex items-center gap-2">
                    Mời phỏng vấn
                    <span class="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full">2</span>
</button>
<button class="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">Đạt</button>
<button class="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 whitespace-nowrap">Không đạt</button>
</div>
<!-- Application List (Asymmetric Grid / Card Layout) -->
<div class="grid grid-cols-1 gap-6">
<!-- Card 1: Interviewing State -->
<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col lg:flex-row gap-6">
<!-- Company Info -->
<div class="flex gap-4 lg:w-1/3">
<div class="h-14 w-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
<img alt="Shopee Vietnam Logo" class="h-10 w-10 object-contain" data-alt="Minimalist orange and white tech company logo displayed on a clean professional background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhR8KayCKYMYUxH7VTmPnSOozyHXRK5dgMU-SlLL1g3rR1X9AcebKjNIUnFk9mUscnKr449mla-sW3vsSgP_n2are-hlVcn66l0Q_2ZR_BWQS3ATllrHuLc5F8p-r7tA1Huh5SdIdrMCHq23jm3eQ3aZGR_XRpKWjQloDv0yufz0cQ5SmkTVRCZQueZWRDrwc-bFJMMJHKobr-ZPGXiuGX3ROWYDv_a5tXuh3Aswfl2lQZWfotVqjaQYaDXNoUDwUp0So5IaOOcyo"/>
</div>
<div>
<h3 class="font-bold text-lg leading-tight text-slate-900 dark:text-white">Senior Product Designer</h3>
<p class="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Shopee Vietnam</p>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">payments</span>
                                        $2,500 - $4,000
                                    </div>
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        TP. Hồ Chí Minh
                                    </div>
</div>
</div>
</div>
<!-- Timeline/Status -->
<div class="flex-1 flex flex-col justify-center">
<div class="flex items-center justify-between mb-4">
<span class="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded">Mời phỏng vấn Vòng 1</span>
<span class="text-[11px] text-slate-400">Cập nhật 2 giờ trước</span>
</div>
<div class="relative flex items-center justify-between px-2">
<!-- Progress Bar Background -->
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 z-0 rounded-full"></div>
<!-- Progress Bar Active -->
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-[66%] h-1 bg-blue-600 z-0 rounded-full"></div>
<!-- Steps -->
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-500">Đã gửi</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-500">Đã xem</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50 flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-white text-[12px] font-bold">check</span>
</div>
<span class="text-[10px] font-bold text-blue-600">Phỏng vấn</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Kết quả</span>
</div>
</div>
</div>
<!-- Actions -->
<div class="flex lg:flex-col items-center lg:items-end justify-center gap-2 shrink-0">
<button class="w-full lg:w-32 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">Xem lịch PV</button>
<button class="w-full lg:w-32 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Chi tiết đơn</button>
</div>
</div>
</div>
<!-- Card 2: Sent State -->
<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col lg:flex-row gap-6 opacity-90">
<div class="flex gap-4 lg:w-1/3">
<div class="h-14 w-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
<img alt="VNG Corporation Logo" class="h-10 w-10 object-contain" data-alt="Modern corporate logo with geometric shapes in dark blue and gray on a white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuvO8RniqMR0BiVPeIi8_QZHmDMf-igVyH6yMD0CDgsqVYNyVoSejqMB3C-usOmCgLmgcgOhoR9_eKW5yYneCSE_WEDYNEW8VctkWOrh0y_PZESmmO0SwlqSoxRiuo9tlz4e2JxfjtOXNUHq9CXjwMEA8_h-qYJc77xDzu2trxdN3YxHjb1jCavV2hvhhNHIuatnMss5qPKes2-NVg6ksKOuYSgw9HuyBUs0iFfQUN4R6jH3Ax6rVDFJPf0CeNBGGxIEk3IbVt9oE"/>
</div>
<div>
<h3 class="font-bold text-lg leading-tight text-slate-900 dark:text-white">Fullstack Developer (NodeJS/React)</h3>
<p class="text-slate-600 dark:text-slate-400 text-sm mt-0.5">VNG Corporation</p>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">payments</span>
                                        Thoả thuận
                                    </div>
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        Đà Nẵng
                                    </div>
</div>
</div>
</div>
<div class="flex-1 flex flex-col justify-center">
<div class="flex items-center justify-between mb-4">
<span class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Đã nộp thành công</span>
<span class="text-[11px] text-slate-400">Cập nhật 1 ngày trước</span>
</div>
<div class="relative flex items-center justify-between px-2">
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 z-0 rounded-full"></div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-[0%] h-1 bg-blue-600 z-0 rounded-full"></div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50 flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-white text-[12px] font-bold">check</span>
</div>
<span class="text-[10px] font-bold text-blue-600">Đã gửi</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Đã xem</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Phỏng vấn</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Kết quả</span>
</div>
</div>
</div>
<div class="flex lg:flex-col items-center lg:items-end justify-center gap-2 shrink-0">
<button class="w-full lg:w-32 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Chi tiết đơn</button>
<button class="w-full lg:w-32 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-sm font-semibold transition-colors">Rút đơn</button>
</div>
</div>
</div>
<!-- Card 3: Viewed State -->
<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col lg:flex-row gap-6">
<div class="flex gap-4 lg:w-1/3">
<div class="h-14 w-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
<img alt="Techcombank Logo" class="h-10 w-10 object-contain" data-alt="Elegant corporate financial institution logo with clean typography and deep red accents on a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwpHPxaSh8rivVNGbci5JAnB17xd6IxFMThUKGWYKtd1AOQzndtVf7ND7F_mvRnU_7Zyn5IyGqRDVqVG5ELDJ89EWjul2PbF4Zxl-3dByN05nPTc2741dKfBNLSyganM80w9edXn5Ya75XB4gy14S3EnZ_rswcH1N685xDrUVx33FIVMEborEjZMN6fL5B2ioB6QgDGhLpyp9fCIlqKtJUFEm8x639EP8pv14uKCPovPRWu3RhbKn1RAeb_K1rcjhfHfuHsRGIaRA"/>
</div>
<div>
<h3 class="font-bold text-lg leading-tight text-slate-900 dark:text-white">UI/UX Researcher</h3>
<p class="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Techcombank</p>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">payments</span>
                                        $1,500 - $2,200
                                    </div>
<div class="flex items-center gap-1 text-slate-500 text-xs">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        Hà Nội
                                    </div>
</div>
</div>
</div>
<div class="flex-1 flex flex-col justify-center">
<div class="flex items-center justify-between mb-4">
<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded">Nhà tuyển dụng đã xem</span>
<span class="text-[11px] text-slate-400">Cập nhật 3 ngày trước</span>
</div>
<div class="relative flex items-center justify-between px-2">
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 z-0 rounded-full"></div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-[33%] h-1 bg-blue-600 z-0 rounded-full"></div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-500">Đã gửi</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50 flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-white text-[12px] font-bold">check</span>
</div>
<span class="text-[10px] font-bold text-blue-600">Đã xem</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Phỏng vấn</span>
</div>
<div class="relative z-10 flex flex-col items-center gap-1">
<div class="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900"></div>
<span class="text-[10px] font-medium text-slate-400">Kết quả</span>
</div>
</div>
</div>
<div class="flex lg:flex-col items-center lg:items-end justify-center gap-2 shrink-0">
<button class="w-full lg:w-32 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Chi tiết đơn</button>
</div>
</div>
</div>
</div>
<!-- Bento Sidebar Elements (Help/Insights) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
<div class="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
<div class="relative z-10">
<h4 class="text-xl font-bold mb-2">Tối ưu hồ sơ của bạn</h4>
<p class="text-blue-100 text-sm max-w-md mb-6">Ứng viên có hồ sơ đầy đủ 100% thường nhận được lời mời phỏng vấn cao gấp 3 lần bình thường.</p>
<button class="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">Cập nhật ngay</button>
</div>
<div class="absolute -right-8 -bottom-8 opacity-20">
<span class="material-symbols-outlined text-[180px]" style="font-variation-settings: 'wght' 700;">auto_awesome</span>
</div>
</div>
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
<div>
<div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
<span class="material-symbols-outlined">lightbulb</span>
</div>
<h4 class="font-bold text-slate-900 dark:text-white mb-1">Mẹo phỏng vấn</h4>
<p class="text-slate-500 text-xs">Chuẩn bị tốt nhất cho 2 buổi phỏng vấn sắp tới của bạn.</p>
</div>
<a class="text-blue-600 text-xs font-bold flex items-center gap-1 mt-4" href="#">
                        Xem tài liệu
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</div>
</main>
<!-- Contextual FAB (Only for main screens) -->
<div class="fixed bottom-8 right-8">
<button class="h-14 w-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 group">
<span class="material-symbols-outlined transition-transform group-hover:rotate-12">support_agent</span>
</button>
</div>
</body></html>