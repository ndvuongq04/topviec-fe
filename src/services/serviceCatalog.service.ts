import api from '@/services/api'
import type {
    ReqServiceDTO,
    ResServiceDTO,
    ResServicePagination,
    AdminServiceQueryParams
} from '@/types/serviceCatalog.types'

export const serviceCatalogService = {
    getAllServices(params?: AdminServiceQueryParams) {
        return api.get<ResServicePagination>('/admin/services', { params })
    },

    getServiceById(id: number) {
        return api.get<ResServiceDTO>(`/admin/services/${id}`)
    },

    createService(data: ReqServiceDTO) {
        return api.post<ResServiceDTO>('/admin/services', data)
    },

    updateService(id: number, data: ReqServiceDTO) {
        return api.put<ResServiceDTO>(`/admin/services/${id}`, data)
    }
}
