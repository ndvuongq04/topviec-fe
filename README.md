# Chuyển đổi từ Cloudinary sang Local File Storage

## Mô tả

Hiện tại dự án đang sử dụng Cloudinary để lưu trữ file (CV, avatar, ảnh bìa công ty). Mục tiêu là chuyển sang lưu file trực tiếp trên server (local filesystem), tổ chức thư mục rõ ràng theo module, và tạo util/service để dễ dàng sử dụng.

## Phân tích hiện trạng

### Cloudinary đang được sử dụng ở đâu?

| File | Mục đích | Chi tiết |
|------|----------|----------|
| [CloudinaryConfig.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/config/CloudinaryConfig.java) | Config bean Cloudinary | Đọc credentials từ env |
| [CloudinaryService.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/CloudinaryService.java) | Interface `uploadFile()` + `deleteFile()` | 2 methods |
| [CloudinaryServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CloudinaryServiceImpl.java) | Implementation upload/delete Cloudinary | Upload bytes, delete by publicId |
| [CvServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CvServiceImpl.java#L60-L61) | Upload CV | `cloudinaryService.uploadFile(file, userId, FileUploadType.CV)` |
| [CandidateProfileServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CandidateProfileServiceImpl.java#L57) | Lưu avatar URL | Nhận `avatarUrl` string từ FE (không upload qua BE) |
| [CompanyServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CompanyServiceImpl.java#L259) | Lưu cover/logo URL | Nhận `coverUrl`, `logoUrl` string từ FE (không upload qua BE) |

> [!IMPORTANT]
> Hiện chỉ có **CV upload** đi qua `CloudinaryService`. Avatar và Company Cover/Logo được FE truyền URL trực tiếp (có thể FE upload trực tiếp lên Cloudinary). Sau khi chuyển sang local storage, tất cả file upload sẽ đi qua BE.

---

## Cấu trúc thư mục lưu trữ

```
uploads/                          ← Root folder (ngoài src, cùng cấp build.gradle)
├── images/                       ← Tất cả file ảnh
│   ├── avatars/                  ← Ảnh đại diện ứng viên
│   │   └── user_{userId}/        ← Phân theo user
│   ├── company-logos/            ← Logo công ty
│   │   └── company_{companyId}/
│   ├── company-covers/           ← Ảnh bìa công ty
│   │   └── company_{companyId}/
│   └── business-licenses/        ← Giấy phép kinh doanh
│       └── company_{companyId}/
├── files/                        ← Tất cả file tài liệu
│   └── cvs/                      ← CV (PDF, DOCX)
│       └── user_{userId}/
```

---

## Proposed Changes

### 1. Configuration — `FileStorageConfig`

#### [NEW] [FileStorageConfig.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/config/FileStorageConfig.java)

- Config class đọc `app.storage.*` properties từ `application.yaml`
- Properties: `upload-dir` (root path), `base-url` (URL prefix cho client truy cập)
- Khởi tạo tự động thư mục lưu trữ khi app start (`@PostConstruct`)

#### [MODIFY] [application.yaml](file:///d:/01_Workspace/TopViec/topviec-be/src/main/resources/application.yaml)

- Thêm cấu hình `app.storage`:
  ```yaml
  app:
    storage:
      upload-dir: ${UPLOAD_DIR:uploads}
      base-url: ${STORAGE_BASE_URL:http://localhost:8080/api/v1/files}
  ```

---

### 2. WebMvc — Serve static files

#### [NEW] [WebMvcConfig.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/config/WebMvcConfig.java)

- Implement `WebMvcConfigurer`, override `addResourceHandlers()`
- Map URL `/files/**` → filesystem `uploads/`
- Cho phép client truy cập file đã upload qua URL, ví dụ: `http://localhost:8080/api/v1/files/images/avatars/user_1/abc.jpg`

#### [MODIFY] [SecurityConfig.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/config/SecurityConfig.java)

- Thêm `/files/**` vào `PUBLIC_URLS` để cho phép truy cập file không cần auth

---

### 3. Enum — Mở rộng `FileUploadType`

#### [MODIFY] [FileUploadType.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/enums/cvs/FileUploadType.java)

- Thêm các type mới: `COMPANY_LOGO`, `BUSINESS_LICENSE`
- Thêm field `subDir` để map type → thư mục con tương ứng (ví dụ: `AVATAR → "images/avatars"`)

---

### 4. Service — `FileStorageService` (thay thế `CloudinaryService`)

#### [NEW] [FileStorageService.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/FileStorageService.java)

- Interface mới, methods giống `CloudinaryService` nhưng generic hơn:
  - `String uploadFile(MultipartFile file, Long ownerId, FileUploadType type)` → trả về URL đầy đủ
  - `void deleteFile(String fileUrl, FileUploadType type)` → xóa file từ filesystem
  - `Resource loadFile(String fileUrl)` → load file để download (tuỳ chọn)

#### [NEW] [FileStorageServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/FileStorageServiceImpl.java)

- Implementation lưu file vào filesystem:
  - Tạo thư mục nếu chưa tồn tại
  - Generate unique filename: `UUID + original extension`
  - Lưu file vào đường dẫn: `{upload-dir}/{subDir}/{ownerPrefix}_{ownerId}/{uuid}.{ext}`
  - Trả về URL: `{base-url}/{subDir}/{ownerPrefix}_{ownerId}/{uuid}.{ext}`
  - Delete: parse URL → resolve path → xóa file

---

### 5. Controller — Upload endpoint tổng hợp

#### [NEW] [FileUploadController.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/controller/FileUploadController.java)

- Endpoint: `POST /files/upload`
- Nhận `MultipartFile file` + `FileUploadType type`
- Validate file (dùng `FileValidator` hiện có)
- Upload qua `FileStorageService`
- Trả về URL cho FE sử dụng
- Hỗ trợ cả authenticated user (UV upload avatar) và employer (upload logo, cover)

---

### 6. Cập nhật các service đang dùng Cloudinary

#### [MODIFY] [CvServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CvServiceImpl.java)

- Thay `CloudinaryService` → `FileStorageService`
- `cloudinaryService.uploadFile(...)` → `fileStorageService.uploadFile(...)`

---

### 7. Cập nhật `FileValidator`

#### [MODIFY] [FileValidator.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/util/FileValidator.java)

- Thêm validation cho `COMPANY_LOGO` và `BUSINESS_LICENSE` (MIME types, size limits, extensions)

---

### 8. Cleanup Cloudinary (tùy chọn)

> [!WARNING]
> Sau khi chuyển sang local storage thành công, các file Cloudinary cũ cần:
> - Giữ lại dependency `cloudinary-http44` tạm thời nếu cần backward-compatible
> - Hoặc xóa hẳn dependency + config nếu không cần

#### [DELETE] [CloudinaryConfig.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/config/CloudinaryConfig.java)
#### [DELETE] [CloudinaryService.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/CloudinaryService.java)
#### [DELETE] [CloudinaryServiceImpl.java](file:///d:/01_Workspace/TopViec/topviec-be/src/main/java/com/topviec/topviec_be/service/impl/CloudinaryServiceImpl.java)

#### [MODIFY] [build.gradle](file:///d:/01_Workspace/TopViec/topviec-be/build.gradle)
- Xóa dependency `com.cloudinary:cloudinary-http44`

#### [MODIFY] [application.yaml](file:///d:/01_Workspace/TopViec/topviec-be/src/main/resources/application.yaml)
- Xóa block `app.cloudinary.*`

#### [MODIFY] [.gitignore](file:///d:/01_Workspace/TopViec/topviec-be/.gitignore)
- Thêm `uploads/` để không commit file upload lên git

---

## Open Questions

> [!IMPORTANT]
> **1. Xóa Cloudinary ngay hay giữ lại?**
> Bạn muốn xóa hẳn Cloudinary (dependency, config, service) ngay lập tức? Hay giữ lại tạm thời để backward-compatible với các URL ảnh cũ đã lưu trong DB?

> [!IMPORTANT]
> **2. Avatar & Company Logo/Cover — Upload flow**
> Hiện tại FE đang truyền `avatarUrl`, `logoUrl`, `coverUrl` dưới dạng string URL (có thể đang upload trực tiếp lên Cloudinary từ FE). Sau khi chuyển sang local storage:
> - **Phương án A**: FE gọi `POST /files/upload` trước → nhận URL → gửi URL khi update profile/company (giống flow hiện tại, chỉ đổi endpoint upload)
> - **Phương án B**: Nhúng upload file vào API update profile/company luôn (multipart/form-data)
> 
> Tôi sẽ triển khai **Phương án A** (tạo endpoint upload riêng) vì ít thay đổi nhất. Bạn có đồng ý không?

---

## Verification Plan

### Build & Compile
- Chạy `./gradlew build` để đảm bảo compile thành công

### Manual Verification
1. Start server → kiểm tra thư mục `uploads/` được tạo tự động
2. Upload CV qua API → kiểm tra file xuất hiện đúng thư mục `uploads/files/cvs/user_{id}/`
3. Upload avatar qua `POST /files/upload` → kiểm tra `uploads/images/avatars/user_{id}/`
4. Truy cập URL file → kiểm tra trả về đúng file
5. Xóa file → kiểm tra file bị xóa khỏi filesystem

### Tổng kết file thay đổi

| Action | File |
|--------|------|
| **NEW** | `FileStorageConfig.java` |
| **NEW** | `WebMvcConfig.java` |
| **NEW** | `FileStorageService.java` |
| **NEW** | `FileStorageServiceImpl.java` |
| **NEW** | `FileUploadController.java` |
| **MODIFY** | `application.yaml` |
| **MODIFY** | `SecurityConfig.java` |
| **MODIFY** | `FileUploadType.java` |
| **MODIFY** | `FileValidator.java` |
| **MODIFY** | `CvServiceImpl.java` |
| **MODIFY** | `.gitignore` |
| **MODIFY** | `build.gradle` |
| **DELETE** | `CloudinaryConfig.java` |
| **DELETE** | `CloudinaryService.java` |
| **DELETE** | `CloudinaryServiceImpl.java` |
