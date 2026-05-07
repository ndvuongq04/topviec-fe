import axiosInstance from './axios'
import type { 
  ResAuditLogPagination, 
  ResAuditLogDetailDTO, 
  ResBusinessEventLogPagination, 
  ResBusinessEventLogDetailDTO,
  LogQueryParams
} from '@/types/logs.types'

const adminLogService = {
  /**
   * GET /admin/logs/audit
   */
  async getAuditLogs(params: LogQueryParams): Promise<ResAuditLogPagination> {
    const response = await axiosInstance.get('/admin/logs/audit', { params })
    return response.data.data
  },

  /**
   * GET /admin/logs/audit/{id}
   */
  async getAuditLogDetail(id: number): Promise<ResAuditLogDetailDTO> {
    const response = await axiosInstance.get(`/admin/logs/audit/${id}`)
    return response.data.data
  },

  /**
   * GET /admin/logs/business
   */
  async getBusinessLogs(params: LogQueryParams): Promise<ResBusinessEventLogPagination> {
    const response = await axiosInstance.get('/admin/logs/business', { params })
    return response.data.data
  },

  /**
   * GET /admin/logs/business/{id}
   */
  async getBusinessLogDetail(id: number): Promise<ResBusinessEventLogDetailDTO> {
    const response = await axiosInstance.get(`/admin/logs/business/${id}`)
    return response.data.data
  }
}

export default adminLogService
