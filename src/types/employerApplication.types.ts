import type { ResultPaginationDTO } from './common.types';
import type { ApplicationStatus, ApplyMethod } from '@/constants/application.constants';

// ─── Request ──────────────────────────────────────────────

export interface ReqUpdateApplicationStatusDTO {
  status: ApplicationStatus | string;
  note?: string;
}

export interface ReqEvaluateApplicationDTO {
  rating: number; // 1-5
  note?: string;
  tags?: string;
}

// ─── Response ─────────────────────────────────────────────

export interface ResEmployerApplicationDTO {
  id: number;
  jobPostId: number;
  jobTitle: string;

  // Thông tin ứng viên
  candidateUserId: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar?: string;

  // Thông tin CV
  cvId: number;
  cvFileUrl: string;
  cvPdfUrl?: string;

  // Thông tin apply
  status: ApplicationStatus;
  applyMethod: ApplyMethod;
  recruiterRating?: number;
  recruiterNote?: string;
  recruiterTags?: string;
  viewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ResEmployerApplicationPagination = ResultPaginationDTO<ResEmployerApplicationDTO>;
