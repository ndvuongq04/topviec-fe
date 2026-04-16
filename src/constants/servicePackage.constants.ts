
// ─── Enums ──────────────────────────────────────────────────────────────────
// ⚠️  Đồng bộ với BE enum: com.topviec.topviec_be.enums.services

export enum SubscriptionStatus {
    ACTIVE    = 'active',
    EXPIRED   = 'expired',
    CANCELLED = 'cancelled',
}

export enum JobPostAddonStatus {
    ACTIVE  = 'active',
    EXPIRED = 'expired',
}

// ─── Labels cho UI (SubscriptionStatus / JobPostAddonStatus) ────────────────

export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
    [SubscriptionStatus.ACTIVE]:    'Đang hoạt động',
    [SubscriptionStatus.EXPIRED]:   'Hết hạn',
    [SubscriptionStatus.CANCELLED]: 'Đã huỷ',
}

export const JOB_POST_ADDON_STATUS_LABELS: Record<JobPostAddonStatus, string> = {
    [JobPostAddonStatus.ACTIVE]:  'Đang hoạt động',
    [JobPostAddonStatus.EXPIRED]: 'Hết hạn',
}


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
    MONTHLY = 'monthly',  // Hàng tháng
    YEARLY  = 'yearly',   // Hàng năm
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

// ─── AddonPackageGroup → Icon mapping ────────────────────────────────────────

export interface AddonGroupIconMeta {
    icon:      string
    iconBg:    string
    iconColor: string
}

export const ADDON_GROUP_ICON_MAP: Record<AddonPackageGroup, AddonGroupIconMeta> = {
    [AddonPackageGroup.JOB_POSTING]:         { icon: 'campaign',      iconBg: '#eff6ff', iconColor: '#2563eb' },
    [AddonPackageGroup.CANDIDATE]:           { icon: 'person_search', iconBg: '#ecfdf5', iconColor: '#059669' },
    [AddonPackageGroup.BRANDING]:            { icon: 'verified',      iconBg: '#fdf4ff', iconColor: '#9333ea' },
    [AddonPackageGroup.ADDON_PACKAGE_GROUP]: { icon: 'star',          iconBg: '#fff7ed', iconColor: '#ea580c' },
}

// ─── Feature Code → UI mapping ───────────────────────────────────────────────
// ⚠️  Đồng bộ với featureCode trong bảng subscription_usages bên BE

export interface FeatureCodeMeta {
    label:     string
    icon:      string
    iconBg:    string
    iconColor: string
}

export const FEATURE_CODE_MAP: Record<string, FeatureCodeMeta> = {
    hot_job_quota:   { label: 'Tin nổi bật',          icon: 'campaign',      iconBg: '#eff6ff', iconColor: '#2563eb' },
    cv_search_quota: { label: 'Tìm kiếm ứng viên',    icon: 'person_search', iconBg: '#ecfdf5', iconColor: '#059669' },
    top_brand_badge: { label: 'Top Brand Badge',       icon: 'verified',      iconBg: '#fdf4ff', iconColor: '#9333ea' },
    unlimited_post:  { label: 'Đăng tin không giới hạn', icon: 'work',       iconBg: '#fff7ed', iconColor: '#ea580c' },
    cv_access_quota: { label: 'Mở khoá hồ sơ ứng viên', icon: 'lock_open',  iconBg: '#ecfdf5', iconColor: '#059669' },
    extend_job:      { label: 'Gia hạn tin tuyển dụng', icon: 'event_repeat', iconBg: '#eff6ff', iconColor: '#2563eb' },
}

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
