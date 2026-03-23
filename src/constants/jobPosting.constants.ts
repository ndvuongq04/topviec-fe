
export enum WorkType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    INTERN = 'INTERN',
    REMOTE = 'REMOTE',
}

export enum JobPostingStatus {
    DRAFT     = 'draft',
    PENDING   = 'pending',
    PUBLISHED = 'published',
    PAUSED    = 'paused',
    CLOSED    = 'closed',
    EXPIRED   = 'expired',
    REJECTED  = 'rejected',
}


// ─── Labels cho UI ──────────────────────────────────────────────────────────────

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
    [WorkType.FULL_TIME]: 'Toàn thời gian',
    [WorkType.PART_TIME]: 'Bán thời gian',
    [WorkType.INTERN]:    'Thực tập',
    [WorkType.REMOTE]:    'Remote',
}

export const JOB_POSTING_STATUS_LABELS: Record<JobPostingStatus, string> = {
    [JobPostingStatus.DRAFT]:     'Bản nháp',
    [JobPostingStatus.PENDING]:   'Chờ duyệt',
    [JobPostingStatus.PUBLISHED]: 'Đang đăng',
    [JobPostingStatus.PAUSED]:    'Tạm dừng',
    [JobPostingStatus.CLOSED]:    'Đã đóng',
    [JobPostingStatus.EXPIRED]:   'Hết hạn',
    [JobPostingStatus.REJECTED]:  'Bị từ chối',
}

/** Tailwind badge classes theo status */
export const JOB_POSTING_STATUS_BADGE: Record<JobPostingStatus, string> = {
    [JobPostingStatus.DRAFT]:     'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    [JobPostingStatus.PENDING]:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    [JobPostingStatus.PUBLISHED]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    [JobPostingStatus.PAUSED]:    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    [JobPostingStatus.CLOSED]:    'bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-400',
    [JobPostingStatus.EXPIRED]:   'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    [JobPostingStatus.REJECTED]:  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

export const WORK_TYPE_OPTIONS: { label: string; value: WorkType }[] = [
    { label: 'Toàn thời gian', value: WorkType.FULL_TIME },
    { label: 'Bán thời gian',  value: WorkType.PART_TIME },
    { label: 'Thực tập',       value: WorkType.INTERN },
    { label: 'Remote',         value: WorkType.REMOTE },
]

export const JOB_POSTING_DEFAULT_PAGE_SIZE = 10
export const JOB_POSTING_DEFAULT_SORT = 'createdAt'
