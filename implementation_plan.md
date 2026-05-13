# Chuyển đổi FE: Cloudinary → Local File Storage

## Bối cảnh

Backend đã hoàn thành migration từ Cloudinary sang Local File Storage. API mới:

- **Upload endpoint**: `POST /api/v1/files/upload` (multipart/form-data)
  - Params: `file` (MultipartFile) + `type` (enum string)
  - Response: `{ fileUrl: string, type: string }`
  - Requires authentication (JWT)
- **File types** (enum `FileUploadType`):
  - `CV` — cho ứng viên upload CV
  - `AVATAR` — cho ứng viên upload ảnh đại diện
  - `COMPANY_LOGO` — cho NTD upload logo công ty
  - `COMPANY_COVER` — cho NTD upload ảnh bìa công ty
  - `BUSINESS_LICENSE` — cho NTD upload giấy phép kinh doanh
- **File URL format**: `http://localhost:8080/api/v1/files/images/avatars/user_1/uuid.jpg`
- **File access**: `GET /api/v1/files/**` — public, không cần auth
- **Validation rules** (BE):
  - CV: PDF/DOC/DOCX, max 5MB
  - Avatar/Logo/Cover: JPG/JPEG/PNG/WEBP, max 2MB
  - Business License: PDF/DOC/DOCX, max 5MB

---

## Phân tích hiện trạng FE

### Các file có TODO upload chưa hoàn thiện

| Component | File type | Trạng thái hiện tại |
|-----------|-----------|---------------------|
| [ProfileCard.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/candidate/profile/ProfileCard.vue#L189) | Avatar | `// TODO: upload file lên server` — chỉ tạo objectURL preview |
| [CompanyBasicInfo.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/recruiter/company/CompanyBasicInfo.vue#L189) | Logo, Cover | `// TODO: upload lên server` — chỉ emit objectURL |
| [CompanyVerification.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/recruiter/company/CompanyVerification.vue#L99) | Business License | `// TODO: Upload file lên server` — chỉ emit objectURL |

### Các chỗ đã hoạt động (không cần sửa nhiều)

| Component | File type | Ghi chú |
|-----------|-----------|---------|
| CV upload (`CvServiceImpl` + `CvsTab.vue`) | CV | BE đã đổi sang FileStorageService. FE gọi `POST /cvs/upload` — **flow giữ nguyên**, URL trả về tự động đúng format mới |
| Complaint evidence upload | Evidence files | Hiện tại chưa upload thực sự (chỉ lưu tên file) — **chưa cần xử lý** |

### Các chỗ hiển thị file URL (chỉ đọc)

Các component sau hiển thị `avatarUrl`, `logoUrl`, `coverUrl` từ API response. **Không cần sửa** — miễn URL mới hợp lệ và accessible:
- `CompanyDetailPage.vue` — hiển thị coverUrl, logoUrl
- `ApplyJobModal.vue` — hiển thị companyLogo
- Job cards, recruiter sidebar, etc.

---

## Proposed Changes

### 1. Service Layer — File Upload Service mới

#### [NEW] [fileUpload.service.ts](file:///d:/01_Workspace/TopViec/topviec-fe/src/services/fileUpload.service.ts)

Tạo service tổng hợp cho tất cả file upload qua endpoint mới `POST /files/upload`:

```typescript
// Enum mirror từ BE FileUploadType
export enum FileUploadType {
  CV = 'CV',
  AVATAR = 'AVATAR',
  COMPANY_LOGO = 'COMPANY_LOGO',
  COMPANY_COVER = 'COMPANY_COVER',
  BUSINESS_LICENSE = 'BUSINESS_LICENSE',
}

// Response type
export interface ResFileUpload {
  fileUrl: string
  type: FileUploadType
}

// Service methods
uploadFile(file: File, type: FileUploadType): Promise<ResFileUpload>
```

- Gọi `axiosInstance.post('/files/upload', formData, { multipart })` 
- Return `{ fileUrl, type }`

---

### 2. Component — Candidate Avatar Upload

#### [MODIFY] [ProfileCard.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/candidate/profile/ProfileCard.vue)

Thay TODO comment bằng upload thực:

```diff
 function onAvatarChange(e: Event) {
   const file = (e.target as HTMLInputElement).files?.[0]
   if (!file) return
   localAvatarPreview.value = URL.createObjectURL(file)
-  // TODO: upload file lên server → lấy URL → store.updateProfile({ avatarUrl })
+  uploadAvatar(file)
 }
+
+ async function uploadAvatar(file: File) {
+   try {
+     const res = await fileUploadService.uploadFile(file, FileUploadType.AVATAR)
+     await store.updateProfile({ avatarUrl: res.fileUrl })
+     toast.success('Đã cập nhật ảnh đại diện')
+   } catch (err: any) {
+     toast.error('Upload thất bại', err.response?.data?.message || 'Không thể tải ảnh lên.')
+     localAvatarPreview.value = null
+   }
+ }
```

---

### 3. Component — Company Logo & Cover Upload

#### [MODIFY] [CompanyBasicInfo.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/recruiter/company/CompanyBasicInfo.vue)

Thay `URL.createObjectURL` + TODO bằng upload thực:

```diff
- function onCoverChange(e: Event) {
-   const file = (e.target as HTMLInputElement).files?.[0]
-   if (!file) return
-   emit('update:coverUrl', URL.createObjectURL(file))
-   // TODO: upload lên server
- }
+ async function onCoverChange(e: Event) {
+   const file = (e.target as HTMLInputElement).files?.[0]
+   if (!file) return
+   emit('update:coverUrl', URL.createObjectURL(file)) // preview ngay
+   try {
+     const res = await fileUploadService.uploadFile(file, FileUploadType.COMPANY_COVER)
+     emit('update:coverUrl', res.fileUrl) // thay bằng URL thực
+   } catch (err: any) {
+     toast.error('Upload ảnh bìa thất bại')
+   }
+ }
```

Tương tự cho `onLogoChange` → dùng `FileUploadType.COMPANY_LOGO`.

> [!IMPORTANT]
> Cần thêm `uploading` state để disable nút "Lưu thay đổi" khi đang upload, tránh user submit form với objectURL tạm thời.

---

### 4. Component — Business License Upload

#### [MODIFY] [CompanyVerification.vue](file:///d:/01_Workspace/TopViec/topviec-fe/src/components/recruiter/company/CompanyVerification.vue)

Uncomment và kết nối upload logic:

```diff
  async function handleFile(file: File) {
    // ...preview logic giữ nguyên...

-   // TODO: Upload file lên server
-   emit('license-url-change', URL.createObjectURL(file))
+   uploading.value = true
+   try {
+     const res = await fileUploadService.uploadFile(file, FileUploadType.BUSINESS_LICENSE)
+     emit('license-url-change', res.fileUrl)
+   } catch (err: any) {
+     toast.error('Upload giấy phép thất bại')
+     emit('update:licenseFile', null)
+   } finally {
+     uploading.value = false
+   }
  }
```

---

### 5. Constants — File Upload Type Enum

#### [NEW] [fileUpload.constants.ts](file:///d:/01_Workspace/TopViec/topviec-fe/src/constants/fileUpload.constants.ts)

(Hoặc đặt enum trực tiếp trong service file — tùy convention)

```typescript
export enum FileUploadType {
  CV = 'CV',
  AVATAR = 'AVATAR',
  COMPANY_LOGO = 'COMPANY_LOGO',
  COMPANY_COVER = 'COMPANY_COVER',
  BUSINESS_LICENSE = 'BUSINESS_LICENSE',
}
```

---

## Open Questions

> [!IMPORTANT]
> **1. CompanyProfilePage — Upload trước khi save**
> Hiện tại flow là: user chọn file → emit objectURL → form state lưu objectURL → user nhấn "Lưu thay đổi" → gửi toàn bộ form data (bao gồm URL).
> 
> Với local storage, tôi đề xuất flow: **upload ngay khi chọn file** → nhận URL thật → lưu vào form state → khi nhấn "Lưu" sẽ gửi URL thật.
> 
> Phương án này có nhược điểm: nếu user upload xong rồi hủy (không nhấn Lưu), file vẫn tồn tại trên server. Bạn có chấp nhận trade-off này không? Hay muốn upload cùng lúc với save form?

> [!IMPORTANT]
> **2. Complaint evidence upload**
> `ComplaintModal.vue` và `ComplaintDetailResponseForm.vue` hiện chỉ lưu tên file nhưng chưa upload thực sự. Bạn muốn xử lý upload evidence luôn trong lần này không? Hay để sau?

---

## Verification Plan

### Manual Testing

1. **Avatar upload**: Vào profile ứng viên → click đổi ảnh → chọn ảnh → kiểm tra ảnh hiển thị đúng + URL lưu vào DB là URL server mới
2. **Company logo/cover**: Vào Company Profile (NTD) → đổi logo/ảnh bìa → kiểm tra upload thành công + URL lưu đúng
3. **Business license**: Upload giấy phép → kiểm tra URL lưu đúng format `http://localhost:8080/api/v1/files/images/business-licenses/company_X/uuid.pdf`
4. **CV upload**: Upload CV mới → kiểm tra flow giữ nguyên hoạt động, URL trả về đúng format mới
5. **Hiển thị ảnh**: Kiểm tra tất cả trang hiển thị ảnh (company detail, job cards, candidate profile...) vẫn load đúng ảnh

### Tổng kết file thay đổi

| Action | File |
|--------|------|
| **NEW** | `fileUpload.service.ts` |
| **NEW** | `fileUpload.constants.ts` |
| **MODIFY** | `ProfileCard.vue` |
| **MODIFY** | `CompanyBasicInfo.vue` |
| **MODIFY** | `CompanyVerification.vue` |
