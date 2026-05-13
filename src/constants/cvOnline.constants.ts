import type { CvOnlineData, CvTemplateDetail } from '@/types/cvOnline.types'

export const CV_ONLINE_STORAGE_KEY = 'topviec.cv-online.drafts'

export const CV_ONLINE_PLACEHOLDERS = [
    '{{fullName}}',
    '{{email}}',
    '{{phone}}',
    '{{address}}',
    '{{jobTitle}}',
    '{{careerObjective}}',
    '{{#experiences}}...{{/experiences}}',
    '{{#educations}}...{{/educations}}',
    '{{#skills}}...{{/skills}}',
    '{{#certifications}}...{{/certifications}}',
    '{{#languages}}...{{/languages}}',
] as const

export function createEmptyCvOnlineData(): CvOnlineData {
    return {
        fullName: 'Nguyen Van A',
        email: 'nguyenvana@gmail.com',
        phone: '0901 234 567',
        address: 'Ho Chi Minh City, Vietnam',
        jobTitle: 'Frontend Developer',
        careerObjective:
            'Xay dung trai nghiem frontend nhanh, ro rang va de bao tri cho san pham co tac dong thuc te.',
        experiences: [
            {
                id: 'exp-1',
                company: 'TopViec',
                role: 'Frontend Developer',
                startDate: '2023',
                endDate: 'Now',
                description:
                    'Phat trien giao dien Vue 3, toi uu quy trinh phoi hop voi backend va cai thien toc do render.',
            },
        ],
        educations: [
            {
                id: 'edu-1',
                school: 'University of Technology',
                degree: 'Bachelor of Information Technology',
                startDate: '2018',
                endDate: '2022',
                description: 'Tap trung vao phat trien web va thiet ke he thong.',
            },
        ],
        skills: ['Vue 3', 'TypeScript', 'Pinia', 'REST API'],
        certifications: [
            {
                id: 'cert-1',
                name: 'Frontend Architecture',
                issuer: 'Internal Training',
                year: '2024',
            },
        ],
        languages: [
            {
                id: 'lang-1',
                name: 'Vietnamese',
                level: 'Native',
            },
            {
                id: 'lang-2',
                name: 'English',
                level: 'Working proficiency',
            },
        ],
    }
}

export const CV_ONLINE_MOCK_TEMPLATES: CvTemplateDetail[] = [
    {
        id: 1,
        name: 'Standard Blue',
        slug: 'standard-blue',
        thumbnail:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=60',
        tags: ['ATS', 'Don gian'],
        categories: ['all', 'simple', 'ats', 'professional'],
        colors: ['#0f172a', '#1d4ed8', '#cbd5e1'],
        isNew: false,
        language: 'vi',
        supportedSections: [
            'personal',
            'careerObjective',
            'experiences',
            'educations',
            'skills',
            'certifications',
            'languages',
        ],
        placeholderCatalog: [...CV_ONLINE_PLACEHOLDERS],
        html: `
<div class="cv-shell">
  <aside class="sidebar">
    <div class="identity">
      <p class="eyebrow">CV ONLINE</p>
      <h1>{{fullName}}</h1>
      <p class="role">{{jobTitle}}</p>
    </div>
    <div class="meta-block">
      <h2>Contact</h2>
      <p>{{email}}</p>
      <p>{{phone}}</p>
      <p>{{address}}</p>
    </div>
    <div class="meta-block">
      <h2>Skills</h2>
      <ul class="pill-list">
        {{#skills}}<li>{{value}}</li>{{/skills}}
      </ul>
    </div>
    <div class="meta-block">
      <h2>Languages</h2>
      <div class="stack-list">
        {{#languages}}<div class="line-pair"><strong>{{name}}</strong><span>{{level}}</span></div>{{/languages}}
      </div>
    </div>
  </aside>
  <main class="content">
    <section>
      <h2>Career Objective</h2>
      <p>{{careerObjective}}</p>
    </section>
    <section>
      <h2>Experience</h2>
      {{#experiences}}
      <article class="timeline-item">
        <div class="timeline-head">
          <strong>{{role}}</strong>
          <span>{{startDate}} - {{endDate}}</span>
        </div>
        <p class="subtle">{{company}}</p>
        <p>{{description}}</p>
      </article>
      {{/experiences}}
    </section>
    <section>
      <h2>Education</h2>
      {{#educations}}
      <article class="timeline-item">
        <div class="timeline-head">
          <strong>{{degree}}</strong>
          <span>{{startDate}} - {{endDate}}</span>
        </div>
        <p class="subtle">{{school}}</p>
        <p>{{description}}</p>
      </article>
      {{/educations}}
    </section>
    <section>
      <h2>Certifications</h2>
      {{#certifications}}<div class="line-pair"><strong>{{name}}</strong><span>{{issuer}} · {{year}}</span></div>{{/certifications}}
    </section>
  </main>
</div>`,
        css: `
body { margin: 0; background: #eef2ff; font-family: Arial, sans-serif; color: #0f172a; }
.cv-shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: #ffffff; }
.sidebar { background: #0f172a; color: #e2e8f0; padding: 32px 24px; }
.eyebrow { margin: 0 0 12px; letter-spacing: 0.16em; font-size: 11px; opacity: 0.7; }
.identity h1 { margin: 0; font-size: 32px; line-height: 1.1; }
.role { margin: 10px 0 0; color: #93c5fd; font-weight: 700; }
.meta-block { margin-top: 28px; }
.meta-block h2, .content h2 { margin: 0 0 12px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.08em; }
.meta-block p { margin: 0 0 8px; line-height: 1.5; }
.pill-list { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; list-style: none; margin: 0; }
.pill-list li { padding: 6px 10px; border-radius: 999px; background: rgba(147, 197, 253, 0.16); }
.stack-list, .content section { display: grid; gap: 12px; }
.content { padding: 32px; }
.content section + section { margin-top: 28px; }
.timeline-item { display: grid; gap: 6px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
.timeline-head, .line-pair { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
.subtle { margin: 0; color: #475569; font-weight: 700; }
.content p { margin: 0; line-height: 1.6; }
`,
    },
    {
        id: 2,
        name: 'Modern Contrast',
        slug: 'modern-contrast',
        thumbnail:
            'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=60',
        tags: ['Hien dai', 'Chuyen nghiep'],
        categories: ['all', 'modern', 'professional'],
        colors: ['#111827', '#f97316', '#fed7aa'],
        isNew: true,
        language: 'vi',
        supportedSections: [
            'personal',
            'careerObjective',
            'experiences',
            'educations',
            'skills',
            'certifications',
            'languages',
        ],
        placeholderCatalog: [...CV_ONLINE_PLACEHOLDERS],
        html: `
<div class="page">
  <header class="hero">
    <div>
      <p class="hero-kicker">{{jobTitle}}</p>
      <h1>{{fullName}}</h1>
    </div>
    <div class="hero-contact">
      <span>{{email}}</span>
      <span>{{phone}}</span>
      <span>{{address}}</span>
    </div>
  </header>
  <section class="intro">
    <h2>Profile</h2>
    <p>{{careerObjective}}</p>
  </section>
  <section class="grid">
    <div class="main-column">
      <h2>Experience</h2>
      {{#experiences}}
      <article class="card">
        <div class="card-head">
          <strong>{{role}}</strong>
          <span>{{startDate}} - {{endDate}}</span>
        </div>
        <p class="muted">{{company}}</p>
        <p>{{description}}</p>
      </article>
      {{/experiences}}
      <h2>Education</h2>
      {{#educations}}
      <article class="card">
        <div class="card-head">
          <strong>{{degree}}</strong>
          <span>{{startDate}} - {{endDate}}</span>
        </div>
        <p class="muted">{{school}}</p>
        <p>{{description}}</p>
      </article>
      {{/educations}}
    </div>
    <aside class="side-column">
      <h2>Skills</h2>
      <ul class="tags">{{#skills}}<li>{{value}}</li>{{/skills}}</ul>
      <h2>Languages</h2>
      {{#languages}}<div class="row"><strong>{{name}}</strong><span>{{level}}</span></div>{{/languages}}
      <h2>Certifications</h2>
      {{#certifications}}<div class="row"><strong>{{name}}</strong><span>{{year}}</span></div><p class="muted">{{issuer}}</p>{{/certifications}}
    </aside>
  </section>
</div>`,
        css: `
body { margin: 0; background: #fff7ed; font-family: Arial, sans-serif; color: #111827; }
.page { padding: 32px; background: linear-gradient(180deg, #111827 0, #111827 160px, #fff7ed 160px, #fff7ed 100%); min-height: 100vh; }
.hero { display: flex; justify-content: space-between; gap: 20px; padding: 28px 32px; border-radius: 24px; background: #111827; color: #fff; border: 1px solid rgba(255,255,255,0.08); }
.hero-kicker { margin: 0 0 10px; color: #fdba74; text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; }
.hero h1 { margin: 0; font-size: 38px; line-height: 1.05; }
.hero-contact { display: grid; gap: 8px; text-align: right; color: #e5e7eb; }
.intro, .grid { margin-top: 24px; }
.intro { padding: 24px 28px; border-radius: 24px; background: #fff; }
.grid { display: grid; grid-template-columns: 1.5fr 0.9fr; gap: 24px; align-items: start; }
.main-column, .side-column { padding: 24px 28px; border-radius: 24px; background: #fff; display: grid; gap: 16px; }
h2 { margin: 0; font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; color: #c2410c; }
.card { padding: 16px 0; border-top: 1px solid #fed7aa; display: grid; gap: 6px; }
.card-head, .row { display: flex; justify-content: space-between; gap: 12px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 0; }
.tags li { background: #ffedd5; color: #9a3412; padding: 6px 10px; border-radius: 999px; font-weight: 700; }
.muted, p { margin: 0; line-height: 1.6; color: #4b5563; }
`,
    },
]
