import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type { ReqCreateAppeal, ResAppeal } from '@/types/appeal.types'

const employerAppealService = {
  async create(payload: ReqCreateAppeal): Promise<ResAppeal> {
    const res = await axiosInstance.post<RestResponse<ResAppeal>>('/employer/appeals', payload)
    return res.data.data
  },
}

export { employerAppealService }
