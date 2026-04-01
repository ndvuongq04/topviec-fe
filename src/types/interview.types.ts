import type { InterviewStatus, InterviewType, OfferResult } from '@/constants/interview.constants';

// ─── Requests ────────────────────────────────────────────────────────────────

export interface InterviewerDTO {
  name: string;
  email?: string;
  phone?: string;
}

export interface ReqCreateInterviewRoundDTO {
  roundName: string;
  description?: string;
  expectedDuration?: number;
  isFinal?: boolean;
  interviewers?: InterviewerDTO[];
}

export interface ReqUpdateInterviewRoundDTO {
  roundName?: string;
  description?: string;
  expectedDuration?: number;
  isFinal?: boolean;
  interviewers?: InterviewerDTO[];
}

export interface ReqCreateInterviewScheduleDTO {
  applicationId: number;
  scheduledAt: string; // LocalDateTime
  durationMinutes?: number;
  interviewType: InterviewType;
  location?: string;
  meetingLink?: string;
  interviewerNote?: string;
}

export interface ReqUpdateInterviewScheduleDTO {
  scheduledAt?: string;
  interviewType?: InterviewType;
  location?: string;
  meetingLink?: string;
  interviewerNote?: string;
}

export interface SlotDTO {
  proposedAt: string;
  interviewType: InterviewType;
  location?: string;
  meetingLink?: string;
}

export interface ReqCreateInterviewSlotsDTO {
  applicationIds: number[];
  deadline: string;
  slots: SlotDTO[];
}

export interface ReqInterviewResultDTO {
  result: 'PASS' | 'FAIL';
  rating?: number;
  note?: string;
  notifyCandidate?: boolean;
}

export interface ReqExtendDeadlineDTO {
  extendDays: number;
}

export interface ReqForceScheduleDTO {
  scheduledAt: string;
  interviewType: InterviewType;
  location?: string;
  meetingLink?: string;
}

export interface ReqCompleteRecruitmentDTO {
  applicationIds: number[];
}

export interface ReqOfferResultDTO {
  result: OfferResult;
}

// ─── Responses ───────────────────────────────────────────────────────────────

export interface InterviewerInfo {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export interface ResInterviewRoundDTO {
  id: number;
  jobPostId: number;
  roundNumber: number;
  roundName: string;
  description?: string;
  expectedDuration?: number;
  isFinal: boolean;
  interviewers: InterviewerInfo[];
  candidateCount: number;
  createdAt: string;
}

export interface ResInterviewScheduleDTO {
  id: number;
  applicationId: number;
  roundId: number;
  roundNumber: number;
  roundName: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  scheduledAt: string;
  durationMinutes: number;
  interviewType: InterviewType;
  location?: string;
  meetingLink?: string;
  status: InterviewStatus;
  confirmedByCandidate: boolean;
  interviewerNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResInterviewResultDTO {
  id: number;
  interviewId: number;
  result: string;
  rating?: number;
  note?: string;
  notifyCandidate: boolean;
  evaluatedBy: number;
  evaluatedAt: string;
}

export interface RoundHistory {
  roundNumber: number;
  roundName: string;
  isFinal: boolean;
  scheduleId?: number;
  scheduledAt?: string;
  interviewType?: string;
  scheduleStatus?: string;
  result?: string;
  rating?: number;
  note?: string;
  evaluatedAt?: string;
}

export interface ResInterviewHistoryDTO {
  applicationId: number;
  candidateName: string;
  currentStatus: string;
  rounds: RoundHistory[];
}

export interface ResOverdueApplicationDTO {
  applicationId: number;
  candidateUserId: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  reminderCount: number;
  firstReminderAt: string;
  reminderDeadline: string;
  currentRoundName: string;
  currentRoundNumber: number;
}

export interface ResInterviewReadinessDTO {
  isJobClosed: boolean;
  hasRounds: boolean;
  hasCvPassed: boolean;
  ready: boolean;
}
