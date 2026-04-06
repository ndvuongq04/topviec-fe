<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Job Board - Tìm việc làm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #F4F5F5;
    color: #222;
    min-height: 100vh;
  }

  .page-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 16px;
    display: flex;
    gap: 18px;
    align-items: flex-start;
  }

  /* ─── SIDEBAR ─── */
  .sidebar {
    width: 260px;
    min-width: 220px;
    flex-shrink: 0;
    background: #fff;
    border-radius: 14px;
    border: 0.5px solid #e0e0e0;
    padding: 18px 16px;
  }

  .sb-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
  }

  .sb-header h3 {
    font-size: 15px;
    font-weight: 700;
    color: #00b14f;
  }

  .section {
    margin-bottom: 18px;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 16px;
  }

  .section:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .sec-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 10px;
  }

  .radio-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
  }

  .radio-row input[type="radio"] {
    accent-color: #00b14f;
    width: 14px;
    height: 14px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .radio-row label {
    font-size: 12px;
    color: #555;
    cursor: pointer;
    user-select: none;
    line-height: 1.3;
  }

  .radio-row.checked label {
    color: #00b14f;
    font-weight: 600;
  }

  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: 0.5px solid #ddd;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    font-size: 12px;
    color: #555;
    margin-top: 6px;
    transition: border-color 0.2s;
  }

  .select-btn:hover {
    border-color: #00b14f;
  }

  .select-btn span {
    flex: 1;
    text-align: left;
  }

  .ctype-row {
    display: flex;
    gap: 20px;
  }

  .salary-inputs {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .salary-inputs label {
    font-size: 12px;
    color: #666;
  }

  .salary-inputs input {
    width: 60px;
    padding: 5px 8px;
    border: 0.5px solid #ddd;
    border-radius: 6px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    text-align: center;
    outline: none;
    transition: border-color 0.2s;
  }

  .salary-inputs input:focus {
    border-color: #00b14f;
  }

  .salary-inputs .unit {
    font-size: 12px;
    color: #666;
  }

  .apply-btn {
    width: 100%;
    margin-top: 8px;
    padding: 8px;
    background: #f0f0f0;
    border: none;
    border-radius: 7px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    color: #555;
    cursor: pointer;
    transition: background 0.2s;
  }

  .apply-btn:hover {
    background: #e2e2e2;
  }

  .lvl-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .clear-btn {
    display: block;
    width: 100%;
    margin-top: 16px;
    padding: 8px;
    background: none;
    border: none;
    color: #00b14f;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
  }

  .clear-btn:hover {
    text-decoration: underline;
  }

  /* ─── MAIN CONTENT ─── */
  .main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .top-controls {
    background: #fff;
    border-radius: 12px;
    border: 0.5px solid #e0e0e0;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .pills-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pill-label {
    font-size: 12px;
    color: #777;
    white-space: nowrap;
  }

  .pill {
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    border: 1px solid #ddd;
    background: #f4f5f5;
    color: #666;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.18s;
    user-select: none;
  }

  .pill:hover {
    border-color: #aaa;
  }

  .pill.active {
    background: #fff;
    border: 1.5px solid #00b14f;
    color: #00b14f;
    font-weight: 600;
  }

  .sort-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sort-select {
    padding: 6px 10px;
    border: 0.5px solid #ddd;
    border-radius: 8px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    color: #444;
    background: #fff;
    cursor: pointer;
    outline: none;
  }

  .sort-select:focus {
    border-color: #00b14f;
  }

  /* ─── JOB CARD ─── */
  .card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e8e8e8;
    padding: 16px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  .card:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    border-color: #ccc;
  }

  .card.selected {
    border: 1.5px solid #00b14f;
  }

  .card.selected:hover {
    border-color: #00b14f;
  }

  .card-inner {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .logo-box {
    width: 56px;
    height: 56px;
    min-width: 56px;
    border: 1px solid #eee;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    overflow: hidden;
  }

  .logo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.5px;
  }

  .mid {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .job-title {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    line-height: 1.4;
  }

  .job-title a {
    color: inherit;
    text-decoration: none;
  }

  .job-title a:hover {
    color: #00b14f;
  }

  .verified {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    background: #00b14f;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .co-name {
    font-size: 11.5px;
    text-transform: uppercase;
    color: #999;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  .tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 2px;
  }

  .tag {
    padding: 3px 10px;
    background: #f4f5f5;
    border-radius: 20px;
    font-size: 11px;
    color: #666;
    border: 0.5px solid #e8e8e8;
  }

  .bottom-info {
    font-size: 11.5px;
    color: #bbb;
    margin-top: 2px;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 7px;
    min-width: 115px;
    flex-shrink: 0;
  }

  .salary {
    font-size: 13.5px;
    font-weight: 700;
    color: #00b14f;
    white-space: nowrap;
  }

  .time-txt {
    font-size: 11px;
    color: #bbb;
    white-space: nowrap;
  }

  .heart-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    padding: 0;
  }

  .heart-btn:hover {
    border-color: #f66;
    background: #fff0f0;
  }

  .heart-btn.liked svg {
    fill: #f55;
    stroke: #f55;
  }

  /* ─── RIBBON ─── */
  .ribbon {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 42px 42px 0 0;
    border-color: #00b14f transparent transparent transparent;
    pointer-events: none;
  }

  .ribbon-icon {
    position: absolute;
    top: 5px;
    left: 4px;
    pointer-events: none;
  }

  /* ─── SUGGEST BANNER ─── */
  .suggest-banner {
    margin: 12px -16px -16px;
    padding: 7px 16px;
    background: #f9fdf9;
    border-top: 1px solid #e8f5ee;
    font-size: 11.5px;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .suggest-banner span {
    color: #00b14f;
    font-weight: 600;
  }

  /* ─── SVG ICONS (inline) ─── */
  svg { display: inline-block; vertical-align: middle; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 800px) {
    .page-wrap { flex-direction: column; }
    .sidebar { width: 100%; }
    .right-col { min-width: 90px; }
  }

  @media (max-width: 520px) {
    .card-inner { flex-wrap: wrap; }
    .right-col { flex-direction: row; align-items: center; width: 100%; justify-content: space-between; }
  }
</style>
</head>
<body>

<div class="page-wrap">

  <!-- ═══ SIDEBAR ═══ -->
  <aside class="sidebar">
    <div class="sb-header">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b14f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      <h3>Lọc nâng cao</h3>
    </div>

    <!-- Kinh nghiệm -->
    <div class="section">
      <div class="sec-title">Kinh nghiệm</div>
      <div class="grid2">
        <div class="radio-row checked"><input type="radio" name="exp" id="e0" checked><label for="e0">Tất cả</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e1"><label for="e1">Không yêu cầu</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e2"><label for="e2">Dưới 1 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e3"><label for="e3">1 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e4"><label for="e4">2 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e5"><label for="e5">3 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e6"><label for="e6">4 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e7"><label for="e7">5 năm</label></div>
        <div class="radio-row"><input type="radio" name="exp" id="e8"><label for="e8">Trên 5 năm</label></div>
      </div>
    </div>

    <!-- Lĩnh vực công ty -->
    <div class="section">
      <div class="sec-title">Lĩnh vực công ty</div>
      <button class="select-btn" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <span>Tất cả lĩnh vực</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>

    <!-- Lĩnh vực công việc -->
    <div class="section">
      <div class="sec-title">Lĩnh vực công việc</div>
      <button class="select-btn" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        <span>Tất cả lĩnh vực</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>

    <!-- Loại công ty -->
    <div class="section">
      <div class="sec-title">Loại công ty</div>
      <div class="ctype-row">
        <div class="radio-row checked"><input type="radio" name="ctype" id="ct0" checked><label for="ct0">Tất cả</label></div>
        <div class="radio-row"><input type="radio" name="ctype" id="ct1"><label for="ct1">Pro Company</label></div>
      </div>
    </div>

    <!-- Mức lương -->
    <div class="section">
      <div class="sec-title">Mức lương</div>
      <div class="grid2">
        <div class="radio-row checked"><input type="radio" name="sal" id="s0" checked><label for="s0">Tất cả</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s1"><label for="s1">Dưới 10 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s2"><label for="s2">10 - 15 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s3"><label for="s3">15 - 20 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s4"><label for="s4">20 - 25 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s5"><label for="s5">25 - 30 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s6"><label for="s6">30 - 50 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s7"><label for="s7">Trên 50 triệu</label></div>
        <div class="radio-row"><input type="radio" name="sal" id="s8"><label for="s8">Thoả thuận</label></div>
      </div>
      <div class="salary-inputs">
        <label>Từ</label>
        <input type="text" placeholder="0">
        <span>—</span>
        <label>Đến</label>
        <input type="text" placeholder="100">
        <span class="unit">triệu</span>
      </div>
      <button class="apply-btn" type="button">Áp dụng</button>
    </div>

    <!-- Cấp bậc -->
    <div class="section">
      <div class="sec-title">Cấp bậc</div>
      <div class="lvl-list">
        <div class="radio-row checked"><input type="radio" name="lvl" id="l0" checked><label for="l0">Tất cả</label></div>
        <div class="radio-row"><input type="radio" name="lvl" id="l1"><label for="l1">Nhân viên</label></div>
        <div class="radio-row"><input type="radio" name="lvl" id="l2"><label for="l2">Trưởng nhóm</label></div>
        <div class="radio-row"><input type="radio" name="lvl" id="l3"><label for="l3">Trưởng/Phó phòng</label></div>
        <div class="radio-row"><input type="radio" name="lvl" id="l4"><label for="l4">Quản lý / Giám sát</label></div>
      </div>
    </div>

    <button class="clear-btn" type="button">Xóa lọc</button>
  </aside>

  <!-- ═══ MAIN CONTENT ═══ -->
  <main class="main">

    <!-- Top controls -->
    <div class="top-controls">
      <div class="pills-group">
        <span class="pill-label">Tìm kiếm theo:</span>
        <button class="pill active" type="button" data-pill>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00b14f" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
          Tên việc làm
        </button>
        <button class="pill" type="button" data-pill>Tên công ty</button>
        <button class="pill" type="button" data-pill>Cả hai</button>
      </div>
      <div class="sort-group">
        <span class="pill-label">Sắp xếp theo:</span>
        <select class="sort-select">
          <option>Search by AI</option>
          <option>Mới nhất</option>
          <option>Mức lương cao nhất</option>
          <option>Phù hợp nhất</option>
        </select>
      </div>
    </div>

    <!-- Card 1: Selected/focused -->
    <div class="card selected">
      <div class="card-inner">
        <div class="logo-box">
          <div class="logo-placeholder" style="background:#c41a1a">LG</div>
        </div>
        <div class="mid">
          <div class="job-title">
            <a href="#">Back End Developer (Java, MySQL, Spring) - Tại Hà Nội</a>
            <span class="verified">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <div class="co-name">Công ty TNHH LG CNS Việt Nam</div>
          <div class="tags">
            <span class="tag">Hà Nội</span>
            <span class="tag">3 năm</span>
            <span class="tag">Tới $2,000</span>
          </div>
          <div class="bottom-info">Software Engineer | Nghỉ thứ 7 | +2</div>
        </div>
        <div class="right-col">
          <div class="salary">Thoả thuận</div>
          <div class="time-txt">Đăng 1 tuần trước</div>
          <button class="heart-btn" type="button" aria-label="Yêu thích">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Card 2: Ribbon + Suggest banner -->
    <div class="card">
      <div class="ribbon"></div>
      <div class="ribbon-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>
      <div class="card-inner">
        <div class="logo-box">
          <div class="logo-placeholder" style="background:#0052cc">FPT</div>
        </div>
        <div class="mid">
          <div class="job-title">
            <a href="#">Senior Frontend Developer (ReactJS / TypeScript)</a>
            <span class="verified">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <div class="co-name">Tập đoàn FPT - FPT Software</div>
          <div class="tags">
            <span class="tag">Hà Nội</span>
            <span class="tag">2 năm</span>
            <span class="tag">Remote</span>
          </div>
          <div class="bottom-info">Frontend | Nghỉ thứ 7, CN | +3</div>
        </div>
        <div class="right-col">
          <div class="salary">20 - 45 triệu</div>
          <div class="time-txt">Đã xem</div>
          <button class="heart-btn" type="button" aria-label="Yêu thích">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="suggest-banner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#00b14f" stroke="#00b14f" stroke-width="1">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        <span>Đề xuất cho bạn</span>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="card">
      <div class="card-inner">
        <div class="logo-box">
          <div class="logo-placeholder" style="background:#e65c00">VNG</div>
        </div>
        <div class="mid">
          <div class="job-title">
            <a href="#">iOS Developer (Swift / Objective-C) - Hà Nội</a>
          </div>
          <div class="co-name">Công ty Cổ phần VNG</div>
          <div class="tags">
            <span class="tag">Hà Nội</span>
            <span class="tag">2 năm</span>
            <span class="tag">Thứ 2 - Thứ 6</span>
          </div>
          <div class="bottom-info">Mobile Dev | Nghỉ thứ 7, CN | +1</div>
        </div>
        <div class="right-col">
          <div class="salary">600 - 2,500 USD</div>
          <div class="time-txt">Đăng 3 ngày trước</div>
          <button class="heart-btn" type="button" aria-label="Yêu thích">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="card">
      <div class="card-inner">
        <div class="logo-box">
          <div class="logo-placeholder" style="background:#1a73e8">MIO</div>
        </div>
        <div class="mid">
          <div class="job-title">
            <a href="#">Full Stack Developer (Node.js + Vue 3) - HCM / Hà Nội</a>
            <span class="verified">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <div class="co-name">Công ty TNHH Mio Technology</div>
          <div class="tags">
            <span class="tag">Hà Nội</span>
            <span class="tag">HCM</span>
            <span class="tag">1 năm</span>
          </div>
          <div class="bottom-info">Fullstack | Hybrid | +2</div>
        </div>
        <div class="right-col">
          <div class="salary">15 - 30 triệu</div>
          <div class="time-txt">Đăng 2 tuần trước</div>
          <button class="heart-btn liked" type="button" aria-label="Yêu thích">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f55" stroke="#f55" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Card 5 -->
    <div class="card">
      <div class="card-inner">
        <div class="logo-box">
          <div class="logo-placeholder" style="background:#5a2d82">TMA</div>
        </div>
        <div class="mid">
          <div class="job-title">
            <a href="#">DevOps Engineer (AWS / Docker / Kubernetes)</a>
          </div>
          <div class="co-name">TMA Solutions Group</div>
          <div class="tags">
            <span class="tag">Hà Nội</span>
            <span class="tag">3 năm</span>
            <span class="tag">On-site</span>
          </div>
          <div class="bottom-info">DevOps | Nghỉ thứ 7 | +4</div>
        </div>
        <div class="right-col">
          <div class="salary">Thoả thuận</div>
          <div class="time-txt">Đăng 5 ngày trước</div>
          <button class="heart-btn" type="button" aria-label="Yêu thích">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

  </main>
</div>

<script>
  // Pills toggle
  document.querySelectorAll('[data-pill]').forEach(function(pill) {
    pill.addEventListener('click', function() {
      document.querySelectorAll('[data-pill]').forEach(function(p) {
        p.classList.remove('active');
        var svg = p.querySelector('svg');
        if (svg) svg.remove();
      });
      this.classList.add('active');
      var checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('width', '11');
      checkSvg.setAttribute('height', '11');
      checkSvg.setAttribute('viewBox', '0 0 24 24');
      checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', '#00b14f');
      checkSvg.setAttribute('stroke-width', '3.5');
      var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      poly.setAttribute('points', '20 6 9 17 4 12');
      checkSvg.appendChild(poly);
      this.prepend(checkSvg);
    });
  });

  // Radio highlight
  document.querySelectorAll('.radio-row input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      var name = this.name;
      document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
        r.closest('.radio-row').classList.toggle('checked', r.checked);
      });
    });
  });

  // Heart toggle
  document.querySelectorAll('.heart-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var svg = this.querySelector('svg');
      var isLiked = this.classList.toggle('liked');
      svg.setAttribute('fill', isLiked ? '#f55' : 'none');
      svg.setAttribute('stroke', isLiked ? '#f55' : '#ccc');
    });
  });
</script>
</body>
</html>