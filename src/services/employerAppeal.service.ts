import axiosInstance from './axios'
import type { RestResponse } from '@/types/common.types'
import type { ReqSubmitAppeal, ResAppeal } from '@/types/appeal.types'

const employerAppealService = {
  async create(reportId: number, payload: ReqSubmitAppeal): Promise<ResAppeal> {
    const res = await axiosInstance.post<RestResponse<ResAppeal>>(
      `/employer/me/reports/${reportId}/appeal`,
      payload,
    )
    return res.data.data
  },
}

export { employerAppealService }
