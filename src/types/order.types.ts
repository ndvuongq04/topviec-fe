import {
    OrderItemType,
    OrderStatus,
    OrderType,
    PaymentMethod,
} from '@/constants/servicePackage.constants'
import { BillingCycle } from '@/constants/servicePackage.constants'
import type { PaginationMeta, ResultPaginationDTO } from '@/types/common.types'

export { OrderItemType, OrderStatus, OrderType, PaymentMethod, BillingCycle }
export type { PaginationMeta, ResultPaginationDTO }

// ─── Request DTOs ─────────────────────────────────────────────────────────────

export interface ReqCreateOrderDTO {
    type:          OrderType
    packageId:     number
    quantity:      number
    paymentMethod: PaymentMethod
}

export interface ReqUpdateOrderStatusDTO {
    status: OrderStatus
}

// ─── Response DTOs ────────────────────────────────────────────────────────────

export interface ResOrderItemDTO {
    id:               number
    itemType:         OrderItemType
    servicePackageId: number | null
    addonPackageId:   number | null
    quantity:         number
    unitPrice:        number
    totalPrice:       number
    billingCycle:     BillingCycle | null
    durationDays:     number | null
}

export interface ResOrderDTO {
    id:                   number
    orderCode:            string
    type:                 OrderType
    totalAmount:          number
    status:               OrderStatus
    paymentMethod:        PaymentMethod
    paymentTransactionId: string | null
    paidAt:               string | null
    note:                 string | null
    createdAt:            string
    items:                ResOrderItemDTO[]
}

export type ResOrderPagination = ResultPaginationDTO<ResOrderDTO>

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface AdminOrderQueryParams {
    status?: OrderStatus
    page?:   number
    size?:   number
    sort?:   string
}

export interface EmployerOrderQueryParams {
    page?: number
    size?: number
    sort?: string
}

export interface EmployerAddonPackageQueryParams {
    groupCode?: string
}
