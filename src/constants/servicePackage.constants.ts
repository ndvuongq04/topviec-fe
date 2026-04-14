
// ─── Enums ──────────────────────────────────────────────────────────────────
// ⚠️  Đồng bộ với BE enum: com.topviec.topviec_be.enums.services

export enum AddonPackageGroup {
    FEATURED_JOB  = 'FEATURED_JOB',   // Tin tuyển dụng nổi bật
    URGENT_JOB    = 'URGENT_JOB',     // Tin tuyển dụng khẩn cấp
    EXTEND_JOB    = 'EXTEND_JOB',     // Gia hạn tin tuyển dụng
    CV_ACCESS     = 'CV_ACCESS',      // Truy cập hồ sơ ứng viên
    PROFILE_BOOST = 'PROFILE_BOOST',  // Tăng độ hiển thị hồ sơ
}

export enum BillingCycle {
    MONTHLY = 'MONTHLY',  // Hàng tháng
    YEARLY  = 'YEARLY',   // Hàng năm
}

// ─── Labels cho UI ──────────────────────────────────────────────────────────────

export const ADDON_PACKAGE_GROUP_LABELS: Record<AddonPackageGroup, string> = {
    [AddonPackageGroup.FEATURED_JOB]:  'Tin nổi bật',
    [AddonPackageGroup.URGENT_JOB]:    'Tin khẩn cấp',
    [AddonPackageGroup.EXTEND_JOB]:    'Gia hạn tin',
    [AddonPackageGroup.CV_ACCESS]:     'Truy cập hồ sơ',
    [AddonPackageGroup.PROFILE_BOOST]: 'Tăng hiển thị',
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
