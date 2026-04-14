import { AddonPackageGroup, BillingCycle } from '@/constants/servicePackage.constants'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'

export { AddonPackageGroup, BillingCycle }
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
