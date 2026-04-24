import type { MemberRole, MemberStatus } from '@/constants/companyMember.constants';
import type { ActionItem } from '@/types/role.types';

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
    roleName: string;
}

export interface ReqUpdatePermission {
    roleName: string;
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

export interface ReqBatchMemberPermission {
    userIds: number[];
}

export interface ReqToggleMemberAction {
    enabled: boolean;
}

export interface ResMemberPermissionDetail {
    userId: number;
    email: string;
    roleId: number;
    roleName: MemberRole;
    status: string;
    jobTitle: string | null;
    createdAt: string;
    customPermissions: Record<string, boolean>;
    effectivePermissions: ActionItem[];
}
