import {
    AddonPackageGroup,
    BillingCycle,
    SubscriptionStatus,
    JobPostAddonStatus,
} from '@/constants/servicePackage.constants'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'
import type { ResServicePackageDetailDTO, ServiceCategory } from '@/types/serviceCatalog.types'

export type { ResServicePackageDetailDTO, ServiceCategory }

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

export interface ReqServicePackageDetailItem {
    serviceId: number
    quantity:  number
}

export interface ReqServicePackageDTO {
    name:         string
    code:         string
    billingCycle: BillingCycle
    price:        number
    details:      ReqServicePackageDetailItem[] | null
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
    details:      ResServicePackageDetailDTO[]
    description:  string | null
    isActive:     boolean
    sortOrder:    number | null
    createdAt:    string
    updatedAt:    string
}

export type ResServicePackagePagination = ResultPaginationDTO<ResServicePackageDTO>

export interface AdminServicePackageQueryParams {
    keyword?: string
    page?:    number
    size?:    number
    sort?:    string
}

// ─── Employer Service Management ─────────────────────────────────────────────

export interface ReqApplyAddonDTO {
    companyAddonId: number
}

export interface ResSubscriptionUsageDTO {
    id:                number
    featureCode:       string
    featureName:       string | null
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
    id:                  number
    addonServiceId:      number
    addonName:           string | null
    addonCode:           string | null
    addonQuantity:       number | null
    serviceId:           number | null
    serviceCode:         string | null
    serviceName:         string | null
    serviceCategory:     ServiceCategory | null
    serviceCategoryName: string | null
    status:              SubscriptionStatus
    quantityTotal:       number
    quantityRemaining:   number
    startedAt:           string | null
    expiredAt:           string | null
    createdAt:           string
}

export interface ResJobPostAddonDTO {
    id:             number
    jobPostingId:   number
    companyAddonId: number
    addonServiceId: number
    addonName:      string | null
    status:         JobPostAddonStatus
    startedAt:      string | null
    expiredAt:      string | null
    createdAt:      string
}
