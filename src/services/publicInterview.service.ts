import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type {
  ResInterviewScheduleDTO,
  ResInterviewHistoryDTO,
  ResInterviewRoundDTO,
} from '@/types/interview.types';

const BASE_URL = '/interview-schedules';

const publicInterviewService = {
  /**
   * UV xác nhận chọn slot PV (không cần đăng nhập).
   */
  async confirmSlot(token: string, slotId: number): Promise<{ message: string }> {
    const res = await axiosInstance.get<RestResponse<{ message: string }>>(
      `${BASE_URL}/confirm`,
      { params: { token, slotId } }
    );
    return res.data.data;
  },

  /**
   * Lấy danh sách lịch phỏng vấn của ứng viên trong đơn ứng tuyển (yêu cầu đăng nhập)
   * GET /interview-schedules/applications/:applicationId
   */
  async getMyInterviews(applicationId: number): Promise<ResInterviewScheduleDTO[]> {
    const res = await axiosInstance.get<RestResponse<ResInterviewScheduleDTO[]>>(
      `${BASE_URL}/applications/${applicationId}`
    );
    return res.data.data;
  },

  /**
   * Lấy lịch sử phỏng vấn của ứng viên trong đơn ứng tuyển (yêu cầu đăng nhập)
   * GET /interview-schedules/applications/:applicationId/history
   */
  async getMyInterviewHistory(applicationId: number): Promise<ResInterviewHistoryDTO> {
    const res = await axiosInstance.get<RestResponse<ResInterviewHistoryDTO>>(
      `${BASE_URL}/applications/${applicationId}/history`
    );
    return res.data.data;
  },

  /**
   * Lấy thông tin chi tiết 1 vòng phỏng vấn
   * GET /interview-schedules/interview-rounds/:roundId
   */
  async getRoundDetail(roundId: number): Promise<ResInterviewRoundDTO> {
    const res = await axiosInstance.get<RestResponse<ResInterviewRoundDTO>>(
      `${BASE_URL}/interview-rounds/${roundId}`
    );
    return res.data.data;
  },
};

export default publicInterviewService;
