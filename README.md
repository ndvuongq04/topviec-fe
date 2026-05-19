# TopViec Frontend

Frontend của TopViec là Vue 3 SPA dành cho ứng viên, nhà tuyển dụng và quản trị viên. Ứng dụng kết nối với backend qua REST API, quản lý access token ở client và dùng refresh token qua cookie HttpOnly.

## Tech Stack

| Component | Version / Library |
|---|---|
| Vue | `3.5.x` |
| Vite | `7.3.x` |
| TypeScript | `5.9.x` |
| State management | Pinia `3.0.x` |
| Router | Vue Router `4.6.x` |
| HTTP client | Axios `1.13.x` |
| Server state | TanStack Vue Query |
| Styling | SCSS, Tailwind CSS `4.2.x` |
| Forms/validation | vee-validate, zod |
| Rich text | TipTap |
| Charts | Chart.js, vue-chartjs |
| PDF preview | vue-pdf-embed |
| Realtime client | socket.io-client |

## System Requirements

| Tool | Minimum | Recommended |
|---|---|---|
| Node.js | `20.19.0` | Node 20 LTS hoặc Node 22 LTS |
| npm | 10.x | Version đi kèm Node LTS |

Repo có `package-lock.json` và workflow đang dùng `npm ci`, vì vậy README dùng npm làm package manager chính.

## Local Setup

Tạo file env:

```powershell
cd topviec-fe
Copy-Item .env.example .env
```

Cập nhật `topviec-fe/.env`:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

Cài dependencies và chạy dev server:

```powershell
npm install
npm run dev
```

URL sau khi chạy:

- Frontend: `http://localhost:5173`
- Backend API cần chạy ở: `http://localhost:8080/api/v1`

## Environment Configuration

| Variable | Required | Example | Meaning |
|---|---:|---|---|
| `VITE_API_URL` | Yes | `http://localhost:8080/api/v1` | Base URL cho Axios instance |

Lưu ý: source hiện dùng `import.meta.env.VITE_API_URL` trong `src/services/axios.ts`.

## Folder Structure

```text
topviec-fe/
├── src/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── constants/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   ├── types/
│   └── utils/
├── index.html
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

Convention chính:

- `pages`: màn hình theo domain và role: `candidate`, `recruiter`, `admin`, `auth`, `error`.
- `layouts`: layout riêng cho candidate, recruiter và admin.
- `components`: UI component dùng lại và component nghiệp vụ theo module.
- `services`: wrapper gọi REST API bằng Axios.
- `stores`: Pinia store theo module nghiệp vụ.
- `composables`: logic dùng lại trong component.
- `constants`: trạng thái, option, permission và mapping dùng chung.
- `types`: TypeScript type tương ứng DTO request/response backend.
- `router`: route definitions và navigation guards.

## Main Routes

### Auth

| Route | Page |
|---|---|
| `/login` | Đăng nhập |
| `/register` | Đăng ký ứng viên |
| `/recruiter/register` | Đăng ký nhà tuyển dụng |
| `/verify-email` | Thông báo xác thực email |
| `/verify-email/callback` | Callback xác thực email |
| `/forgot-password` | Quên mật khẩu |
| `/reset-password` | Đặt lại mật khẩu |
| `/interview-confirm-update` | Xác nhận lịch phỏng vấn được cập nhật |
| `/interview-select-slot` | Chọn slot phỏng vấn |
| `/talent-pool-invite` | Xử lý lời mời Talent Pool |

### Candidate

| Route | Page |
|---|---|
| `/` | Trang chủ |
| `/search` | Tìm kiếm việc làm |
| `/jobs/:id` | Chi tiết việc làm |
| `/companies/:slug` | Chi tiết công ty |
| `/profile` | Hồ sơ ứng viên |
| `/applied-jobs` | Việc đã ứng tuyển |
| `/saved-jobs` | Việc đã lưu |
| `/interviews` | Lịch phỏng vấn |
| `/interviews/detail/:id` | Chi tiết phỏng vấn |
| `/messages` | Tin nhắn |
| `/change-password` | Đổi mật khẩu |
| `/my-complaints` | Khiếu nại/báo cáo của ứng viên |

### Employer / Recruiter

| Route | Page |
|---|---|
| `/recruiter` | Dashboard nhà tuyển dụng |
| `/recruiter/company-profile` | Hồ sơ công ty |
| `/recruiter/team` | Thành viên công ty |
| `/recruiter/assignment` | Phân công recruiter |
| `/recruiter/permissions` | Cấu hình quyền |
| `/recruiter/permissions/log` | Lịch sử thay đổi quyền |
| `/recruiter/jobs` | Danh sách tin tuyển dụng |
| `/recruiter/jobs/create` | Tạo tin tuyển dụng |
| `/recruiter/jobs/:id` | Chi tiết tin tuyển dụng |
| `/recruiter/jobs/:id/edit` | Sửa tin tuyển dụng |
| `/recruiter/jobs/:id/applications` | Ứng viên theo tin |
| `/recruiter/interviews` | Quản lý phỏng vấn |
| `/recruiter/services` | Dịch vụ hiện có |
| `/recruiter/services/shop` | Cửa hàng dịch vụ |
| `/recruiter/pricing` | Bảng giá |
| `/recruiter/billing` | Lịch sử thanh toán |
| `/recruiter/offers` | Quản lý offer |
| `/recruiter/talent-pool` | Talent Pool |
| `/recruiter/messages` | Tin nhắn |
| `/recruiter/complaints` | Báo cáo/khiếu nại |
| `/recruiter/activity-log` | Nhật ký hoạt động |
| `/recruiter/checkout` | Checkout |
| `/payment/result` | Kết quả thanh toán |

### Admin

| Route | Page |
|---|---|
| `/admin` | Dashboard admin |
| `/admin/employers` | Quản lý nhà tuyển dụng |
| `/admin/employers/:id` | Chi tiết nhà tuyển dụng |
| `/admin/candidates` | Quản lý ứng viên |
| `/admin/candidates/:id` | Chi tiết ứng viên |
| `/admin/admins` | Quản lý admin |
| `/admin/moderation` | Kiểm duyệt tin tuyển dụng |
| `/admin/service-packages` | Quản lý gói dịch vụ |
| `/admin/individual-services` | Quản lý dịch vụ lẻ |
| `/admin/services/create` | Tạo dịch vụ |
| `/admin/orders` | Quản lý đơn hàng |
| `/admin/employer-monitor` | Theo dõi nhà tuyển dụng |
| `/admin/reports` | Quản lý báo cáo/khiếu nại |
| `/admin/settings/permissions` | Cấu hình phân quyền |
| `/admin/audit-logs` | Audit log |

## API Integration

Axios instance nằm ở `src/services/axios.ts`.

- `baseURL`: lấy từ `VITE_API_URL`.
- `withCredentials`: bật để gửi refresh cookie.
- Request interceptor tự gắn `Authorization: Bearer <accessToken>`.
- Response interceptor tự gọi `authStore.refreshToken()` khi API trả `401`.
- Public auth endpoints được bỏ qua refresh interceptor.

## Common Commands

```powershell
cd topviec-fe

# Install dependencies
npm install

# Run dev server
npm run dev

# Type check
npm run typecheck

# Build production assets
npm run build

# Preview production build
npm run preview
```

Hiện repo chưa có script `lint`, `format` hoặc `test`.

## Build and Deployment

Workflow: `.github/workflows/deploy-fe.yml`

- Trigger: push vào `main` hoặc `develop`.
- Setup Node.js 20.
- Install bằng `npm ci`.
- Build bằng `npm run build` với `VITE_API_URL` từ GitHub Secrets.
- Sync `dist` lên AWS S3 bucket `topviec-frontend`.

Demo hiện tại:

```text
http://topviec-frontend.s3-website-ap-northeast-1.amazonaws.com/
```

## Known Issues

- `.env.example` hiện chỉ là placeholder, cần bổ sung `VITE_API_URL`.
- Chưa có script lint/format/test trong `package.json`.
- Một số module phát triển sau vẫn còn route hoặc dependency trong source, nhưng chưa đưa vào danh sách route chính của README.
- Workflow FE nằm trong thư mục con; nếu chạy theo monorepo root, cần chuyển workflow về `.github/workflows` ở root.
- Cần đảm bảo backend bật CORS cho đúng origin frontend, ví dụ `http://localhost:5173`.
