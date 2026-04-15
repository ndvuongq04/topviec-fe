import { defineStore } from 'pinia'
import { ref } from 'vue'
import { adminOrderService, employerOrderService, employerPackageService } from '@/services/order.service'
import type { PaginationMeta } from '@/types/common.types'
import type {
    ReqCreateOrderDTO,
    ReqUpdateOrderStatusDTO,
    ResOrderDTO,
    AdminOrderQueryParams,
    EmployerOrderQueryParams,
    EmployerAddonPackageQueryParams,
} from '@/types/order.types'
import type { ResServicePackageDTO, ResAddonPackageDTO } from '@/types/servicePackage.types'

// ─── Helper ───────────────────────────────────────────────────────────────────

function extractErrorMessage(err: unknown): string {
    const data = (err as any)?.response?.data
    if (data?.message && typeof data.message === 'object') {
        return String(Object.values(data.message)[0])
    }
    return data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.'
}

// ─── Admin Order Store ────────────────────────────────────────────────────────

export const useAdminOrderStore = defineStore('adminOrder', () => {
    const orders        = ref<ResOrderDTO[]>([])
    const selectedOrder = ref<ResOrderDTO | null>(null)
    const meta          = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 })
    const loading       = ref(false)
    const error         = ref<string | null>(null)

    function _updateInList(updated: ResOrderDTO) {
        const idx = orders.value.findIndex(o => o.id === updated.id)
        if (idx !== -1) orders.value[idx] = updated
    }

    async function fetchOrders(params?: AdminOrderQueryParams) {
        loading.value = true
        error.value   = null
        try {
            const data      = await adminOrderService.getAll(params)
            orders.value    = data.result
            meta.value      = data.meta
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    async function fetchOrderById(id: number) {
        loading.value = true
        error.value   = null
        try {
            selectedOrder.value = await adminOrderService.getById(id)
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    async function updateOrderStatus(id: number, payload: ReqUpdateOrderStatusDTO): Promise<ResOrderDTO> {
        loading.value = true
        error.value   = null
        try {
            const updated = await adminOrderService.updateStatus(id, payload)
            _updateInList(updated)
            if (selectedOrder.value?.id === updated.id) selectedOrder.value = updated
            return updated
        } catch (err) {
            error.value = extractErrorMessage(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    function reset() {
        orders.value        = []
        selectedOrder.value = null
        meta.value          = { page: 0, pageSize: 10, pages: 0, totals: 0 }
        loading.value       = false
        error.value         = null
    }

    return {
        orders,
        selectedOrder,
        meta,
        loading,
        error,
        fetchOrders,
        fetchOrderById,
        updateOrderStatus,
        reset,
    }
})

// ─── Employer Order Store ─────────────────────────────────────────────────────

export const useEmployerOrderStore = defineStore('employerOrder', () => {
    const orders        = ref<ResOrderDTO[]>([])
    const selectedOrder = ref<ResOrderDTO | null>(null)
    const meta          = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 })
    const loading       = ref(false)
    const error         = ref<string | null>(null)

    // ─── Active packages (dùng khi tạo order) ────────────────────────────────
    const activeServicePackages = ref<ResServicePackageDTO[]>([])
    const activeAddonPackages   = ref<ResAddonPackageDTO[]>([])

    function _updateInList(updated: ResOrderDTO) {
        const idx = orders.value.findIndex(o => o.id === updated.id)
        if (idx !== -1) orders.value[idx] = updated
    }

    async function fetchMyOrders(params?: EmployerOrderQueryParams) {
        loading.value = true
        error.value   = null
        try {
            const data   = await employerOrderService.getMyOrders(params)
            orders.value = data.result
            meta.value   = data.meta
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    async function fetchOrderById(id: number) {
        loading.value = true
        error.value   = null
        try {
            selectedOrder.value = await employerOrderService.getById(id)
        } catch (err) {
            error.value = extractErrorMessage(err)
        } finally {
            loading.value = false
        }
    }

    async function createOrder(payload: ReqCreateOrderDTO): Promise<ResOrderDTO> {
        loading.value = true
        error.value   = null
        try {
            const created = await employerOrderService.createOrder(payload)
            orders.value.unshift(created)
            return created
        } catch (err) {
            error.value = extractErrorMessage(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    async function cancelOrder(id: number): Promise<ResOrderDTO> {
        loading.value = true
        error.value   = null
        try {
            const updated = await employerOrderService.cancelOrder(id)
            _updateInList(updated)
            if (selectedOrder.value?.id === updated.id) selectedOrder.value = updated
            return updated
        } catch (err) {
            error.value = extractErrorMessage(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    async function fetchActiveServicePackages() {
        try {
            activeServicePackages.value = await employerPackageService.getActiveServicePackages()
        } catch (err) {
            error.value = extractErrorMessage(err)
        }
    }

    async function fetchActiveAddonPackages(params?: EmployerAddonPackageQueryParams) {
        try {
            activeAddonPackages.value = await employerPackageService.getActiveAddonPackages(params)
        } catch (err) {
            error.value = extractErrorMessage(err)
        }
    }

    function reset() {
        orders.value               = []
        selectedOrder.value        = null
        meta.value                 = { page: 0, pageSize: 10, pages: 0, totals: 0 }
        loading.value              = false
        error.value                = null
        activeServicePackages.value = []
        activeAddonPackages.value   = []
    }

    return {
        orders,
        selectedOrder,
        meta,
        loading,
        error,
        activeServicePackages,
        activeAddonPackages,
        fetchMyOrders,
        fetchOrderById,
        createOrder,
        cancelOrder,
        fetchActiveServicePackages,
        fetchActiveAddonPackages,
        reset,
    }
})
