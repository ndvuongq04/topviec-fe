import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type { ReqCreateAppeal, ResAppeal } from '@/types/appeal.types'

const employerAppealService = {
  async submitAppeal(reportId: number, payload: ReqCreateAppeal): Promise<ResAppeal> {
    const res = await axiosInstance.post<RestResponse<ResAppeal>>(
      `/employer/me/reports/${reportId}/appeal`,
      payload,
    )
    return res.data.data
  },
}

export { employerAppealService }
