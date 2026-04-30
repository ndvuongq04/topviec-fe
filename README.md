<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Candidate Details - The Editorial</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-fixed": "#b0efdb",
                        "surface": "#fbf9f2",
                        "primary-fixed": "#ffdad7",
                        "on-tertiary": "#ffffff",
                        "on-tertiary-container": "#96d5c1",
                        "surface-container-highest": "#e4e2dc",
                        "background": "#fbf9f2",
                        "surface-bright": "#fbf9f2",
                        "outline-variant": "#ddc0be",
                        "on-error": "#ffffff",
                        "primary-container": "#963131",
                        "inverse-surface": "#30312c",
                        "error-container": "#ffdad6",
                        "on-secondary-container": "#63635f",
                        "tertiary-fixed-dim": "#94d3bf",
                        "on-primary-fixed-variant": "#842325",
                        "on-primary-container": "#ffb7b2",
                        "on-tertiary-fixed": "#002019",
                        "primary-fixed-dim": "#ffb3af",
                        "secondary-fixed": "#e4e2de",
                        "tertiary-container": "#1e5e4e",
                        "on-error-container": "#93000a",
                        "tertiary": "#004638",
                        "inverse-primary": "#ffb3af",
                        "surface-container-low": "#f6f4ec",
                        "on-primary-fixed": "#410005",
                        "outline": "#8a7170",
                        "on-surface-variant": "#574240",
                        "surface-container-lowest": "#ffffff",
                        "on-primary": "#ffffff",
                        "on-surface": "#1b1c18",
                        "secondary-fixed-dim": "#c8c6c2",
                        "primary": "#76191d",
                        "surface-container": "#f0eee7",
                        "surface-tint": "#a33b3a",
                        "surface-dim": "#dcdad3",
                        "on-secondary-fixed": "#1b1c19",
                        "secondary": "#5f5e5b",
                        "on-tertiary-fixed-variant": "#095041",
                        "inverse-on-surface": "#f3f1ea",
                        "surface-container-high": "#eae8e1",
                        "on-background": "#1b1c18",
                        "secondary-container": "#e1dfdb",
                        "on-secondary": "#ffffff",
                        "on-secondary-fixed-variant": "#474744",
                        "surface-variant": "#e4e2dc",
                        "error": "#ba1a1a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "fontFamily": {
                        "headline": ["Manrope", "sans-serif"],
                        "display": ["Manrope", "sans-serif"],
                        "body": ["Manrope", "sans-serif"],
                        "label": ["Manrope", "sans-serif"]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; background-color: theme('colors.surface'); }
        .glass-panel { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); }
        .btn-gradient { background: linear-gradient(135deg, theme('colors.primary'), theme('colors.primary-container')); color: white; }
    </style>
<script>
        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(tabId).classList.remove('hidden');
            
            document.querySelectorAll('.tab-btn').forEach(el => {
                el.classList.remove('border-primary', 'text-primary');
                el.classList.add('border-transparent', 'text-on-surface-variant');
            });
            event.currentTarget.classList.remove('border-transparent', 'text-on-surface-variant');
            event.currentTarget.classList.add('border-primary', 'text-primary');
        }
    </script>
</head>
<body class="text-on-surface antialiased flex h-screen overflow-hidden">
<!-- SideNavBar (from JSON) -->
<nav class="fixed left-0 top-0 h-screen w-[200px] z-50 bg-[#963131] shadow-xl flex flex-col no-border tonal-depth">
<div class="px-4 py-6">
<h1 class="text-lg font-bold tracking-tighter text-white uppercase font-display">The Editorial</h1>
<p class="text-white/70 text-xs mt-1">Recruitment Suite</p>
</div>
<div class="px-4 mb-6 mt-4">
<button class="w-full bg-white text-[#963131] py-2 rounded font-bold text-[13px] hover:bg-white/90 transition-colors shadow-sm flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span>
                Add Candidate
            </button>
</div>
<div class="flex-1 overflow-y-auto font-inter text-[13px] tracking-wide">
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
            </a>
<a class="bg-white/10 text-white border-l-2 border-white font-bold px-4 py-3 flex items-center gap-3 scale-95 transition-all" href="#">
<span class="material-symbols-outlined text-[18px]">person_search</span> Candidates
            </a>
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">work</span> Jobs
            </a>
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">analytics</span> Reports
            </a>
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">settings</span> Settings
            </a>
</div>
<div class="mt-auto border-t border-white/10 font-inter text-[13px] tracking-wide pt-2 pb-4">
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">help</span> Support
            </a>
<a class="text-white/70 hover:text-white px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">logout</span> Logout
            </a>
</div>
</nav>
<!-- Main Content Area -->
<div class="flex-1 ml-[200px] flex flex-col h-screen overflow-hidden">
<!-- TopAppBar (from JSON) -->
<header class="w-full h-16 sticky top-0 bg-[#fbf9f2] flex items-center justify-between px-8 z-40 no-border flat no-shadows">
<div class="font-inter display-sm tracking-tight text-[#963131] font-bold text-lg">Candidate Management</div>
<div class="flex items-center gap-4 text-neutral-500">
<span class="material-symbols-outlined cursor-pointer hover:bg-neutral-100 p-2 rounded-lg transition-opacity active:opacity-70">notifications</span>
<span class="material-symbols-outlined cursor-pointer hover:bg-neutral-100 p-2 rounded-lg transition-opacity active:opacity-70">history</span>
<span class="material-symbols-outlined cursor-pointer hover:bg-neutral-100 p-2 rounded-lg transition-opacity active:opacity-70">account_circle</span>
</div>
</header>
<!-- Page Canvas -->
<main class="flex-1 overflow-y-auto p-8 bg-surface">
<div class="max-w-7xl mx-auto space-y-6">
<!-- Section 1: Breadcrumb & Header -->
<div class="flex items-start justify-between flex-wrap gap-4">
<div>
<div class="text-sm font-medium text-on-surface-variant flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
<span class="cursor-pointer hover:text-primary transition-colors">Quản lý Ứng viên</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-on-surface">Chi tiết #UV-9921</span>
</div>
<h2 class="text-3xl font-extrabold tracking-tight text-on-background font-display mt-1">Lê Minh Anh</h2>
</div>
<div class="flex gap-3">
<button class="px-5 py-2.5 rounded-lg border border-outline text-on-surface-variant font-semibold text-sm hover:bg-surface-container-low transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">key</span>
                            Reset mật khẩu
                        </button>
<button class="px-5 py-2.5 rounded-lg bg-error text-on-error font-semibold text-sm hover:bg-red-800 transition-colors flex items-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">lock</span>
                            Khóa tài khoản
                        </button>
</div>
</div>
<!-- Persistent Top Section -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)]">
<div class="flex items-start gap-6">
<div class="w-24 h-24 rounded-full overflow-hidden bg-surface-container flex-shrink-0 relative">
<img alt="Profile picture of Lê Minh Anh" class="w-full h-full object-cover" data-alt="A professional headshot of a confident young Asian businesswoman. She has dark hair styled neatly and is wearing a crisp white blouse with a subtle grey blazer. The background is a soft, blurred modern office environment with neutral tones and a touch of natural light. The lighting is flattering and high-key, emphasizing a clean, approachable, and competent mood suitable for an editorial business profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gLrU3q_5224J1XAC9bxAg_ZrLqT4-sxAJywGB0gFRhGwKXAbzp5ty4LlULF8BaekuGZLhiBUkr8Jgs-Nn5YXUufruzdE6enAPNFPPIYBo4Y7vatETgJbcw7SFX3g7NPWn8lgxcBOSYTXMf1-6P6UqMgKKnYsRwqpLOJV6WSKASsHbeGPmYibmr-ILnNRs61PiUNkNaaFOEAdKVc3GXw8fZlgJQmiJ4q8n00i_KjzlCMh29_Zkq9hnMQ5OA1gQNqX-8v5T2TtDF29"/>
<div class="absolute bottom-0 right-0 w-6 h-6 bg-tertiary rounded-full border-2 border-white flex items-center justify-center" title="Verified User">
<span class="material-symbols-outlined text-white text-[14px] font-bold">check</span>
</div>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-xl font-bold text-on-surface font-display">Lê Minh Anh</h3>
<p class="text-sm text-on-surface-variant font-medium mt-1 flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">mail</span> le.minh.anh@example.com
                                            </p>
</div>
<span class="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase tracking-wider rounded-full">Verified</span>
</div>
<div class="flex gap-8 text-sm">
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Số điện thoại</p>
<p class="font-medium text-on-surface">+84 912 345 678</p>
</div>
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Ngày tham gia</p>
<p class="font-medium text-on-surface">12 Thg 10, 2023</p>
</div>
</div>
</div>
</div>
</div>
<!-- Tabs -->
<div class="border-b border-surface-variant">
<nav aria-label="Tabs" class="-mb-px flex space-x-8">
<button class="tab-btn whitespace-nowrap border-b-2 border-primary py-4 px-1 text-sm font-medium text-primary" onclick="showTab('tab-profile')">Hồ sơ</button>
<button class="tab-btn whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-on-surface-variant hover:border-outline hover:text-on-surface" onclick="showTab('tab-cvs')">Danh sách CV</button>
<button class="tab-btn whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-on-surface-variant hover:border-outline hover:text-on-surface" onclick="showTab('tab-applications')">Lịch sử ứng tuyển</button>
<button class="tab-btn whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-on-surface-variant hover:border-outline hover:text-on-surface" onclick="showTab('tab-followed')">Công ty đã follow</button>
<button class="tab-btn whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-on-surface-variant hover:border-outline hover:text-on-surface" onclick="showTab('tab-saved')">Tin đã lưu</button>
</nav>
</div>
<!-- Tab Contents -->
<div class="mt-6">
<!-- Tab 1: Hồ sơ -->
<div class="tab-content block grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-profile">
<div class="lg:col-span-2 space-y-6">
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)]">
<h3 class="text-lg font-bold text-on-background font-display mb-4">Thông tin chung</h3>
<div class="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Kinh nghiệm</p>
<p class="font-medium text-on-surface">4 năm (Marketing)</p>
</div>
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Mức lương mong muốn</p>
<p class="font-medium text-on-surface">$1,200 - $1,500</p>
</div>
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Địa điểm làm việc</p>
<p class="font-medium text-on-surface">Hồ Chí Minh, Việt Nam</p>
</div>
<div>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Trạng thái tìm việc</p>
<p class="font-medium text-on-surface">Đang tìm việc</p>
</div>
</div>
</div>
</div>
<div class="space-y-6">
<!-- Card: Thống kê -->
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)] p-6">
<h3 class="text-sm font-bold text-on-background font-display mb-4 uppercase tracking-wider">Thống kê hoạt động</h3>
<div class="grid grid-cols-2 gap-4">
<div class="bg-surface-container-low p-4 rounded-lg text-center">
<div class="text-2xl font-extrabold text-primary mb-1">2</div>
<div class="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">Tổng CV</div>
</div>
<div class="bg-surface-container-low p-4 rounded-lg text-center">
<div class="text-2xl font-extrabold text-tertiary mb-1">5</div>
<div class="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">Lần ứng tuyển</div>
</div>
<div class="bg-surface-container-low p-4 rounded-lg text-center">
<div class="text-2xl font-extrabold text-secondary mb-1">12</div>
<div class="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">Cty theo dõi</div>
</div>
<div class="bg-surface-container-low p-4 rounded-lg text-center">
<div class="text-2xl font-extrabold text-secondary mb-1">8</div>
<div class="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">Việc làm đã lưu</div>
</div>
</div>
</div>
</div>
</div>
<!-- Tab 2: Danh sách CV -->
<div class="tab-content hidden" id="tab-cvs">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)] overflow-hidden">
<div class="overflow-x-auto">
<table class="w-full text-left text-sm whitespace-nowrap">
<thead class="bg-surface text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
<tr>
<th class="px-6 py-4 font-bold">Tên CV</th>
<th class="px-6 py-4 font-bold">Ngày cập nhật</th>
<th class="px-6 py-4 font-bold text-right">Thao tác</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-variant text-[13px] font-medium text-on-surface">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4 flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">picture_as_pdf</span>
                                                Senior_Marketing_Executive_LMA.pdf
                                                <span class="ml-2 px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant text-[10px] rounded-full font-bold uppercase">Chính</span>
</td>
<td class="px-6 py-4 text-on-surface-variant">Hôm nay, 10:24 AM</td>
<td class="px-6 py-4 text-right">
<button class="text-primary font-semibold hover:text-primary-container transition-colors">Xem</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4 flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">picture_as_pdf</span>
                                                Digital_Marketing_Specialist.pdf
                                            </td>
<td class="px-6 py-4 text-on-surface-variant">15 Thg 09, 2023</td>
<td class="px-6 py-4 text-right">
<button class="text-primary font-semibold hover:text-primary-container transition-colors">Xem</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- Tab 3: Lịch sử ứng tuyển -->
<div class="tab-content hidden" id="tab-applications">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)] p-6">
<div class="relative border-l border-surface-variant ml-3 space-y-8">
<div class="relative pl-8">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-tertiary ring-4 ring-surface-container-lowest"></div>
<div class="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">24 Thg 10, 2023</div>
<h4 class="text-sm font-bold text-on-surface">Trưởng phòng Marketing</h4>
<p class="text-sm text-on-surface-variant mb-2">Công ty Cổ phần TechNova</p>
<span class="inline-block px-2.5 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold rounded">Đang phỏng vấn</span>
</div>
<div class="relative pl-8">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface-dim ring-4 ring-surface-container-lowest"></div>
<div class="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">10 Thg 09, 2023</div>
<h4 class="text-sm font-bold text-on-surface">Digital Marketing Senior</h4>
<p class="text-sm text-on-surface-variant mb-2">Tập đoàn VinaCorp</p>
<span class="inline-block px-2.5 py-1 bg-error-container text-on-error-container text-xs font-bold rounded">Đã từ chối</span>
</div>
</div>
</div>
</div>
<!-- Tab 4: Công ty đã follow -->
<div class="tab-content hidden" id="tab-followed">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)] overflow-hidden">
<div class="overflow-x-auto">
<table class="w-full text-left text-sm whitespace-nowrap">
<thead class="bg-surface text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
<tr>
<th class="px-6 py-4 font-bold">Công ty</th>
<th class="px-6 py-4 font-bold">Ngày follow</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-variant text-[13px] font-medium text-on-surface">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4 flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant">T</div>
                                                TechNova
                                            </td>
<td class="px-6 py-4 text-on-surface-variant">01 Thg 10, 2023</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4 flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant">V</div>
                                                VinaCorp
                                            </td>
<td class="px-6 py-4 text-on-surface-variant">25 Thg 08, 2023</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- Tab 5: Tin đã lưu -->
<div class="tab-content hidden" id="tab-saved">
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(87,66,64,0.05)] overflow-hidden">
<div class="overflow-x-auto">
<table class="w-full text-left text-sm whitespace-nowrap">
<thead class="bg-surface text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
<tr>
<th class="px-6 py-4 font-bold">Vị trí</th>
<th class="px-6 py-4 font-bold">Công ty</th>
<th class="px-6 py-4 font-bold">Ngày lưu</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-variant text-[13px] font-medium text-on-surface">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4">Brand Manager</td>
<td class="px-6 py-4 text-on-surface-variant">Global Brands VN</td>
<td class="px-6 py-4 text-on-surface-variant">Hôm qua</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-6 py-4">Marketing Director</td>
<td class="px-6 py-4 text-on-surface-variant">StartUp Hub</td>
<td class="px-6 py-4 text-on-surface-variant">20 Thg 10, 2023</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
</body></html>