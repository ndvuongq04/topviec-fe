import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';
import type {
  ReqGetEmployerReports,
  ReqGetReportsByComplaint,
  ResEmployerReportDetail,
  ResEmployerReportPagination,
  ResMyViolationScore,
} from '@/types/report.types';

const BASE_URL = '/employer/me';

const employerReportService = {
  async getMyReports(params: ReqGetEmployerReports): Promise<ResEmployerReportPagination> {
    const res = await axiosInstance.get<RestResponse<ResEmployerReportPagination>>(
      `${BASE_URL}/reports`,
      { params },
    );
    return res.data.data;
  },

  async getById(id: number): Promise<ResEmployerReportDetail> {
    const res = await axiosInstance.get<RestResponse<ResEmployerReportDetail>>(
      `${BASE_URL}/reports/${id}`,
    );
    return res.data.data;
  },

  async getMyViolationScore(): Promise<ResMyViolationScore> {
    const res = await axiosInstance.get<RestResponse<ResMyViolationScore>>(
      `${BASE_URL}/violation-score`,
    );
    return res.data.data;
  },

  async respondToReport(id: number): Promise<ResEmployerReportDetail> {
    const res = await axiosInstance.post<RestResponse<ResEmployerReportDetail>>(
      `${BASE_URL}/reports/${id}/respond`,
    );
    return res.data.data;
  },

  async getReportsByComplaint(id: number, params: ReqGetReportsByComplaint): Promise<ResEmployerReportPagination> {
    const res = await axiosInstance.get<RestResponse<ResEmployerReportPagination>>(
      `${BASE_URL}/reports/${id}/job-post-complaints`,
      { params },
    );
    return res.data.data;
  },
};

export default employerReportService;
