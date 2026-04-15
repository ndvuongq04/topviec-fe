
// ─── Enums ──────────────────────────────────────────────────────────────────
// ⚠️  Đồng bộ với BE enum: com.topviec.topviec_be.enums.services

export enum OrderItemType {
    SUBSCRIPTION = 'subscription',
    ADDON        = 'addon',
}

export enum OrderStatus {
    PENDING   = 'pending',
    PAID      = 'paid',
    FAILED    = 'failed',
    CANCELLED = 'cancelled',
    REFUNDED  = 'refunded',
}

export enum OrderType {
    SUBSCRIPTION = 'subscription',
    ADDON        = 'addon',
}

export enum PaymentMethod {
    VNPAY = 'vnpay',
    MOMO  = 'momo',
}

// ─── Labels cho UI (Order) ──────────────────────────────────────────────────

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]:   'Chờ thanh toán',
    [OrderStatus.PAID]:      'Đã thanh toán',
    [OrderStatus.FAILED]:    'Thất bại',
    [OrderStatus.CANCELLED]: 'Đã huỷ',
    [OrderStatus.REFUNDED]:  'Đã hoàn tiền',
}

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
    [OrderType.SUBSCRIPTION]: 'Gói đăng ký',
    [OrderType.ADDON]:        'Dịch vụ lẻ',
}

export const ORDER_ITEM_TYPE_LABELS: Record<OrderItemType, string> = {
    [OrderItemType.SUBSCRIPTION]: 'Gói đăng ký',
    [OrderItemType.ADDON]:        'Dịch vụ lẻ',
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
    [PaymentMethod.VNPAY]: 'VNPay',
    [PaymentMethod.MOMO]:  'MoMo',
}

export enum AddonPackageGroup {
    JOB_POSTING          = 'JOB_POSTING',          // Nhóm tin tuyển dụng
    CANDIDATE            = 'CANDIDATE',            // Nhóm hồ sơ
    BRANDING             = 'BRANDING',             // Nhóm thương hiệu
    ADDON_PACKAGE_GROUP  = 'ADDON_PACKAGE_GROUP',  // Nhóm gói dịch vụ thêm
}

export enum BillingCycle {
    MONTHLY = 'MONTHLY',  // Hàng tháng
    YEARLY  = 'YEARLY',   // Hàng năm
}

// ─── Labels cho UI ──────────────────────────────────────────────────────────────

export const ADDON_PACKAGE_GROUP_LABELS: Record<AddonPackageGroup, string> = {
    [AddonPackageGroup.JOB_POSTING]:         'Nhóm tin tuyển dụng',
    [AddonPackageGroup.CANDIDATE]:           'Nhóm hồ sơ',
    [AddonPackageGroup.BRANDING]:            'Nhóm thương hiệu',
    [AddonPackageGroup.ADDON_PACKAGE_GROUP]: 'Nhóm gói dịch vụ thêm',
}

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
    [BillingCycle.MONTHLY]: 'Hàng tháng',
    [BillingCycle.YEARLY]:  'Hàng năm',
}

// ─── Addon Package Options (Name → Code mapping) ──────────────────────────────
// ⚠️  Đồng bộ với danh sách dịch vụ lẻ bên BE

export interface AddonPackageOption {
    name:      string
    code:      string
    groupCode: AddonPackageGroup
}

export const ADDON_PACKAGE_OPTIONS: AddonPackageOption[] = [
    // Nhóm tin tuyển dụng
    { name: 'Tin nổi bật',          code: 'HOT_JOB_7D',      groupCode: AddonPackageGroup.JOB_POSTING },
    { name: 'Tin khẩn cấp',         code: 'URGENT_JOB_7D',   groupCode: AddonPackageGroup.JOB_POSTING },
    { name: 'Gia hạn tin 7 ngày',   code: 'EXTEND_JOB_7D',   groupCode: AddonPackageGroup.JOB_POSTING },
    { name: 'Gia hạn tin 14 ngày',  code: 'EXTEND_JOB_14D',  groupCode: AddonPackageGroup.JOB_POSTING },
    // Nhóm hồ sơ
    { name: 'Mở khóa hồ sơ ứng viên', code: 'CV_ACCESS',       groupCode: AddonPackageGroup.CANDIDATE },
    { name: 'Tăng hiển thị hồ sơ',    code: 'PROFILE_BOOST',   groupCode: AddonPackageGroup.CANDIDATE },
    // Nhóm thương hiệu
    { name: 'Top Employer Banner',     code: 'BRAND_BANNER',    groupCode: AddonPackageGroup.BRANDING },
    { name: 'Bài viết quảng bá',       code: 'BRAND_POST',      groupCode: AddonPackageGroup.BRANDING },
    // Nhóm gói dịch vụ thêm
    { name: 'Gói dịch vụ thêm',        code: 'ADDON_PACKAGE',   groupCode: AddonPackageGroup.ADDON_PACKAGE_GROUP },
]

// ─── Service Package Tiers ───────────────────────────────────────────────────

export enum ServicePackageTier {
    FREE       = 'FREE',
    BASIC      = 'BASIC',
    PRO        = 'PRO',
    PREMIUM    = 'PREMIUM',
    ENTERPRISE = 'ENTERPRISE',
}

export const SERVICE_PACKAGE_TIER_LABELS: Record<ServicePackageTier, string> = {
    [ServicePackageTier.FREE]:       'Gói Miễn Phí',
    [ServicePackageTier.BASIC]:      'Gói Cơ Bản',
    [ServicePackageTier.PRO]:        'Gói Pro',
    [ServicePackageTier.PREMIUM]:    'Gói Premium',
    [ServicePackageTier.ENTERPRISE]: 'Gói Doanh Nghiệp',
}

// ─── Features ────────────────────────────────────────────────────────────────

export interface ServicePackageFeatures {
    hot_job_quota:   number
    cv_search_quota: number
    top_brand_badge: boolean
    unlimited_post:  boolean
}

export const SERVICE_PACKAGE_DEFAULT_FEATURES: Record<ServicePackageTier, ServicePackageFeatures> = {
    [ServicePackageTier.FREE]: {
        hot_job_quota:   0,
        cv_search_quota: 0,
        top_brand_badge: false,
        unlimited_post:  false,
    },
    [ServicePackageTier.BASIC]: {
        hot_job_quota:   1,
        cv_search_quota: 20,
        top_brand_badge: false,
        unlimited_post:  false,
    },
    [ServicePackageTier.PRO]: {
        hot_job_quota:   3,
        cv_search_quota: 50,
        top_brand_badge: false,
        unlimited_post:  true,
    },
    [ServicePackageTier.PREMIUM]: {
        hot_job_quota:   10,
        cv_search_quota: 200,
        top_brand_badge: true,
        unlimited_post:  true,
    },
    [ServicePackageTier.ENTERPRISE]: {
        hot_job_quota:   999,
        cv_search_quota: 999,
        top_brand_badge: true,
        unlimited_post:  true,
    },
}
