import { WorkType, JobPostingStatus } from '@/constants/jobPosting.constants'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'

// Re-export để các file khác chỉ cần import 1 chỗ
export { WorkType, JobPostingStatus }


// ─── Sub-DTOs (Request) ───────────────────────────────────────────────────────

export interface ReqJobPostLocationDTO {
    provinceId: number
    addressDetail?: string
    isRemote: boolean
}

export interface ReqJobPostSkillDTO {
    skillId: number
    isRequired: boolean
    proficiencyMin?: number // 1-5
}


// ─── Request DTOs ─────────────────────────────────────────────────────────────

/** POST /employer/job-postings */
export interface ReqCreateJobPostingDTO {
    title: string
    description: string
    requirements: string
    benefits?: string
    industryId: number
    levelId: number
    experienceYearsMin: number
    experienceYearsMax?: number
    salaryMin?: number
    salaryMax?: number
    salaryNegotiable: boolean
    workType: WorkType | string
    headcount: number
    deadline: string // ISO datetime
    locations: ReqJobPostLocationDTO[]
    skills?: ReqJobPostSkillDTO[]
    isFeatured?: boolean
    isUrgent?: boolean
}

/** PUT /employer/job-postings/{id} — cùng cấu trúc với Create */
export type ReqUpdateJobPostingDTO = ReqCreateJobPostingDTO

/** PATCH .../extend */
export interface ReqExtendJobPostDTO {
    newDeadline: string // ISO datetime
}

/** PATCH /admin/job-postings/{id}/reject | takedown */
export interface ReqRejectJobPostingDTO {
    rejectionReason: string
    moderationNote?: string
}


// ─── Sub-DTOs (Response) ──────────────────────────────────────────────────────

export interface ResJobPostLocationDTO {
    id: number
    provinceId: number
    addressDetail?: string
    isRemote: boolean
}

export interface ResJobPostSkillDTO {
    id: number
    skillId: number
    skillName: string
    isRequired: boolean
    proficiencyMin?: number
}

export interface JobPostCompanyDTO {
    id: number
    name: string
    slug: string
    logoUrl?: string
    address?: string
}

export interface JobPostIndustryDTO {
    id: number
    name: string
}

export interface JobPostLevelDTO {
    id: number
    name: string
}


// ─── Response DTOs ────────────────────────────────────────────────────────────

export interface ResJobPostingDetail {
    id: number
    title: string
    slug: string
    description: string
    requirements: string
    benefits?: string
    company: JobPostCompanyDTO
    industry: JobPostIndustryDTO
    level: JobPostLevelDTO
    experienceYearsMin: number
    experienceYearsMax?: number
    salaryMin?: number
    salaryMax?: number
    salaryNegotiable: boolean
    workType: string
    headcount: number
    hiredCount: number
    deadline: string
    status: JobPostingStatus
    isFeatured: boolean
    isUrgent: boolean
    viewCount: number
    applicationCount: number
    editCount: number
    publishedAt?: string
    createdAt: string
    updatedAt: string
    deletedAt?: string | null
    locations: ResJobPostLocationDTO[]
    skills: ResJobPostSkillDTO[]
    interviewRoundsCount: number
}

export interface ResJobPostingSummary {
    id: number
    title: string
    slug: string
    company: JobPostCompanyDTO
    industry: JobPostIndustryDTO
    level: JobPostLevelDTO
    workType: string
    status: JobPostingStatus
    salaryMin?: number
    salaryMax?: number
    salaryNegotiable: boolean
    isFeatured: boolean
    isUrgent: boolean
    viewCount: number
    applicationCount: number
    headcount: number
    hiredCount: number
    deadline: string
    publishedAt?: string
    createdAt: string
    deletedAt?: string | null
    interviewRoundsCount: number
}


// ─── Paginated ────────────────────────────────────────────────────────────────

export type { PaginationMeta, ResultPaginationDTO }

export type ResJobPostingDetailPagination  = ResultPaginationDTO<ResJobPostingDetail>
export type ResJobPostingSummaryPagination = ResultPaginationDTO<ResJobPostingSummary>


// ─── Query Params ─────────────────────────────────────────────────────────────

export interface JobPostingQueryParams {
    keyword?: string
    companyId?: number
    industryId?: number
    levelId?: number
    workType?: string
    isFeatured?: boolean
    isUrgent?: boolean
    salaryMin?: number
    salaryMax?: number
    experienceYearsMin?: number
    experienceYearsMax?: number
    page?: number
    size?: number
    sort?: string
}

export interface EmployerJobPostingQueryParams extends JobPostingQueryParams {
    status?: JobPostingStatus
}
