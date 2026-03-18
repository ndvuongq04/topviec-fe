<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
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
                        "primary": "#4B9AF6",
                        "background-light": "#f6f6f8",
                        "background-dark": "#151220",
                    },
                    fontFamily: {
                        "display": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<title>TopViec Employer Dashboard</title>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
<div class="flex h-screen overflow-hidden">
<!-- Sidebar -->
<aside class="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
<div class="p-6 flex items-center gap-3">
<div class="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">rocket_launch</span>
</div>
<div>
<h1 class="font-bold text-lg leading-tight">TopViec</h1>
<p class="text-xs text-slate-500 dark:text-slate-400">Employer Portal</p>
</div>
</div>
<nav class="flex-1 px-4 space-y-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">work</span>
                Tin tuyển dụng
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">group</span>
                Ứng viên
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">person_search</span>
                Tìm CV
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">bar_chart</span>
                Báo cáo
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">manage_accounts</span>
                Quản lý nhóm
            </a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800">
<div class="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 relative"><div class="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50" id="profile-dropdown">
<a class="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-lg">person</span>
        Thông tin cá nhân
    </a>
<a class="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-lg">lock</span>
        Đổi mật khẩu
    </a>
<div class="my-1 border-t border-slate-100 dark:border-slate-700"></div>
<a class="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" href="#">
<span class="material-symbols-outlined text-lg">logout</span>
        Đăng xuất
    </a>
</div>
<div class="size-10 rounded-full bg-cover bg-center" data-alt="User profile avatar image" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHFIciNRa4613R_i-DB-jVWW2xG5Q45JKFrstcd3tMunZZGYPDeAUTjnv-uSDnNCAy3-bCrPJwbfYT-kOsYnTBVkh3fWReuLkebsXnxceenvyDmOzTCqEwSiRxOP6umT2SmC6FUZ34KDqYW6Bi-BRFgcevLuHDK2mToW0WgMlZsAQTZcqaMjvDO2fMo_UEuVjZ9Rjo-bfdNZfN1-6iz7SD5CwwOvnMmm15ETJ1WBiBXzME5sS8vpdXgsb8WA6qjEASGsk9P1vV-w')"></div>
<div class="flex-1 min-w-0">
<p class="text-sm font-bold truncate">Hồng Nhung</p>
<p class="text-xs text-slate-500 truncate">HR Manager</p>
</div>
<button class="text-slate-400 hover:text-primary">
<span class="material-symbols-outlined text-xl">settings</span>
</button>
</div>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
<!-- Header -->
<header class="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<div>
<h2 class="text-2xl font-bold">Tổng quan</h2>
<p class="text-sm text-slate-500">Chào mừng trở lại, Hồng Nhung</p>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden md:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
<input class="pl-10 pr-4 py-2 w-64 bg-white dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm" placeholder="Tìm ứng viên, tin đăng..." type="text"/>
</div>
<button class="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
</button>
<button class="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
<span class="material-symbols-outlined text-lg">add</span>
                    Tạo tin mới
                </button>
</div>
</header>
<div class="px-8 pb-8 space-y-6">
<!-- Metrics -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
<span class="material-symbols-outlined">work</span>
</div>
<span class="text-green-500 text-sm font-bold flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                            +12% <span class="material-symbols-outlined text-xs ml-1">trending_up</span>
</span>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Tin tuyển dụng hoạt động</p>
<h3 class="text-3xl font-extrabold mt-1">24</h3>
</div>
<div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
<span class="material-symbols-outlined">description</span>
</div>
<span class="text-green-500 text-sm font-bold flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                            +28% <span class="material-symbols-outlined text-xs ml-1">trending_up</span>
</span>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Tổng CV nhận được</p>
<h3 class="text-3xl font-extrabold mt-1">1,280</h3>
</div>
<div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-primary/10 text-primary rounded-xl">
<span class="material-symbols-outlined">conversion_path</span>
</div>
<span class="text-red-500 text-sm font-bold flex items-center bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                            -2.4% <span class="material-symbols-outlined text-xs ml-1">trending_down</span>
</span>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Tỉ lệ chuyển đổi</p>
<h3 class="text-3xl font-extrabold mt-1">12.5%</h3>
</div>
</div>
<!-- Main Charts & Table -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Trend Chart -->
<div class="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
<div class="flex items-center justify-between mb-6">
<div>
<h4 class="font-bold text-lg">Hiệu suất tuyển dụng</h4>
<p class="text-sm text-slate-500">Thống kê ứng tuyển 7 ngày qua</p>
</div>
<select class="bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-primary">
<option>Tuần này</option>
<option>Tháng này</option>
</select>
</div>
<div class="flex-1 min-h-[250px] relative">
<svg class="w-full h-full" preserveaspectratio="none" viewbox="0 0 500 200">
<defs>
<lineargradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#4B9AF6" stop-opacity="0.2"></stop>
<stop offset="100%" stop-color="#4B9AF6" stop-opacity="0"></stop>
</lineargradient>
</defs>
<path d="M0,180 Q50,150 100,160 T200,80 T300,100 T400,40 T500,60 L500,200 L0,200 Z" fill="url(#chartGradient)"></path>
<path d="M0,180 Q50,150 100,160 T200,80 T300,100 T400,40 T500,60" fill="none" stroke="#4B9AF6" stroke-width="3"></path>
</svg>
<div class="absolute bottom-0 left-0 w-full flex justify-between text-xs text-slate-400 font-bold px-2">
<span>Thứ 2</span><span>Thứ 3</span><span>Thứ 4</span><span>Thứ 5</span><span>Thứ 6</span><span>Thứ 7</span><span>CN</span>
</div>
</div>
</div>
<!-- Candidates List -->
<div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
<div class="flex items-center justify-between mb-4">
<h4 class="font-bold text-lg">Ứng viên mới</h4>
<a class="text-primary text-sm font-bold hover:underline" href="#">Xem tất cả</a>
</div>
<div class="space-y-4">
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
<div class="size-10 rounded-full bg-cover bg-center" data-alt="Candidate avatar portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7HnUZyA3UrcpS4QjszxO9TecRYdzibfxb3o8AFtOvDtoa8lzKWFr-2OOtjLwJirr8Hf3oIaillnsgiLpiJ-2M5vH_JSrU6fxGzhXyv_7SIL1MRv2SzXIn3VJsHH6Pa6-BVei0FavN3dbpqZ4kLOiq1Jmkq2SJ1Q1PQJ64Vb2KMMWHGO7bhg2_qi8kEJB9DDuXOYtl8kGiZn-jtdiZ-8errVFcyKVlEIUBVJux6emgawWJB9llXt7oF1LGgsHNSi2J4iPSUSyCcA')"></div>
<div class="flex-1 min-w-0">
<p class="text-sm font-bold truncate">Trần Văn Nam</p>
<p class="text-xs text-slate-500 truncate">UI/UX Designer</p>
</div>
<span class="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">New</span>
</div>
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
<div class="size-10 rounded-full bg-cover bg-center" data-alt="Candidate avatar portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxZ9PR7H3ospQUjKh7Qut_YLZxeLrgM_VcdJEDGP_SbVrZ8ROEBoiP1CiA7xDVVRZpIhbrwEoN4Zxz8MycpWruPTFsgB_dwAMjpVX258MfNa-JKmCEdDjo86mogcVYIvGGarBVz7hkF4yB9E5cf1Kv5rGF11TJeX6jV6zQ7DZPlZIem3m4GvUSC-R3YnmZcYmzWgrduiR0nBJV0eV6kNyDJ0sZ4GMTcsgWfYGxBCPo4X7NU3YtWBsLQ64J0tifO5j-QmB-7kbtDw')"></div>
<div class="flex-1 min-w-0">
<p class="text-sm font-bold truncate">Lê Thị Mai</p>
<p class="text-xs text-slate-500 truncate">Marketing Specialist</p>
</div>
<span class="text-[10px] text-slate-400 font-medium">2h ago</span>
</div>
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
<div class="size-10 rounded-full bg-cover bg-center" data-alt="Candidate avatar portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoq9E2imf4xXS8CFTSV1McWB3jLBUp5gYJ9S4LnuXdrjyYx16AQVEcgXLPw0DVfEPXbHYC8Qb7JFlJsb5j-qhfOr9Pyl31ePQ4cdC8p92pF-8_y4PqChD7TacdbmN4qKRbx3bnbt-s6c-pxpsYsKeNl6xNdtWt4XK8KHW3DiaKfP9Obwb0vN0v1z-DwYNHWI4jcn_5-BbazTjhe-gs6vP8ulFWFyrV3VAzy2UVAViyzm5l57lqwvResBB6XcT5PPcC1x91CT0zOw')"></div>
<div class="flex-1 min-w-0">
<p class="text-sm font-bold truncate">Nguyễn Quốc Huy</p>
<p class="text-xs text-slate-500 truncate">Frontend Developer</p>
</div>
<span class="text-[10px] text-slate-400 font-medium">5h ago</span>
</div>
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
<div class="size-10 rounded-full bg-cover bg-center" data-alt="Candidate avatar portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLtsSzMk3ZjIb60nKOIYn-4Dxg30uoKlGF1_l_jQBugqemQ3Xl3rPjc4o0aMop9Nj3hnLyjojLsdm9kr0N5PYiYfnDrbgNf4bBiKXl4abuqOnC5AzXCnuLjR5MVkJW8be-x0TndAaWpMyHyw753UbdmvX_IJx6Gy9SHEZJdM3TrKikt8z3YgzKqtknt_KEP4kvOiUAAy_662VmrRKfToeu9kpa-kQdGP2MiPeMuQebQe300cnyxBFVTVQgPbMYZr6bl5wIkVHF7g')"></div>
<div class="flex-1 min-w-0">
<p class="text-sm font-bold truncate">Phạm Minh Anh</p>
<p class="text-xs text-slate-500 truncate">Project Manager</p>
</div>
<span class="text-[10px] text-slate-400 font-medium">1d ago</span>
</div>
</div>
</div>
</div>
<!-- Recent Job Posts -->
<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
<div class="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
<h4 class="font-bold text-lg">Tin tuyển dụng gần đây</h4>
<button class="text-slate-500 hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="text-xs font-bold text-slate-400 uppercase tracking-wider">
<th class="px-6 py-4">Vị trí</th>
<th class="px-6 py-4">Ngày đăng</th>
<th class="px-6 py-4">Lượt xem</th>
<th class="px-6 py-4">Hồ sơ</th>
<th class="px-6 py-4 text-right">Trạng thái</th>
</tr>
</thead>
<tbody class="divide-y divide-slate-50 dark:divide-slate-700/50">
<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
<td class="px-6 py-4">
<div class="flex flex-col">
<span class="font-bold text-sm">Senior Java Developer</span>
<span class="text-xs text-slate-400">Hồ Chí Minh, Quận 1</span>
</div>
</td>
<td class="px-6 py-4 text-sm">12/10/2023</td>
<td class="px-6 py-4 text-sm">1,204</td>
<td class="px-6 py-4 text-sm font-bold text-primary">85</td>
<td class="px-6 py-4 text-right">
<span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">Hoạt động</span>
</td>
</tr>
<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
<td class="px-6 py-4">
<div class="flex flex-col">
<span class="font-bold text-sm">Product Designer (UI/UX)</span>
<span class="text-xs text-slate-400">Hà Nội, Cầu Giấy</span>
</div>
</td>
<td class="px-6 py-4 text-sm">08/10/2023</td>
<td class="px-6 py-4 text-sm">850</td>
<td class="px-6 py-4 text-sm font-bold text-primary">42</td>
<td class="px-6 py-4 text-right">
<span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">Hoạt động</span>
</td>
</tr>
<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
<td class="px-6 py-4">
<div class="flex flex-col">
<span class="font-bold text-sm">Marketing Executive</span>
<span class="text-xs text-slate-400">Đà Nẵng, Hải Châu</span>
</div>
</td>
<td class="px-6 py-4 text-sm">01/10/2023</td>
<td class="px-6 py-4 text-sm">420</td>
<td class="px-6 py-4 text-sm font-bold text-primary">12</td>
<td class="px-6 py-4 text-right">
<span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold">Đã đóng</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
</div>
</body></html>