import { defineStore } from 'pinia';
import { ref } from 'vue';
import adminReportService from '@/services/adminReport.service';
import type { PaginationMeta } from '@/types/common.types';
import type {
  ReqGetAdminReports,
  ReqProcessReport,
  ResReportDetail,
  ResReportSummary,
} from '@/types/report.types';

export const useAdminReportStore = defineStore('adminReport', () => {
  // ─── State ──────────────────────────────────────────────────────────────────
  const reports = ref<ResReportSummary[]>([]);
  const meta = ref<PaginationMeta>({ page: 0, pageSize: 10, pages: 0, totals: 0 });
  const currentReport = ref<ResReportDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ─── Helpers ────────────────────────────────────────────────────────────────
  function setError(err: unknown) {
    const data = (err as any)?.response?.data;
    if (data?.message && typeof data.message === 'object') {
      const firstError = Object.values(data.message)[0];
      error.value = String(firstError);
    } else {
      error.value = data?.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.';
    }
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  async function fetchAll(params: ReqGetAdminReports) {
    loading.value = true;
    error.value = null;
    try {
      const data = await adminReportService.getAll(params);
      reports.value = data.result;
      meta.value = data.meta;
    } catch (err) {
      setError(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      currentReport.value = await adminReportService.getById(id);
    } catch (err) {
      setError(err);
    } finally {
      loading.value = false;
    }
  }

  async function processReport(id: number, reqData: ReqProcessReport): Promise<ResReportDetail> {
    loading.value = true;
    error.value = null;
    try {
      const updated = await adminReportService.process(id, reqData);
      currentReport.value = updated;
      const index = reports.value.findIndex((r) => r.id === id);
      if (index !== -1) {
        reports.value[index] = { ...reports.value[index], status: updated.status };
      }
      return updated;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    reports.value = [];
    meta.value = { page: 0, pageSize: 10, pages: 0, totals: 0 };
    currentReport.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    reports,
    meta,
    currentReport,
    loading,
    error,
    fetchAll,
    fetchById,
    processReport,
    reset,
  };
});
