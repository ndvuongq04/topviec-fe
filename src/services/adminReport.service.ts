import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type {
  ReqConfirmReport,
  ReqGetAdminReports,
  ReqGetReportsByComplaint,
  ReqProcessReport,
  ResReportDetail,
  ResReportPagination,
} from '@/types/report.types';

const BASE_URL = '/admin/reports';

const adminReportService = {
  async getAll(params: ReqGetAdminReports): Promise<ResReportPagination> {
    const res = await axiosInstance.get<RestResponse<ResReportPagination>>(BASE_URL, { params });
    return res.data.data;
  },

  async getById(id: number): Promise<ResReportDetail> {
    const res = await axiosInstance.get<RestResponse<ResReportDetail>>(`${BASE_URL}/${id}`);
    return res.data.data;
  },

  async process(id: number, data: ReqProcessReport): Promise<ResReportDetail> {
    const res = await axiosInstance.patch<RestResponse<ResReportDetail>>(
      `${BASE_URL}/${id}/process`,
      data,
    );
    return res.data.data;
  },

  async confirm(id: number, data: ReqConfirmReport): Promise<ResReportDetail> {
    const res = await axiosInstance.patch<RestResponse<ResReportDetail>>(
      `${BASE_URL}/${id}/confirm`,
      data,
    );
    return res.data.data;
  },

  async getReportsByComplaint(id: number, params: ReqGetReportsByComplaint): Promise<ResReportPagination> {
    const res = await axiosInstance.get<RestResponse<ResReportPagination>>(
      `${BASE_URL}/${id}/job-post-complaints`,
      { params },
    );
    return res.data.data;
  },
};

export default adminReportService;
