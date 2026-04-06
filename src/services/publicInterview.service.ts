import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';

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
};

export default publicInterviewService;
