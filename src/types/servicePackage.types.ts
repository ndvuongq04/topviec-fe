import {
    AddonPackageGroup,
    BillingCycle,
    SubscriptionStatus,
    JobPostAddonStatus,
} from '@/constants/servicePackage.constants'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'

export { AddonPackageGroup, BillingCycle, SubscriptionStatus, JobPostAddonStatus }
export type { PaginationMeta, ResultPaginationDTO }

// ─── Addon Package ───────────────────────────────────────────────────────────

export interface ReqAddonPackageDTO {
    groupCode:    AddonPackageGroup
    name:         string
    code:         string
    price:        number
    durationDays: number | null
    description:  string | null
    isActive:     boolean | null
}

export interface ResAddonPackageDTO {
    id:           number
    groupCode:    AddonPackageGroup
    groupName:    string
    name:         string
    code:         string
    price:        number
    durationDays: number | null
    description:  string | null
    isActive:     boolean
    createdAt:    string
    updatedAt:    string
}

export type ResAddonPackagePagination = ResultPaginationDTO<ResAddonPackageDTO>

export interface AdminAddonPackageQueryParams {
    groupCode?: AddonPackageGroup
    page?:      number
    size?:      number
    sort?:      string
}

// ─── Service Package ─────────────────────────────────────────────────────────

export interface ReqServicePackageDTO {
    name:         string
    code:         string
    billingCycle: BillingCycle
    price:        number
    features:     Record<string, unknown> | null
    description:  string | null
    isActive:     boolean | null
    sortOrder:    number | null
}

export interface ResServicePackageDTO {
    id:           number
    name:         string
    code:         string
    billingCycle: BillingCycle
    price:        number
    features:     Record<string, unknown> | null
    description:  string | null
    isActive:     boolean
    sortOrder:    number | null
    createdAt:    string
    updatedAt:    string
}

export type ResServicePackagePagination = ResultPaginationDTO<ResServicePackageDTO>

export interface AdminServicePackageQueryParams {
    page?: number
    size?: number
    sort?: string
}

// ─── Employer Service Management ─────────────────────────────────────────────

export interface ReqApplyAddonDTO {
    companyAddonId: number
}

export interface ResSubscriptionUsageDTO {
    id:                number
    featureCode:       string
    quantityTotal:     number
    quantityRemaining: number
    resetAt:           string | null
}

export interface ResCompanySubscriptionDTO {
    id:               number
    servicePackageId: number
    packageName:      string | null
    packageCode:      string | null
    billingCycle:     BillingCycle
    status:           SubscriptionStatus
    startedAt:        string
    expiredAt:        string | null
    createdAt:        string
    usages:           ResSubscriptionUsageDTO[]
}

export interface ResCompanyAddonDTO {
    id:                number
    addonPackageId:    number
    addonName:         string | null
    addonCode:         string | null
    groupCode:         AddonPackageGroup | null
    status:            SubscriptionStatus
    quantityTotal:     number
    quantityRemaining: number
    startedAt:         string | null
    expiredAt:         string | null
    createdAt:         string
}

export interface ResJobPostAddonDTO {
    id:             number
    jobPostingId:   number
    companyAddonId: number
    addonPackageId: number
    addonName:      string | null
    status:         JobPostAddonStatus
    startedAt:      string | null
    expiredAt:      string | null
    createdAt:      string
}
