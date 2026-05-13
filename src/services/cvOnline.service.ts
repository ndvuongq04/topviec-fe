import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type {
    ReqChangeOnlineCvTemplate,
    ReqCreateOnlineCv,
    ReqUpdateOnlineCv,
    ResOnlineCv,
} from '@/types/cvOnline.types'

const BASE_URL = '/cvs/online'

const cvOnlineService = {
    async createOnlineCv(payload: ReqCreateOnlineCv): Promise<ResOnlineCv> {
        const res = await axiosInstance.post<RestResponse<ResOnlineCv>>(BASE_URL, payload)
        return res.data.data
    },

    async getOnlineCvById(id: number): Promise<ResOnlineCv> {
        const res = await axiosInstance.get<RestResponse<ResOnlineCv>>(`${BASE_URL}/${id}`)
        return res.data.data
    },

    async updateOnlineCv(id: number, payload: ReqUpdateOnlineCv): Promise<ResOnlineCv> {
        const res = await axiosInstance.put<RestResponse<ResOnlineCv>>(`${BASE_URL}/${id}`, payload)
        return res.data.data
    },

    async changeTemplate(id: number, payload: ReqChangeOnlineCvTemplate): Promise<ResOnlineCv> {
        const res = await axiosInstance.patch<RestResponse<ResOnlineCv>>(
            `${BASE_URL}/${id}/template`,
            payload,
        )
        return res.data.data
    },
}

export default cvOnlineService
