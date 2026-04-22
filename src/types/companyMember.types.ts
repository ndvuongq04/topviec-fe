import type { MemberRole, MemberStatus } from '@/constants/companyMember.constants';

export interface ResEmployerProfileDTO {
  // Tài khoản
  userId: number
  email: string
  accountStatus: string
  emailVerifiedAt: string | null
  lastLoginAt: string | null
  // Thành viên công ty
  memberId: number
  roleName: MemberRole
  memberStatus: string
  memberCreatedAt: string
  // Công ty
  companyId: number
  companyName: string
  companySlug: string
  companyLogoUrl: string | null
}

export interface ReqAddMember {
    email: string;
    tempPassword: string;
    roleId: number;
    customActions?: Record<string, boolean>;
}

export interface ReqUpdatePermission {
    roleId: number;
    customActions?: Record<string, boolean>;
    reason?: string;
}

export interface ResCompanyMember {
    id: number;
    companyId: number;
    userId: number;
    email: string;
    roleId: number;
    roleName: MemberRole | string;
    status: MemberStatus;
    actions: Record<string, boolean>;
    jobTitle: string | null;
    createdAt: string; // ISO 8601
}
