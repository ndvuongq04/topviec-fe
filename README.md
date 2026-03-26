<!DOCTYPE html>

<html class="light" lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ghi nhận Kết quả Phỏng vấn - TopViec</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "secondary-fixed-dim": "#e2e8f0",
              "primary-container": "#e0f2fe",
              "tertiary-container": "#fef3c7",
              "surface-container-high": "#e9edf5",
              "primary": "#4B9AF6",
              "error-container": "#fee2e2",
              "surface-container": "#f1f4f9",
              "on-tertiary-fixed-variant": "#9a3412",
              "surface-container-low": "#f8fafd",
              "on-tertiary-fixed": "#7c2d12",
              "outline": "#cbd5e1",
              "on-error": "#ffffff",
              "secondary-fixed": "#f1f5f9",
              "on-background": "#0f172a",
              "on-tertiary-container": "#b45309",
              "secondary-container": "#f1f5f9",
              "primary-fixed": "#dbeafe",
              "error": "#ef4444",
              "on-primary-container": "#0369a1",
              "on-secondary-fixed": "#0f172a",
              "tertiary": "#f59e0b",
              "secondary": "#64748b",
              "tertiary-fixed": "#ffedd5",
              "on-surface": "#0f172a",
              "inverse-surface": "#1e293b",
              "surface-container-lowest": "#ffffff",
              "tertiary-fixed-dim": "#fed7aa",
              "background": "#f6f6f8",
              "inverse-primary": "#bae6fd",
              "on-secondary-container": "#334155",
              "inverse-on-surface": "#f8fafc",
              "on-tertiary": "#ffffff",
              "surface-container-highest": "#e2e7f0",
              "on-primary-fixed-variant": "#1d4ed8",
              "on-error-container": "#b91c1c",
              "surface-variant": "#f1f5f9",
              "surface-bright": "#ffffff",
              "on-secondary-fixed-variant": "#334155",
              "primary-fixed-dim": "#bfdbfe",
              "on-secondary": "#ffffff",
              "on-surface-variant": "#64748b",
              "on-primary": "#ffffff",
              "surface-tint": "#4B9AF6",
              "on-primary-fixed": "#1e40af",
              "outline-variant": "#e2e8f0",
              "surface-dim": "#f6f6f8",
              "surface": "#ffffff"
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
        }
        body { font-family: 'Manrope', sans-serif; }
    </style>
</head>
<body class="bg-background text-on-background antialiased min-h-screen">
<!-- SideNavBar Shell -->
<aside class="fixed left-0 top-0 h-full z-40 h-screen w-64 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm font-manrope text-sm font-medium">
<div class="p-6">
<h1 class="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">TopViec</h1>
<p class="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Recruitment Management</p>
</div>
<nav class="mt-4 flex flex-col gap-1">
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">work</span>
<span>Tin tuyển dụng</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">group</span>
<span>Ứng viên</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold border-r-4 border-blue-500" href="#">
<span class="material-symbols-outlined">event</span>
<span>Phỏng vấn</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span>Cài đặt</span>
</a>
</nav>
<div class="absolute bottom-8 left-0 w-full px-6">
<div class="p-4 bg-primary-fixed rounded-xl flex flex-col gap-2">
<p class="text-xs font-bold text-on-primary-fixed">Hỗ trợ NTT</p>
<p class="text-[11px] text-on-primary-fixed-variant">Bạn cần trợ giúp trong việc đánh giá?</p>
<button class="mt-2 text-[11px] font-bold bg-white text-primary py-2 px-3 rounded-lg shadow-sm">Xem hướng dẫn</button>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-64 min-h-screen">
<!-- TopAppBar -->
<header class="sticky top-0 right-0 flex items-center justify-between px-6 z-30 h-16 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
<div class="flex items-center gap-4 flex-1">
<div class="relative w-96">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
<input class="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Tìm kiếm ứng viên hoặc mã phỏng vấn..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
<span class="material-symbols-outlined text-secondary">notifications</span>
</button>
<button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
<span class="material-symbols-outlined text-secondary">help</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="User Profile" class="h-full w-full object-cover" data-alt="Professional headshot of a recruitment manager in a minimalist office setting with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtAqD3sZSlY_gC-NeGEf87Zb-3gL2ZEckGv_cd6PTDd91we65Fsaa2mGCETrU8-iNX2un4khxy86xK5tZSjB_5MJSqvo1Am1w-ssc6HQT4nBOIYsI_o0EomKtPIosuXmUqNevCiIYaDulpwY9eqwo2lsaq7QGwuRGP8NiSnJDXoSRIj60EMKzpmp2Nlee09ZLf3KT3Mr0QTKwzVboDy5PAS-kO-mv3Orgsjrafv9pGefhYdQlIozy2Px_ZKAAseFHl4o3N15BWMA"/>
</div>
</div>
</header>
<!-- Content Canvas -->
<div class="p-8 max-w-7xl mx-auto">
<!-- Page Header -->
<div class="flex items-end justify-between mb-8">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="bg-blue-100 text-blue-600 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">Phiên phỏng vấn</span>
<span class="text-secondary text-sm">#IV-2024-0852</span>
</div>
<h2 class="text-3xl font-extrabold text-on-surface tracking-tight">Ghi nhận Kết quả Phỏng vấn</h2>
<p class="text-secondary mt-1">Đánh giá năng lực ứng viên cho vị trí <span class="font-bold text-on-surface">Senior Product Designer</span></p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-secondary bg-white border border-outline rounded-lg hover:shadow-md transition-all">
<span class="material-symbols-outlined text-lg">history</span> Lịch sử
                    </button>
<button class="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined text-lg">check_circle</span> Lưu tất cả kết quả
                    </button>
</div>
</div>
<!-- Dashboard Stats / Header Info -->
<div class="grid grid-cols-4 gap-6 mb-8">
<div class="bg-white p-6 rounded-xl shadow-sm">
<p class="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">Vòng Phỏng vấn</p>
<p class="text-xl font-extrabold text-on-surface">Vòng 2: Kỹ năng Chuyên sâu</p>
</div>
<div class="bg-white p-6 rounded-xl shadow-sm">
<p class="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">Số lượng ứng viên</p>
<p class="text-xl font-extrabold text-on-surface">03 <span class="text-sm font-medium text-secondary">Người</span></p>
</div>
<div class="bg-white p-6 rounded-xl shadow-sm">
<p class="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">Thời gian</p>
<p class="text-xl font-extrabold text-on-surface">14:00 - 16:30</p>
</div>
<div class="bg-white p-6 rounded-xl shadow-sm">
<p class="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">Hội đồng PV</p>
<div class="flex -space-x-2 mt-1">
<img alt="Interviewer 1" class="h-8 w-8 rounded-full border-2 border-white" data-alt="Minimalist professional portrait of a tech lead with neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSUL_bAPkrFIaIxlZ_vpGDwKgziip5szaw9y6wH6O0gzA_dWdAfGzeEJFOGTQuKS09FM5R0N8Q_HmM9qv_fSJMD4FE_EmnRNuzxYYI415xRG9suPSdEHd3kcaPgVgp6X45jWv23__2aeD0oMXbhckXDF10HsvXR0Ir6Z8kP2RK04zDIVnxtDQhsvkkRSEi0Jq0pWxf4_8giK67k4pYtWW3rJ0iLDWnhs_Au7JgQXV6KxXxQ4z9WdDceDo_w5-X9_6sjwZ99aU03g"/>
<img alt="Interviewer 2" class="h-8 w-8 rounded-full border-2 border-white" data-alt="Modern professional portrait of a designer in a clean workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1sB_6RMkqIjHYRIJAwtj0nGw4cJ28PHz3pZCFkMNzwWtakxqFV94CIP0fmw5SicDfnX_6yE5bZOZ82-31e6E6cgyTKpOwY7aOL9p9BmdX0PqA9NQPIYfQJs0eg3a-RxMl5ZhvlrznS6RACcjHQUGYmZya8N2x1wvZZp2y3tlYr_zZxQ-2C2iBNXUv0xsYNsmY-w1rH3nV6Fzl6gPw3VrbZvrMFtXSBb_tOHSIJBPBSAUHhRAPSWXtI6QQ3J8_EU5tPjA3UT_FMQ"/>
<div class="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-secondary">+1</div>
</div>
</div>
</div>
<!-- Multi-Candidate Evaluation List -->
<div class="space-y-6">
<!-- Candidate Card 1 -->
<div class="bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-primary">
<div class="p-6 border-b border-slate-50 flex items-start justify-between">
<div class="flex items-center gap-4">
<div class="relative">
<img alt="Candidate" class="w-14 h-14 rounded-full object-cover" data-alt="Portrait of a creative professional woman against a soft pastel blue background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVR95UrfjvOCRB81n8ks0NZa6d4XF_YxR2nUZqxekOhns9KyU-6BbUynj9R9VF-2zYQsaituidct5kQqnYcOpl-EgJzcKg5-uSZXoa86b1FM_Fb_4TaCG6w1J9ERz8gRa6h1r6oJwo6wcZRdrZChkgqLEfe1ZaC--yXNpAM3DyBORiImGrZQgGL_TFDMTfMJqVnZbHQrMHcBxF_A0sCq6zQNF71NPXJDEsz7m94VpOxFOocVgyZru0LscFI9iaFScNPs2dVSvsJQ"/>
<div class="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
</div>
<div>
<h3 class="text-lg font-extrabold text-on-surface">Nguyễn Minh Anh</h3>
<p class="text-sm text-secondary">UX Researcher | 4 năm kinh nghiệm</p>
<div class="flex items-center gap-4 mt-2">
<span class="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
<span class="material-symbols-outlined text-xs">file_present</span> Portfolio.pdf
                                    </span>
<span class="flex items-center gap-1 text-[11px] font-bold text-slate-500">
<span class="material-symbols-outlined text-xs">schedule</span> Phỏng vấn xong
                                    </span>
</div>
</div>
</div>
<div class="flex flex-col items-end gap-2">
<span class="text-[11px] font-bold text-secondary uppercase tracking-widest">Xếp hạng năng lực</span>
<div class="flex gap-1">
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-slate-200">star</span>
</div>
</div>
</div>
<div class="p-6 grid grid-cols-12 gap-6 bg-surface-container-low">
<div class="col-span-7 space-y-4">
<div>
<label class="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Nhận xét (Công khai cho team)</label>
<textarea class="w-full bg-white border-outline-variant rounded-xl text-sm focus:ring-primary focus:border-primary placeholder:text-slate-300" placeholder="Ghi lại các điểm mạnh và điểm yếu về chuyên môn..." rows="3"></textarea>
</div>
<div>
<label class="block text-[11px] font-bold text-secondary uppercase tracking-widest mb-2">Ghi chú nội bộ (Chỉ dành cho NTT)</label>
<textarea class="w-full bg-white/50 border-outline-variant rounded-xl text-sm focus:ring-primary focus:border-primary placeholder:text-slate-300 italic" placeholder="Các lưu ý đặc biệt về lương, tính cách..." rows="2"></textarea>
</div>
</div>
<div class="col-span-5 flex flex-col justify-between">
<div class="space-y-4">
<label class="block text-[11px] font-bold text-secondary uppercase tracking-widest">Quyết định tuyển dụng</label>
<div class="grid grid-cols-2 gap-3">
<button class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-emerald-500 text-emerald-600 font-extrabold hover:bg-emerald-50 transition-all">
<span class="material-symbols-outlined">verified</span> PASS
                                    </button>
<button class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-400 font-extrabold hover:border-error hover:text-error hover:bg-error-container/20 transition-all">
<span class="material-symbols-outlined">cancel</span> FAIL
                                    </button>
</div>
</div>
<div class="mt-4 p-4 bg-white rounded-xl border border-slate-100">
<div class="flex items-center justify-between text-xs">
<span class="text-secondary">Độ phù hợp văn hóa:</span>
<span class="font-bold text-on-surface">85%</span>
</div>
<div class="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
<div class="bg-primary h-full w-[85%]"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Candidate Card 2 (Minimized/Draft) -->
<div class="bg-white rounded-xl shadow-sm overflow-hidden opacity-80 border-l-4 border-slate-200 hover:opacity-100 transition-all">
<div class="p-6 flex items-center justify-between">
<div class="flex items-center gap-4">
<img alt="Candidate" class="w-12 h-12 rounded-full grayscale" data-alt="Professional portrait of a young man with glasses in a minimalist workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjBbCyh2DkqqtCYon-n7z8L0gkGxp3qOQaebcPmDax56_OCGsjn2vUtmRL0A4WM8yfYgMmISfnkFJcDOBuTteQs2levFZWICMsFpKL-LQyJJmD-tAtTn90UfbXgV-_1OI-ygbskW9R5ZFWO-IVBExTou1WzSY6dY3AEeFIzGRsJKsyc65Vnolbf34qvrhk_637GPGCGpJo8G8nJmTb9WMa-hmECHSDasYHzoW5KZ8ZlF7-Jv76lWjS1V48JjLYyUhMBnT_6nYIQQ"/>
<div>
<h3 class="text-base font-bold text-on-surface">Trần Thái Dương</h3>
<p class="text-xs text-secondary">Product Designer | 2 năm kinh nghiệm</p>
</div>
</div>
<div class="flex items-center gap-6">
<div class="text-right">
<p class="text-[10px] font-bold text-secondary uppercase mb-1">Đánh giá nhanh</p>
<div class="flex gap-0.5">
<span class="material-symbols-outlined text-slate-200 text-lg">star</span>
<span class="material-symbols-outlined text-slate-200 text-lg">star</span>
<span class="material-symbols-outlined text-slate-200 text-lg">star</span>
<span class="material-symbols-outlined text-slate-200 text-lg">star</span>
<span class="material-symbols-outlined text-slate-200 text-lg">star</span>
</div>
</div>
<button class="bg-slate-100 hover:bg-slate-200 text-on-surface font-bold text-xs py-2 px-4 rounded-lg transition-colors">Ghi nhận đánh giá</button>
</div>
</div>
</div>
<!-- Candidate Card 3 (In Progress) -->
<div class="bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-amber-400">
<div class="p-6 border-b border-slate-50 flex items-start justify-between">
<div class="flex items-center gap-4">
<img alt="Candidate" class="w-14 h-14 rounded-full object-cover" data-alt="Portrait of a confident professional man in a dark polo shirt against a neutral grey background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaCaL0eVEsyDnBZjNkLAJ4u3UZdqrkZhWwd4zdCV58gEQV1v9VfwIY6dujtiUGC_AAeI4y7zs4YDvQOSiceQaaBARs3fBeFlv7YhqI8NQvi8IsvqcMSz18186IvuOJaH-hPHnQyJU-1YJTQsVRXQAYUdJLUzY3Yb13lSm9FlAmqVxPi9DA9qWJynNSt1nMSlWpAyvrYL2_sJY07_cjnq8VZ0gbimNd5U27LH7nZsnXxkb8w8-Yd-0EYj9I1GwFwHQZarLyVNKq_Q"/>
<div>
<h3 class="text-lg font-extrabold text-on-surface">Lê Hoàng Nam</h3>
<p class="text-sm text-secondary">Senior Designer | 6 năm kinh nghiệm</p>
<div class="flex items-center gap-4 mt-2">
<span class="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
<span class="material-symbols-outlined text-xs">pending</span> Đang thực hiện
                                    </span>
</div>
</div>
</div>
<div class="flex flex-col items-end gap-2">
<span class="text-[11px] font-bold text-secondary uppercase tracking-widest">Xếp hạng năng lực</span>
<div class="flex gap-1">
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-amber-400" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-slate-200">star</span>
<span class="material-symbols-outlined text-slate-200">star</span>
</div>
</div>
</div>
<div class="p-6 bg-surface-container-low">
<div class="flex items-center justify-between mb-4">
<p class="text-[11px] font-bold text-secondary uppercase tracking-widest italic">Hệ thống đang lưu tạm bản nháp...</p>
<button class="text-primary text-xs font-bold hover:underline">Chi tiết bản nháp</button>
</div>
<div class="grid grid-cols-2 gap-4">
<button class="py-2 px-4 rounded-lg border border-primary text-primary font-bold text-xs bg-white hover:bg-blue-50 transition-all">Gửi thông báo kết quả sớm</button>
<button class="py-2 px-4 rounded-lg bg-primary text-white font-bold text-xs shadow-sm">Hoàn thành đánh giá</button>
</div>
</div>
</div>
</div>
<!-- Bulk Actions Footer (Sticky if needed) -->
<div class="mt-12 bg-on-background text-white rounded-2xl p-8 flex items-center justify-between shadow-xl">
<div class="flex items-center gap-6">
<div class="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
<span class="material-symbols-outlined text-3xl">fact_check</span>
</div>
<div>
<h4 class="text-xl font-bold">Ghi nhận hàng loạt</h4>
<p class="text-white/60 text-sm">Áp dụng một trạng thái cho tất cả ứng viên còn lại trong danh sách.</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
<span class="text-xs font-bold text-white/80">Trạng thái:</span>
<select class="bg-transparent border-none text-sm font-bold focus:ring-0 p-0 cursor-pointer">
<option class="text-on-surface">Chuyển vòng tiếp</option>
<option class="text-on-surface">Từ chối (Email mẫu)</option>
<option class="text-on-surface">Lưu hồ sơ tiềm năng</option>
</select>
</div>
<button class="bg-primary hover:bg-blue-400 text-white font-extrabold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/40">Thực thi hàng loạt</button>
</div>
</div>
</div>
</main>
</body></html>