import axiosInstance from './axios'
import type { RestResponse, ResultPaginationDTO } from '@/types/common.types'
import type {
    ReqAddonPackageDTO,
    ResAddonPackageDTO,
    AdminAddonPackageQueryParams,
} from '@/types/servicePackage.types'

const BASE_URL = '/admin/addon-packages'

export const adminAddonPackageService = {
    async getAll(params?: AdminAddonPackageQueryParams): Promise<ResultPaginationDTO<ResAddonPackageDTO>> {
        const res = await axiosInstance.get<RestResponse<ResultPaginationDTO<ResAddonPackageDTO>>>(BASE_URL, { params })
        return res.data.data
    },

    async create(payload: ReqAddonPackageDTO): Promise<ResAddonPackageDTO> {
        const res = await axiosInstance.post<RestResponse<ResAddonPackageDTO>>(BASE_URL, payload)
        return res.data.data
    },

    async update(id: number, payload: ReqAddonPackageDTO): Promise<ResAddonPackageDTO> {
        const res = await axiosInstance.put<RestResponse<ResAddonPackageDTO>>(`${BASE_URL}/${id}`, payload)
        return res.data.data
    },
}
