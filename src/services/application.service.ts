import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type { 
  ResApplication, 
  ResApplicationPagination, 
  ReqApplyJob, 
  ReqBulkApply, 
  ReqWithdrawApplication 
} from '@/types/application.types';

const BASE_URL = '/applications';

const applicationService = {
  /**
   * CN-UV-010: Nộp đơn đầy đủ
   */
  async apply(jobPostId: number, data: ReqApplyJob): Promise<ResApplication> {
    const res = await axiosInstance.post<RestResponse<ResApplication>>(`${BASE_URL}/${jobPostId}`, data);
    return res.data.data;
  },

  /**
   * CN-UV-011: Ứng tuyển nhanh (CV mặc định)
   */
  async quickApply(jobPostId: number): Promise<ResApplication> {
    const res = await axiosInstance.post<RestResponse<ResApplication>>(`${BASE_URL}/${jobPostId}/quick`);
    return res.data.data;
  },

  /**
   * CN-UV-012: Ứng tuyển hàng loạt (tối đa 10 tin)
   */
  async bulkApply(data: ReqBulkApply): Promise<ResApplication[]> {
    const res = await axiosInstance.post<RestResponse<ResApplication[]>>(`${BASE_URL}/bulk`, data);
    return res.data.data;
  },

  /**
   * CN-UV-013: Theo dõi trạng thái đơn ứng tuyển
   */
  async getMyApplications(params: { status?: string; page?: number; size?: number; sort?: string }): Promise<ResApplicationPagination> {
    const res = await axiosInstance.get<RestResponse<ResApplicationPagination>>(`${BASE_URL}/me`, { params });
    return res.data.data;
  },

  /**
   * CN-UV-015: Rút đơn ứng tuyển
   */
  async withdraw(applicationId: number, data?: ReqWithdrawApplication): Promise<ResApplication> {
    const res = await axiosInstance.patch<RestResponse<ResApplication>>(`${BASE_URL}/${applicationId}/withdraw`, data);
    return res.data.data;
  },
};

export default applicationService;
