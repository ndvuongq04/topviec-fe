import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type {
    ReqServiceDTO,
    ResServiceDTO,
    ResServicePagination,
    AdminServiceQueryParams
} from '@/types/serviceCatalog.types'

const BASE_URL = '/admin/services'

export const serviceCatalogService = {
    async getAllServices(params?: AdminServiceQueryParams) {
        const res = await axiosInstance.get<RestResponse<ResServicePagination>>(BASE_URL, { params })
        return res.data.data
    },

    async getServiceById(id: number) {
        const res = await axiosInstance.get<RestResponse<ResServiceDTO>>(`${BASE_URL}/${id}`)
        return res.data.data
    },

    async createService(data: ReqServiceDTO) {
        const res = await axiosInstance.post<RestResponse<ResServiceDTO>>(BASE_URL, data)
        return res.data.data
    },

    async updateService(id: number, data: ReqServiceDTO) {
        const res = await axiosInstance.put<RestResponse<ResServiceDTO>>(`${BASE_URL}/${id}`, data)
        return res.data.data
    }
}
