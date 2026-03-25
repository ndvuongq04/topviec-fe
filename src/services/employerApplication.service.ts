import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type { 
  ResEmployerApplicationDTO, 
  ResEmployerApplicationPagination, 
  ReqUpdateApplicationStatusDTO, 
  ReqEvaluateApplicationDTO 
} from '@/types/employerApplication.types';

const BASE_URL = '/employer/applications';

const employerApplicationService = {
  /**
   * Lấy danh sách hồ sơ ứng tuyển của 1 tin tuyển dụng.
   */
  async getApplicationsByJobPost(
    jobPostId: number, 
    params: { status?: string; page?: number; size?: number; sort?: string }
  ): Promise<ResEmployerApplicationPagination> {
    const res = await axiosInstance.get<RestResponse<ResEmployerApplicationPagination>>(
      `${BASE_URL}/job/${jobPostId}`, 
      { params }
    );
    return res.data.data;
  },

  /**
   * Xem chi tiết 1 hồ sơ ứng tuyển. Tự động chuyển status PENDING -> SEEN.
   */
  async getApplicationDetailByEmployer(applicationId: number): Promise<ResEmployerApplicationDTO> {
    const res = await axiosInstance.get<RestResponse<ResEmployerApplicationDTO>>(`${BASE_URL}/${applicationId}`);
    return res.data.data;
  },

  /**
   * NTD cập nhật trạng thái CV ứng tuyển (ví dụ: interviewing, rejected, hired...).
   */
  async changeApplicationStatus(
    applicationId: number, 
    data: ReqUpdateApplicationStatusDTO
  ): Promise<ResEmployerApplicationDTO> {
    const res = await axiosInstance.patch<RestResponse<ResEmployerApplicationDTO>>(
      `${BASE_URL}/${applicationId}/status`, 
      data
    );
    return res.data.data;
  },

  /**
   * NTD đánh giá (cho điểm, ghi chú, gán tag) CV.
   */
  async evaluateApplication(
    applicationId: number, 
    data: ReqEvaluateApplicationDTO
  ): Promise<ResEmployerApplicationDTO> {
    const res = await axiosInstance.patch<RestResponse<ResEmployerApplicationDTO>>(
      `${BASE_URL}/${applicationId}/evaluate`, 
      data
    );
    return res.data.data;
  },
};

export default employerApplicationService;
