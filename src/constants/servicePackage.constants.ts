
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
    MONTHLY   = 'MONTHLY',    // Hàng tháng
    QUARTERLY = 'QUARTERLY',  // Hàng quý
    YEARLY    = 'YEARLY',     // Hàng năm
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
    [BillingCycle.MONTHLY]:   'Hàng tháng',
    [BillingCycle.QUARTERLY]: 'Hàng quý',
    [BillingCycle.YEARLY]:    'Hàng năm',
}
