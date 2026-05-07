import axiosInstance from './axios'
import type { 
  ResAuditLogPagination, 
  ResAuditLogDetailDTO, 
  ResBusinessEventLogPagination, 
  ResBusinessEventLogDetailDTO,
  LogQueryParams
} from '@/types/logs.types'

const employerLogService = {
  /**
   * GET /employer/logs/audit
   */
  async getAuditLogs(params: LogQueryParams): Promise<ResAuditLogPagination> {
    const response = await axiosInstance.get('/employer/logs/audit', { params })
    return response.data.data
  },

  /**
   * GET /employer/logs/audit/{id}
   */
  async getAuditLogDetail(id: number): Promise<ResAuditLogDetailDTO> {
    const response = await axiosInstance.get(`/employer/logs/audit/${id}`)
    return response.data.data
  },

  /**
   * GET /employer/logs/business
   */
  async getBusinessLogs(params: LogQueryParams): Promise<ResBusinessEventLogPagination> {
    const response = await axiosInstance.get('/employer/logs/business', { params })
    return response.data.data
  },

  /**
   * GET /employer/logs/business/{id}
   */
  async getBusinessLogDetail(id: number): Promise<ResBusinessEventLogDetailDTO> {
    const response = await axiosInstance.get(`/employer/logs/business/${id}`)
    return response.data.data
  }
}

export default employerLogService
