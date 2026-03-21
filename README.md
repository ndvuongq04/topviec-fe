<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>TechFlow Solutions - Company Profile | TopViec</title>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#137fec",
              "primary-dark": "#0b5cb5",
              "background-light": "#f6f7f8",
              "background-dark": "#101922",
              "surface-light": "#ffffff",
              "surface-dark": "#1a2632",
              "text-main": "#0f172a",
              "text-muted": "#64748b",
            },
            fontFamily: {
              display: ["Spline Sans", "sans-serif"],
              sans: ["Spline Sans", "sans-serif"],
            },
            borderRadius: {
              DEFAULT: "0.5rem",
              lg: "1rem",
              xl: "1.5rem",
              full: "9999px",
            },
          },
        },
      }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-text-main antialiased min-h-screen flex flex-col">
<!-- Navbar -->
<header class="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800">
<div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex h-16 items-center justify-between gap-4">
<!-- Logo -->
<div class="flex items-center gap-2">
<div class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
<span class="material-symbols-outlined text-[28px]">business_center</span>
</div>
<span class="text-xl font-bold tracking-tight text-text-main dark:text-white">TopViec</span>
</div>
<!-- Search (Hidden on mobile) -->
<div class="hidden md:flex flex-1 max-w-md mx-8">
<div class="relative w-full group">
<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
<span class="material-symbols-outlined text-[20px]">search</span>
</div>
<input class="block w-full rounded-xl border-none bg-background-light dark:bg-background-dark py-2.5 pl-10 pr-3 text-sm text-text-main placeholder:text-text-muted focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search for jobs, companies..." type="text"/>
</div>
</div>
<!-- Nav Links & Auth -->
<div class="flex items-center gap-6">
<nav class="hidden lg:flex gap-6">
<a class="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Jobs</a>
<a class="text-sm font-medium text-text-main dark:text-white transition-colors" href="#">Companies</a>
<a class="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Salaries</a>
<a class="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Advice</a>
</nav>
<div class="flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-6">
<button class="text-sm font-bold text-text-main dark:text-white hover:text-primary transition-colors">Log In</button>
<button class="hidden sm:flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm shadow-primary/30">
                            Sign Up
                        </button>
</div>
</div>
</div>
</div>
</header>
<!-- Main Content -->
<main class="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
<!-- Hero Section -->
<div class="relative mb-8 rounded-3xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-sm">
<!-- Cover Image -->
<div class="h-48 md:h-64 lg:h-80 w-full bg-cover bg-center relative group" data-alt="Modern office open space with large windows and plants" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJYGefPbGq9DE3gYEwJLaXILq11eQMb86gZ3Kb52SAECvRpXCUMIw28o3e6CxrmuQA5fVCqBbLKRbxGADTqomM29QAGdEIA4QHNR9a-TJYvRwE43ME2honHZD4Giy7byZr0nEGR1bSbcT9-W8kVtBSqinWGCqZOs8NPpkF3EaEXXl-NssEYWvYFwIHj1tS6zNiKrJbHWyEzOXNz1lxelC_OtIgt5yj8GUAKQeeYVPtO_vLudBBlpdLDN2ziTelIbbCokE6RRlkIUft');">
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
</div>
<!-- Company Info Overlay/Block -->
<div class="relative px-6 pb-6 pt-0 -mt-16 sm:-mt-20 md:px-10 flex flex-col sm:flex-row items-end sm:items-end gap-6">
<!-- Logo Box -->
<div class="size-32 rounded-2xl bg-white p-2 shadow-lg ring-4 ring-white dark:ring-surface-dark dark:bg-surface-dark shrink-0 flex items-center justify-center">
<div class="flex items-center justify-center size-full rounded-xl bg-gray-50 dark:bg-gray-800">
<span class="material-symbols-outlined text-primary text-5xl">deployed_code</span>
</div>
</div>
<!-- Text Info -->
<div class="flex-1 flex flex-col gap-1 pb-2">
<h1 class="text-3xl font-bold text-white sm:text-4xl drop-shadow-md sm:drop-shadow-none sm:text-text-main sm:dark:text-white">TechFlow Solutions</h1>
<p class="text-gray-200 sm:text-text-muted text-base font-medium max-w-2xl">Innovating the future of workflow automation. We help teams move faster.</p>
<div class="flex flex-wrap gap-4 mt-2 text-sm text-gray-300 sm:text-text-muted">
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">location_on</span>
<span>San Francisco, CA</span>
</div>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">domain</span>
<span>Internet &amp; Software</span>
</div>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[18px]">group</span>
<span>50-200 Employees</span>
</div>
</div>
</div>
<!-- Actions -->
<div class="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
<button class="flex-1 sm:flex-none items-center justify-center rounded-xl bg-primary h-12 px-6 text-white text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex gap-2">
<span class="material-symbols-outlined">add</span>
<span>Follow</span>
</button>
<button class="items-center justify-center rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 size-12 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors hidden sm:flex">
<span class="material-symbols-outlined">share</span>
</button>
</div>
</div>
</div>
<!-- Navigation Tabs -->
<div class="sticky top-16 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 mb-8">
<div class="flex gap-8 overflow-x-auto no-scrollbar">
<a class="flex items-center gap-2 border-b-[3px] border-primary py-4 text-primary" href="#">
<span class="text-sm font-bold whitespace-nowrap">About Us</span>
</a>
<a class="flex items-center gap-2 border-b-[3px] border-transparent py-4 text-text-muted hover:text-text-main hover:border-gray-300 dark:hover:text-white transition-all group" href="#">
<span class="text-sm font-bold whitespace-nowrap">Life at TechFlow</span>
<span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold group-hover:bg-gray-200 dark:group-hover:bg-gray-700">12</span>
</a>
<a class="flex items-center gap-2 border-b-[3px] border-transparent py-4 text-text-muted hover:text-text-main hover:border-gray-300 dark:hover:text-white transition-all group" href="#">
<span class="text-sm font-bold whitespace-nowrap">Open Jobs</span>
<span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">4</span>
</a>
<a class="flex items-center gap-2 border-b-[3px] border-transparent py-4 text-text-muted hover:text-text-main hover:border-gray-300 dark:hover:text-white transition-all" href="#">
<span class="text-sm font-bold whitespace-nowrap">Reviews</span>
</a>
</div>
</div>
<!-- Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Left Column: Main Info -->
<div class="lg:col-span-2 space-y-10">
<!-- Who We Are -->
<section>
<h2 class="text-2xl font-bold text-text-main dark:text-white mb-4">Who We Are</h2>
<div class="prose prose-slate dark:prose-invert max-w-none text-text-muted dark:text-gray-300 leading-relaxed">
<p class="mb-4">
                            At TechFlow Solutions, we believe that the best way to predict the future is to invent it. Founded in 2018, we have been on a mission to simplify complex workflows for enterprise teams around the globe.
                        </p>
<p>
                            We are a diverse team of dreamers, builders, and doers. We don't just write code; we craft experiences that empower people to do their best work. Our platform is used by over 5,000 companies, from startups to Fortune 500s.
                        </p>
</div>
</section>
<!-- Core Values -->
<section>
<div class="flex items-center justify-between mb-6">
<h2 class="text-2xl font-bold text-text-main dark:text-white">Our Core Values</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<!-- Value 1 -->
<div class="flex gap-4 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
<div class="shrink-0 flex items-center justify-center size-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary">
<span class="material-symbols-outlined text-[28px]">lightbulb</span>
</div>
<div>
<h3 class="font-bold text-text-main dark:text-white text-lg">Innovation First</h3>
<p class="text-sm text-text-muted mt-1">We push boundaries to create better solutions every day.</p>
</div>
</div>
<!-- Value 2 -->
<div class="flex gap-4 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
<div class="shrink-0 flex items-center justify-center size-12 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
<span class="material-symbols-outlined text-[28px]">visibility</span>
</div>
<div>
<h3 class="font-bold text-text-main dark:text-white text-lg">Transparency</h3>
<p class="text-sm text-text-muted mt-1">Open communication at all levels of the company.</p>
</div>
</div>
<!-- Value 3 -->
<div class="flex gap-4 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
<div class="shrink-0 flex items-center justify-center size-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
<span class="material-symbols-outlined text-[28px]">balance</span>
</div>
<div>
<h3 class="font-bold text-text-main dark:text-white text-lg">Work-Life Balance</h3>
<p class="text-sm text-text-muted mt-1">Flexible hours and a remote-first culture.</p>
</div>
</div>
<!-- Value 4 -->
<div class="flex gap-4 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
<div class="shrink-0 flex items-center justify-center size-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
<span class="material-symbols-outlined text-[28px]">diversity_3</span>
</div>
<div>
<h3 class="font-bold text-text-main dark:text-white text-lg">Inclusivity</h3>
<p class="text-sm text-text-muted mt-1">We celebrate diversity and unique perspectives.</p>
</div>
</div>
</div>
</section>
<!-- Gallery -->
<section>
<h2 class="text-2xl font-bold text-text-main dark:text-white mb-6">Office &amp; Culture</h2>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
<div class="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
<img alt="Team meeting in a modern open office space" class="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Team collaborating around a table with laptops" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARlquIjgdBF-mxLOXxhSSYfXQ7qupKEP55Ii5CQ4JjyAk-l4rpgFbtnkXNtv_gpkLHwUXbyThkdg5FVQDKKJUK3ttaHUcw_wGExD-DVqfnYS738YB3CY4B_JuBG76hQqMwAFyL1qfgVoqEgN_8Dv13pEsQOf8F0Q5CsEyJ8QNWKDK8sBOSWYOXhEO_KUji6xp7Yvj2LvESC_ad7PLQGaj-UDrp8ERBFdk8LSkCI2urONh37uU3nfnLCCiSkohrgr5hdFneISaYZ48s"/>
<div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
</div>
<div class="relative group overflow-hidden rounded-2xl">
<img alt="Two employees discussing work in a casual setting" class="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Two colleagues shaking hands in meeting room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkdafoOVvrcqn8NE7mvX4raIV6v0OezGo_IewrM1FuPHy1aW0vB7bRnTDCbWuS7w49XXJ_yMy3GDZ0K7z7_uDwJcm73emV1ygPFRuA0QmTA34GD2mEcUfp7zpPGftJCwgHTjhXXVt53SOSTRsvDiO9gZJMclhLS4pbGWGY2fSvbUYHFi-oyaE7hAg28nKvzUZ2sUCVzuOUvCxYhk4LlW9c4sX7CEErW3ZEMqftJC4rhQyJSUmmosT7BVzyNpLQsDuvO3TotCiG4a2D"/>
</div>
<div class="relative group overflow-hidden rounded-2xl">
<img alt="Group of people working together in a conference room" class="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Colleagues laughing during a break" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT_Eqatwl0EO5miwuIigxxsQuAeFVBdBaS8Os14BTel7aDhp_fNgph7r6f_RqKlYS5JbBSDvYE0jsi6u4XqqK8C9c2X27zqLR2z8fdiA_glJdfO6YXaluoXZX3E1UQnYcNfopSTPssEfs7ZNFi3LMTepb2WUsUt7mZKQFWlyfGjaSROvzqNn8SGGiK0XnTs05lk62rQWg1d1rvBDuG4X9l91avU2I6GHTcYkS1TR7yVAJmBbPcPBwj9v3E3a6h2YCmMVjn4MmELFEb"/>
</div>
<div class="col-span-2 relative group overflow-hidden rounded-2xl">
<img alt="Woman presenting to a group of colleagues" class="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" data-alt="Employee presentation during all-hands meeting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfGjdG4wVRvYLgzYpYpSVPrgv_eZAdPj2iKJeiMr4H4IGOplkftauHdZf5kCY1YNMSsPUikOXTQrtodhNC61MHx5vOre3TakfZuUMqJ4S2IUSUkH0-ENOD1rlwZZV4lPgmI5tY3YUtIS2ZXhK6YXOfi5j1Vpru58FCXE9w1G34rpAOSLBN4xMWXo6nHybKXNPuIhMzwC0BZN2TiNXTuO_KBELXkICcuepj2rdjqV0hAlXvoRptnRWZVFGj85pKljUze672G4nsEnmA"/>
</div>
</div>
</section>
</div>
<!-- Right Column: Sidebar -->
<div class="lg:col-span-1 space-y-6">
<!-- Quick Facts Card -->
<div class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
<h3 class="text-lg font-bold text-text-main dark:text-white mb-4">Company Overview</h3>
<div class="space-y-4">
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-text-muted mt-0.5">language</span>
<div>
<p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Website</p>
<a class="text-sm font-medium text-primary hover:underline" href="#">techflow.io</a>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-text-muted mt-0.5">calendar_month</span>
<div>
<p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Founded</p>
<p class="text-sm font-medium text-text-main dark:text-white">2018</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-text-muted mt-0.5">location_on</span>
<div>
<p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Headquarters</p>
<p class="text-sm font-medium text-text-main dark:text-white">San Francisco, CA</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-text-muted mt-0.5">account_circle</span>
<div>
<p class="text-xs font-semibold text-text-muted uppercase tracking-wider">CEO</p>
<p class="text-sm font-medium text-text-main dark:text-white">Sarah Jenkins</p>
</div>
</div>
</div>
</div>
<!-- Featured Jobs (Mini) -->
<div class="rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
<div class="flex items-center justify-between mb-4">
<h3 class="text-lg font-bold text-text-main dark:text-white">Hot Jobs</h3>
<a class="text-xs font-bold text-primary hover:underline" href="#">View All</a>
</div>
<div class="space-y-4">
<a class="block group" href="#">
<div class="flex items-start justify-between">
<div>
<h4 class="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Senior Product Designer</h4>
<p class="text-xs text-text-muted mt-1">Remote • Full-time</p>
</div>
<span class="material-symbols-outlined text-text-muted text-lg">chevron_right</span>
</div>
</a>
<div class="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
<a class="block group" href="#">
<div class="flex items-start justify-between">
<div>
<h4 class="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Frontend Developer</h4>
<p class="text-xs text-text-muted mt-1">SF, CA • Hybrid</p>
</div>
<span class="material-symbols-outlined text-text-muted text-lg">chevron_right</span>
</div>
</a>
<div class="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
<a class="block group" href="#">
<div class="flex items-start justify-between">
<div>
<h4 class="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Marketing Manager</h4>
<p class="text-xs text-text-muted mt-1">Remote • Contract</p>
</div>
<span class="material-symbols-outlined text-text-muted text-lg">chevron_right</span>
</div>
</a>
</div>
</div>
<!-- Map Placeholder -->
<div class="rounded-2xl overflow-hidden h-48 w-full relative bg-gray-200 dark:bg-gray-800" data-alt="Map showing office location in San Francisco" data-location="San Francisco, CA" style="">
<div class="absolute inset-0 flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/San_Francisco_OpenStreetMap.png/640px-San_Francisco_OpenStreetMap.png')] bg-cover bg-center opacity-50 dark:opacity-40"></div>
<div class="absolute inset-0 flex items-center justify-center">
<div class="bg-white dark:bg-surface-dark rounded-full p-2 shadow-lg">
<span class="material-symbols-outlined text-primary text-2xl">location_on</span>
</div>
</div>
<div class="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
                         View on Google Maps
                     </div>
</div>
</div>
</div>
</main>
<!-- Footer Simplified -->
<footer class="mt-12 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 py-10">
<div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
<p class="text-text-muted text-sm">© 2023 TopViec Inc. All rights reserved.</p>
<div class="flex gap-6">
<a class="text-text-muted hover:text-primary transition-colors text-sm" href="#">Privacy</a>
<a class="text-text-muted hover:text-primary transition-colors text-sm" href="#">Terms</a>
<a class="text-text-muted hover:text-primary transition-colors text-sm" href="#">Contact</a>
</div>
<div class="flex gap-4">
<a class="text-text-muted hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-text-muted hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">rss_feed</span></a>
</div>
</div>
</footer>
</body></html>