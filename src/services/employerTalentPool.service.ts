import axiosInstance from './axios';
import type { RestResponse } from '@/types/common.types';

export type TalentPoolSource = 'REVIEW_CV' | 'INTERVIEW' | 'SEARCH_IN_DB';

export interface ReqAddToTalentPoolDTO {
  candidateUserId: number;
  source: TalentPoolSource;
  note?: string;
}

export interface ResTalentPoolDTO {
  id: number;
  companyId: number;
  candidateUserId: number;
  candidateName: string;
  candidateAvatarUrl?: string;
  addedBy: number;
  source: string;
  note?: string;
  createdAt: string;
}

const BASE_URL = '/employer/talent-pool';

const employerTalentPoolService = {
  async addToTalentPool(data: ReqAddToTalentPoolDTO): Promise<ResTalentPoolDTO> {
    const res = await axiosInstance.post<RestResponse<ResTalentPoolDTO>>(BASE_URL, data);
    return res.data.data;
  },
};

export default employerTalentPoolService;
