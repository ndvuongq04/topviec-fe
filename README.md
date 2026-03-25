<!DOCTYPE html>

<html class="light" lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Chi tiết &amp; Đánh giá ứng viên - TopViec</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed": "#dbeafe",
                        "error": "#ef4444",
                        "primary-fixed-dim": "#bfdbfe",
                        "on-surface": "#0f172a",
                        "on-secondary": "#ffffff",
                        "inverse-on-surface": "#f8fafc",
                        "on-error-container": "#b91c1c",
                        "surface-dim": "#f6f6f8",
                        "on-primary-container": "#0369a1",
                        "on-primary": "#ffffff",
                        "on-tertiary-container": "#b45309",
                        "tertiary-container": "#fef3c7",
                        "on-secondary-fixed": "#0f172a",
                        "surface-variant": "#f1f5f9",
                        "on-tertiary": "#ffffff",
                        "surface-tint": "#4B9AF6",
                        "outline-variant": "#e2e8f0",
                        "secondary-fixed-dim": "#e2e8f0",
                        "on-tertiary-fixed-variant": "#9a3412",
                        "error-container": "#fee2e2",
                        "inverse-primary": "#bae6fd",
                        "surface-container-low": "#f8fafd",
                        "surface-container": "#f1f4f9",
                        "tertiary-fixed": "#ffedd5",
                        "secondary-fixed": "#f1f5f9",
                        "on-primary-fixed-variant": "#1d4ed8",
                        "background": "#f6f6f8",
                        "secondary-container": "#f1f5f9",
                        "on-error": "#ffffff",
                        "on-background": "#0f172a",
                        "tertiary-fixed-dim": "#fed7aa",
                        "primary": "#4B9AF6",
                        "on-secondary-container": "#334155",
                        "surface-container-high": "#e9edf5",
                        "secondary": "#64748b",
                        "primary-container": "#e0f2fe",
                        "on-surface-variant": "#64748b",
                        "on-secondary-fixed-variant": "#334155",
                        "surface": "#ffffff",
                        "on-tertiary-fixed": "#7c2d12",
                        "inverse-surface": "#1e293b",
                        "surface-bright": "#ffffff",
                        "on-primary-fixed": "#1e40af",
                        "outline": "#cbd5e1",
                        "tertiary": "#f59e0b",
                        "surface-container-highest": "#e2e7f0"
                    },
                    fontFamily: {
                        "headline": ["Manrope"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        body { font-family: 'Manrope', sans-serif; }
    </style>
</head>
<body class="bg-background text-on-background antialiased overflow-hidden h-screen flex">
<!-- SideNavBar (Shared Component) -->
<aside class="fixed left-0 top-0 h-full flex flex-col h-screen w-64 border-r border-slate-200 bg-white font-manrope antialiased z-50">
<div class="p-6">
<h1 class="text-2xl font-extrabold text-blue-500">TopViec</h1>
<p class="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">Recruitment Portal</p>
</div>
<nav class="flex-1 px-4 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-blue-500 hover:bg-slate-50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-blue-500 hover:bg-slate-50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined" data-icon="work">work</span>
<span class="font-medium">Jobs</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 font-bold border-r-4 border-blue-500 bg-blue-50" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="font-medium">Candidates</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-blue-500 hover:bg-slate-50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined" data-icon="event">event</span>
<span class="font-medium">Interviews</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-blue-500 hover:bg-slate-50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-medium">Settings</span>
</a>
</nav>
<div class="p-4 border-t border-slate-100 mt-auto">
<div class="flex items-center gap-3 p-2">
<img alt="Employer Profile Picture" class="w-10 h-10 rounded-full object-cover" data-alt="professional headshot of a recruitment manager in a bright modern office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaRjuZkcn8IoIaUZ9uAOw98Ll3GG2OVY27qGwLpzKBl25l3OVDAHOkSVjSWwaF89aZBUxxupZzsKUuUridYa2xscObzNp_GCzYc6RtxfhbF5x9UbODcbbuIWxhuip41oIreu5NYffrlEbix5wPOio-diJqJYslg6kTOeVLo_R_ZsVVqcpkU0XLuQTog8vJfB4SvmOSzrPxPvAbb1kgs4piUX1li61u1zYkaczAiM9tKr_MWMjKiGzIZ5RjIqmsRrU2A42XJ16DjQ"/>
<div>
<p class="text-sm font-bold text-on-surface">Admin HR</p>
<p class="text-xs text-slate-500">Premium Account</p>
</div>
</div>
</div>
</aside>
<!-- Main Content Wrapper -->
<div class="flex-1 ml-64 flex flex-col overflow-hidden">
<!-- TopNavBar (Shared Component) -->
<header class="flex justify-between items-center w-full px-6 py-3 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-40">
<div class="flex items-center gap-4 flex-1">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" data-icon="search">search</span>
<input class="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all" placeholder="Tìm kiếm ứng viên, kỹ năng..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-slate-500 hover:text-blue-500 transition-all hover:scale-105">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 text-slate-500 hover:text-blue-500 transition-all hover:scale-105">
<span class="material-symbols-outlined" data-icon="help">help</span>
</button>
<button class="p-2 text-slate-500 hover:text-blue-500 transition-all hover:scale-105">
<span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>
<!-- Candidate Detail Content -->
<main class="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
<!-- Left Panel: CV & Info -->
<section class="flex-1 flex flex-col gap-6">
<!-- Breadcrumb & Actions -->
<div class="flex justify-between items-center">
<div class="flex items-center gap-2 text-sm">
<span class="text-slate-500">Ứng viên</span>
<span class="material-symbols-outlined text-sm text-slate-400" data-icon="chevron_right">chevron_right</span>
<span class="font-bold text-primary">Nguyễn Minh Tuấn</span>
</div>
<div class="flex gap-2">
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all">
<span class="material-symbols-outlined text-lg" data-icon="download">download</span>
                            Tải CV
                        </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all">
<span class="material-symbols-outlined text-lg" data-icon="print">print</span>
                            In
                        </button>
</div>
</div>
<!-- CV Placeholder / Preview -->
<div class="bg-surface-container-highest rounded-xl border border-outline-variant aspect-[3/4] md:aspect-auto flex-1 relative overflow-hidden flex flex-col items-center justify-center group">
<div class="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[1px]">
<button class="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
<span class="material-symbols-outlined" data-icon="fullscreen">fullscreen</span>
                            Xem toàn màn hình
                         </button>
</div>
<!-- Simulating a CV Document Layout -->
<div class="w-[85%] h-[90%] bg-white shadow-2xl p-10 flex flex-col gap-6 rounded-sm">
<div class="flex justify-between items-start">
<div>
<h2 class="text-3xl font-extrabold text-slate-900 leading-tight">NGUYỄN MINH TUẤN</h2>
<p class="text-primary font-bold text-lg mt-1 uppercase tracking-wider">Senior Frontend Developer</p>
</div>
<div class="w-24 h-24 rounded-lg bg-slate-100 border border-slate-200">
<img alt="Candidate Portrait" class="w-full h-full object-cover rounded-lg" data-alt="professional portrait of a young male professional wearing a white shirt against a clean light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhgiM2fHNwNECX9THtUm3X8cOp7ubarcG94ZLGwvoOK5jjBvLiHXTN30TEKePzBI0j9kj4znVIUwNCAnLDJrHSNm52bCs6XDS9cpUOxKmQ2xJVkGMlgtB5PFvuSMvZ7CCDTASPOpGPZanBcDatOMFo-0HmcStLN6bDgBkc5FLv4a9gjt6pdrHePMTdKTkfVRKHjiyEpbTx89wqwuOod06oP5IyVb1PxoZT92Dk0-R4wQnx0ahk9zhxZ-RHCbKUD5xrSj8-s3OXVg"/>
</div>
</div>
<div class="grid grid-cols-2 gap-8 mt-4">
<div class="space-y-6">
<div>
<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">Thông tin liên hệ</h3>
<ul class="text-sm space-y-2 text-slate-600">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base" data-icon="mail">mail</span> tuan.nguyen@email.com</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base" data-icon="call">call</span> 090 123 4567</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base" data-icon="location_on">location_on</span> Quận 7, TP. HCM</li>
</ul>
</div>
<div>
<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">Kỹ năng</h3>
<div class="flex flex-wrap gap-2">
<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">React.js</span>
<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">TypeScript</span>
<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">Tailwind CSS</span>
<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">Next.js</span>
<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">Node.js</span>
</div>
</div>
</div>
<div class="space-y-6">
<div>
<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">Kinh nghiệm</h3>
<div class="space-y-4">
<div>
<p class="text-sm font-bold text-slate-800">Global Tech Solutions</p>
<p class="text-xs text-slate-500 italic">2020 - Hiện tại</p>
<p class="text-xs text-slate-600 mt-1 line-clamp-2">Chịu trách nhiệm phát triển giao diện người dùng cho các sản phẩm Fintech...</p>
</div>
<div>
<p class="text-sm font-bold text-slate-800">Startup Visionary</p>
<p class="text-xs text-slate-500 italic">2018 - 2020</p>
<p class="text-xs text-slate-600 mt-1 line-clamp-2">Phát triển MVP và tối ưu hóa hiệu suất trang web thương mại điện tử...</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Right Panel: Evaluation & Action -->
<section class="w-full md:w-[400px] flex flex-col gap-6">
<!-- Phân loại & Đánh giá Card -->
<div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
<div class="p-5 border-b border-slate-100 bg-slate-50/50">
<h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
<span class="material-symbols-outlined text-primary" data-icon="assignment_turned_in">assignment_turned_in</span>
                            Phân loại &amp; Đánh giá
                        </h2>
</div>
<div class="p-6 space-y-8">
<!-- Status Radio Buttons -->
<div class="space-y-3">
<label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Trạng thái sàng lọc</label>
<div class="grid grid-cols-1 gap-2">
<label class="flex items-center gap-3 p-3 rounded-xl border-2 border-emerald-100 bg-emerald-50/30 cursor-pointer hover:bg-emerald-50 transition-colors">
<input checked="" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" name="status" type="radio"/>
<span class="text-sm font-bold text-emerald-700">Phù hợp</span>
<span class="material-symbols-outlined ml-auto text-emerald-500" data-icon="check_circle">check_circle</span>
</label>
<label class="flex items-center gap-3 p-3 rounded-xl border-2 border-amber-100 bg-amber-50/30 cursor-pointer hover:bg-amber-50 transition-colors">
<input class="w-4 h-4 text-amber-600 focus:ring-amber-500 border-slate-300" name="status" type="radio"/>
<span class="text-sm font-bold text-amber-700">Cân nhắc</span>
<span class="material-symbols-outlined ml-auto text-amber-500" data-icon="help">help</span>
</label>
<label class="flex items-center gap-3 p-3 rounded-xl border-2 border-rose-100 bg-rose-50/30 cursor-pointer hover:bg-rose-50 transition-colors">
<input class="w-4 h-4 text-rose-600 focus:ring-rose-500 border-slate-300" name="status" type="radio"/>
<span class="text-sm font-bold text-rose-700">Từ chối</span>
<span class="material-symbols-outlined ml-auto text-rose-500" data-icon="cancel">cancel</span>
</label>
</div>
</div>
<!-- Rating Stars -->
<div class="space-y-3">
<label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Đánh giá chuyên môn</label>
<div class="flex gap-2">
<button class="text-amber-400 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
<button class="text-amber-400 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
<button class="text-amber-400 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
<button class="text-amber-400 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
</button>
<button class="text-slate-200 hover:scale-110 transition-transform hover:text-amber-200">
<span class="material-symbols-outlined text-3xl" data-icon="star">star</span>
</button>
</div>
</div>
<!-- Special Tags -->
<div class="space-y-3">
<div class="flex justify-between items-center">
<label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Nhãn (Tags)</label>
<button class="text-xs text-primary font-bold hover:underline">+ Thêm mới</button>
</div>
<div class="flex flex-wrap gap-2">
<span class="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer">
                                    Kinh nghiệm tốt
                                    <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100" data-icon="close">close</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer">
                                    Tiếng Anh lưu loát
                                    <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100" data-icon="close">close</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full border border-primary/20 hover:bg-blue-100 transition-colors cursor-pointer">
                                    Uư tiên phỏng vấn
                                    <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100" data-icon="close">close</span>
</span>
</div>
</div>
<!-- Internal Note -->
<div class="space-y-3">
<div class="flex items-center justify-between">
<label class="text-sm font-bold text-slate-500 uppercase tracking-tight">Ghi chú nội bộ</label>
<span class="text-[10px] text-slate-400 flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="visibility_off">visibility_off</span> Chỉ tuyển dụng thấy
                                </span>
</div>
<textarea class="w-full rounded-xl border-slate-200 bg-slate-50 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 p-4" placeholder="Nhập nhận xét về ứng viên này..." rows="4"></textarea>
</div>
</div>
<!-- Final Footer Actions -->
<div class="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
<button class="w-full bg-primary text-white py-3 rounded-xl font-extrabold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined" data-icon="save">save</span>
                            Lưu Đánh Giá
                        </button>
<button class="w-full bg-white text-primary border-2 border-primary/10 py-3 rounded-xl font-extrabold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
                            Mời Phỏng Vấn
                        </button>
</div>
</div>
<!-- Previous Activity (Optional Bonus for Context) -->
<div class="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
<h3 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Lịch sử tương tác</h3>
<div class="space-y-3">
<div class="flex gap-3">
<div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
<div>
<p class="text-xs font-bold text-slate-700">Đã ứng tuyển vào vị trí Frontend Dev</p>
<p class="text-[10px] text-slate-400">10:45 AM - 20/10/2023</p>
</div>
</div>
<div class="flex gap-3">
<div class="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0"></div>
<div>
<p class="text-xs font-bold text-slate-700">Admin đã xem hồ sơ</p>
<p class="text-[10px] text-slate-400">02:15 PM - 20/10/2023</p>
</div>
</div>
</div>
</div>
</section>
</main>
</div>
</body></html>