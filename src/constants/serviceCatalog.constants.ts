export enum ServiceCategory {
    JOB_POSTING = 'JOB_POSTING',
    CANDIDATE   = 'CANDIDATE',
    BRANDING    = 'BRANDING',
    OTHER       = 'OTHER',
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
    [ServiceCategory.JOB_POSTING]: 'Tuyển dụng',
    [ServiceCategory.CANDIDATE]: 'Ứng viên',
    [ServiceCategory.BRANDING]: 'Thương hiệu',
    [ServiceCategory.OTHER]: 'Khác',
}
