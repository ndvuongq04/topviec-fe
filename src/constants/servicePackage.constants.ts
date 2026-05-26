
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

export enum BrandingAddonStatus {
    ACTIVE  = 'ACTIVE',
    EXPIRED = 'EXPIRED',
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

export const BRANDING_ADDON_STATUS_LABELS: Record<BrandingAddonStatus, string> = {
    [BrandingAddonStatus.ACTIVE]:  'Đang hoạt động',
    [BrandingAddonStatus.EXPIRED]: 'Hết hạn',
}

export const SERVICE_CODES = {
    JOB_POSTING_HOT:     'JOB_POSTING_HOT',
    JOB_POSTING_URGENT:  'JOB_POSTING_URGENT',
    JOB_POSTING_REFRESH: 'JOB_POSTING_REFRESH',

    BRANDING_BANNER_HOME:  'BRANDING_BANNER_HOME',
    BRANDING_TOP_EMPLOYER: 'BRANDING_TOP_EMPLOYER',
    BRANDING_VERIFIED:     'BRANDING_VERIFIED',

    CANDIDATE_CV_SEARCH: 'CANDIDATE_CV_SEARCH',
} as const

export type ServiceCode = typeof SERVICE_CODES[keyof typeof SERVICE_CODES]

export const SERVICE_CODE_LABELS: Record<ServiceCode, string> = {
    [SERVICE_CODES.JOB_POSTING_HOT]:     'Tin HOT',
    [SERVICE_CODES.JOB_POSTING_URGENT]:  'Tin tuyển gấp',
    [SERVICE_CODES.JOB_POSTING_REFRESH]: 'Làm mới tin',
    [SERVICE_CODES.BRANDING_BANNER_HOME]:  'Banner trang chủ',
    [SERVICE_CODES.BRANDING_TOP_EMPLOYER]: 'Top Employer',
    [SERVICE_CODES.BRANDING_VERIFIED]:     'Xác thực thương hiệu',
    [SERVICE_CODES.CANDIDATE_CV_SEARCH]: 'Tìm kiếm CV',
}

export const JOB_POSTING_SERVICE_CODES = [
    SERVICE_CODES.JOB_POSTING_HOT,
    SERVICE_CODES.JOB_POSTING_URGENT,
    SERVICE_CODES.JOB_POSTING_REFRESH,
] as const

export const BRANDING_SERVICE_CODES = [
    SERVICE_CODES.BRANDING_BANNER_HOME,
    SERVICE_CODES.BRANDING_TOP_EMPLOYER,
    SERVICE_CODES.BRANDING_VERIFIED,
] as const

export enum OrderItemType {
    SUBSCRIPTION = 'subscription',
    ADDON        = 'addon',
}

export enum OrderStatus {
    PENDING          = 'pending',
    PAID             = 'paid',
    FAILED           = 'failed',
    CANCELLED        = 'cancelled',
    REFUND_REQUESTED = 'refund_requested',
    REFUND_REJECTED  = 'refund_rejected',
    REFUNDED         = 'refunded',
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
    [OrderStatus.PENDING]:          'Chờ thanh toán',
    [OrderStatus.PAID]:             'Đã thanh toán',
    [OrderStatus.FAILED]:           'Thất bại',
    [OrderStatus.CANCELLED]:        'Đã huỷ',
    [OrderStatus.REFUND_REQUESTED]: 'Chờ hoàn tiền',
    [OrderStatus.REFUND_REJECTED]:  'Từ chối hoàn tiền',
    [OrderStatus.REFUNDED]:         'Đã hoàn tiền',
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

export enum BillingCycle {
    MONTHLY = 'monthly',  // Hàng tháng
    YEARLY  = 'yearly',   // Hàng năm
}

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
    [BillingCycle.MONTHLY]: 'Hàng tháng',
    [BillingCycle.YEARLY]:  'Hàng năm',
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


