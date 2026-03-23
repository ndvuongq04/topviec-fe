import type { ResultPaginationDTO } from './company.types'

export interface ReqJobPostLocationDTO {
  provinceId: number
  addressDetail?: string
  isRemote: boolean
}

export interface ReqJobPostSkillDTO {
  skillId: number
  isRequired: boolean
  proficiencyMin?: number
}

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
  workType: string
  headcount: number
  deadline: string // ISO date string
  locations: ReqJobPostLocationDTO[]
  skills?: ReqJobPostSkillDTO[]
  isFeatured?: boolean
  isUrgent?: boolean
}

export type ReqUpdateJobPostingDTO = ReqCreateJobPostingDTO

export interface ReqExtendJobPostDTO {
  newDeadline: string // ISO datetime string
}

export interface ResJobPostLocationDTO {
  id: number
  provinceId: number
  provinceName?: string
  addressDetail?: string
  isRemote: boolean
}

export interface ResJobPostSkillDTO {
  id: number
  skillId: number
  skillName?: string
  isRequired: boolean
  proficiencyMin?: number
}

export interface ResJobPostingDetail {
  id: number
  title: string
  slug: string
  description: string
  requirements: string
  benefits: string
  companyId: number
  industryId: number
  levelId: number
  experienceYearsMin: number
  experienceYearsMax: number
  salaryMin: number
  salaryMax: number
  salaryNegotiable: boolean
  workType: string
  headcount: number
  deadline: string
  status: 'draft' | 'pending_approval' | 'published' | 'paused' | 'closed' | 'expired' | 'rejected'
  isFeatured: boolean
  isUrgent: boolean
  viewCount: number
  editCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
  locations: ResJobPostLocationDTO[]
  skills: ResJobPostSkillDTO[]
}

export type ResJobPostingPagination = ResultPaginationDTO<ResJobPostingDetail>
